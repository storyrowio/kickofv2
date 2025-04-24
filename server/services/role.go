package services

import (
	"context"
	"errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"kickof/database"
	"kickof/models"
	"time"
)

const RoleCollection = "roles"

func GetRoles(filters bson.M, opt *options.FindOptions, includeDetail bool) []models.Role {
	results := make([]models.Role, 0)

	cursor := database.Find(RoleCollection, filters, opt)
	for cursor.Next(context.Background()) {
		var data models.Role
		if cursor.Decode(&data) == nil {
			if includeDetail {
				permissions := GetPermissions(bson.M{"id": bson.M{"$in": data.PermissionIds}}, nil)
				data.Permissions = permissions
			}

			results = append(results, data)
		}
	}

	return results
}

func GetRolesWithPagination(filters bson.M, opt *options.FindOptions, query models.Query) models.Result {
	results := GetRoles(filters, opt, true)

	count := database.Count(RoleCollection, filters)

	pagination := query.GetPagination(count)

	result := models.Result{
		Data:       results,
		Pagination: pagination,
		Query:      query,
	}

	return result
}

func CreateRole(params models.Role) (bool, error) {
	_, err := database.InsertOne(RoleCollection, params)
	if err != nil {
		return false, err
	}

	return true, nil
}

func GetRole(filter bson.M, opts *options.FindOneOptions, includeDetail bool) *models.Role {
	var data models.Role
	err := database.FindOne(RoleCollection, filter, opts).Decode(&data)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil
		}
		return nil
	}

	if includeDetail {
		permissions := GetPermissions(bson.M{"id": bson.M{"$in": data.PermissionIds}}, nil)
		data.Permissions = permissions
	}

	return &data
}

func UpdateRole(id string, Role interface{}) (*mongo.UpdateResult, error) {
	filters := bson.M{"id": id}

	res, err := database.UpdateOne(RoleCollection, filters, Role)

	if res == nil {
		return nil, err
	}

	return res, nil
}

func DeleteRole(id string) (*mongo.DeleteResult, error) {
	filter := bson.M{"id": id}

	res, err := database.DeleteOne(RoleCollection, filter)

	if res == nil {
		return nil, err
	}

	return res, nil
}

func CreateManyRole(params []models.Role) (bool, error) {
	data := make([]interface{}, 0)
	for _, val := range params {
		val.CreatedAt = time.Now()
		val.UpdatedAt = time.Now()
		data = append(data, val)
	}

	_, err := database.InsertMany(RoleCollection, data)
	if err != nil {
		return false, err
	}

	return true, nil
}
