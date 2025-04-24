package services

import (
	"context"
	"errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"kickof/database"
	"kickof/models"
)

const PermissionCollection = "permissions"

func CreateManyPermissions(params []models.Permission) (bool, error) {
	data := make([]interface{}, 0)
	for _, val := range params {
		data = append(data, val)
	}

	_, err := database.InsertMany(PermissionCollection, data)
	if err != nil {
		return false, err
	}

	return true, nil
}

func GetPermissions(filters bson.M, opt *options.FindOptions) []models.Permission {
	results := make([]models.Permission, 0)

	cursor := database.Find(PermissionCollection, filters, opt)
	for cursor.Next(context.Background()) {
		var data models.Permission
		if cursor.Decode(&data) == nil {
			results = append(results, data)
		}
	}

	return results
}

func GetPermission(filter bson.M, opts *options.FindOneOptions) *models.Permission {
	var data models.Permission
	err := database.FindOne(PermissionCollection, filter, opts).Decode(&data)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil
		}
		return nil
	}
	return &data
}

func CreateManyPermission(params []models.Permission) error {
	data := make([]interface{}, 0)
	for _, val := range params {
		data = append(data, val)
	}

	_, err := database.InsertMany(PermissionCollection, data)
	if err != nil {
		return err
	}

	return nil
}
