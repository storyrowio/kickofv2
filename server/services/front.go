package services

import (
	"context"
	"errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"kickof/database"
	"kickof/lib"
	"kickof/models"
	"time"
)

const FrontSidebarMenuCollection = "frontsidebarmenus"

func GetFrontSidebarMenus(filters bson.M, opt *options.FindOptions) []models.FrontSidebarMenu {
	results := make([]models.FrontSidebarMenu, 0)

	cursor := database.Find(FrontSidebarMenuCollection, filters, opt)
	for cursor.Next(context.Background()) {
		var data models.FrontSidebarMenu
		if cursor.Decode(&data) == nil {
			results = append(results, data)
		}
	}

	return results
}

func GetFrontSidebarMenusWithPagination(filters bson.M, opt *options.FindOptions, query models.Query) models.Result {
	results := GetFrontSidebarMenus(filters, opt)

	count := database.Count(FrontSidebarMenuCollection, filters)

	pagination := query.GetPagination(count)

	result := models.Result{
		Data:       results,
		Pagination: pagination,
		Query:      query,
	}

	return result
}

func CreateFrontSidebarMenu(params models.FrontSidebarMenu) (bool, error) {
	_, err := database.InsertOne(FrontSidebarMenuCollection, params)
	if err != nil {
		return false, err
	}

	return true, nil
}

func GetFrontSidebarMenu(filter bson.M, opts *options.FindOneOptions) *models.FrontSidebarMenu {
	var data models.FrontSidebarMenu
	err := database.FindOne(FrontSidebarMenuCollection, filter, opts).Decode(&data)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil
		}
		return nil
	}
	return &data
}

func UpdateFrontSidebarMenu(id string, FrontSidebarMenu interface{}) (*mongo.UpdateResult, error) {
	filters := bson.M{"id": id}

	res, err := database.UpdateOne(FrontSidebarMenuCollection, filters, FrontSidebarMenu)

	if res == nil {
		return nil, err
	}

	return res, nil
}

func DeleteFrontSidebarMenu(id string) (*mongo.DeleteResult, error) {
	filter := bson.M{"id": id}

	res, err := database.DeleteOne(FrontSidebarMenuCollection, filter)

	if res == nil {
		return nil, err
	}

	return res, nil
}

func CreateManyFrontSidebarMenu(params []models.FrontSidebarMenu) (bool, error) {
	data := make([]interface{}, 0)
	for _, val := range params {
		val.CreatedAt = time.Now()
		val.UpdatedAt = time.Now()
		data = append(data, val)
	}

	_, err := database.InsertMany(FrontSidebarMenuCollection, data)
	if err != nil {
		return false, err
	}

	return true, nil
}

func GetUserFrontSidebarMenus(user models.User) ([]models.FrontSidebarMenu, error) {
	allMenus := GetFrontSidebarMenus(bson.M{}, nil)

	userPermissions := make([]string, 0)
	for _, userPermission := range user.Permissions {
		userPermissions = append(userPermissions, userPermission.Id)
	}

	menus := lib.GenerateSidebarMenus(userPermissions, allMenus)

	return menus, nil
}
