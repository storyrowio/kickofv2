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

const TaskCollection = "tasks"
const TaskLabelCollection = "tasklabels"

func GetTaskLabels(filters bson.M, opt *options.FindOptions) []models.TaskLabel {
	results := make([]models.TaskLabel, 0)

	cursor := database.Find(TaskLabelCollection, filters, opt)
	if cursor == nil {
		return results
	}
	for cursor.Next(context.Background()) {
		var data models.TaskLabel
		err := cursor.Decode(&data)
		if err == nil {
			results = append(results, data)
		}

	}

	return results
}

func GetTaskLabelsWithPagination(filters bson.M, opt *options.FindOptions, query models.Query) models.Result {
	results := GetTaskLabels(filters, opt)

	count := database.Count(TaskLabelCollection, filters)

	pagination := query.GetPagination(count)

	result := models.Result{
		Data:       results,
		Pagination: pagination,
		Query:      query,
	}

	return result
}

func CreateTaskLabel(TaskLabel models.TaskLabel) (bool, error) {
	_, err := database.InsertOne(TaskLabelCollection, TaskLabel)
	if err != nil {
		return false, err
	}

	return true, nil
}

func GetTaskLabel(filter bson.M, opts *options.FindOneOptions) *models.TaskLabel {
	var data models.TaskLabel
	err := database.FindOne(TaskLabelCollection, filter, opts).Decode(&data)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil
		}
		return nil
	}
	return &data
}

func UpdateTaskLabel(id string, TaskLabel interface{}) (*mongo.UpdateResult, error) {
	filters := bson.M{"id": id}

	res, err := database.UpdateOne(TaskLabelCollection, filters, TaskLabel)

	if res == nil {
		return nil, err
	}

	return res, nil
}

func DeleteTaskLabel(id string) (*mongo.DeleteResult, error) {
	filter := bson.M{"id": id}

	res, err := database.DeleteOne(TaskLabelCollection, filter)

	if res == nil {
		return nil, err
	}

	return res, nil
}

func GetTaskAssignees(userIds []string) []models.User {
	result := GetUsers(bson.M{"id": bson.M{"$in": userIds}}, options.Find().SetProjection(bson.D{{"password", 0}}))
	return result
}

func GetLabelsOfATask(labelIds []string) []models.TaskLabel {
	result := GetTaskLabels(bson.M{"id": bson.M{"$in": labelIds}}, nil)
	return result
}

func GetTasks(filters bson.M, opt *options.FindOptions) []models.Task {
	results := make([]models.Task, 0)

	cursor := database.Find(TaskCollection, filters, opt)
	if cursor == nil {
		return results
	}
	for cursor.Next(context.Background()) {
		var data models.Task
		err := cursor.Decode(&data)
		if err == nil {
			data.Assignees = GetTaskAssignees(data.AssigneeIds)
			data.Labels = GetLabelsOfATask(data.LabelIds)

			results = append(results, data)
		}

	}

	return results
}

func GetTasksWithPagination(filters bson.M, opt *options.FindOptions, query models.Query) models.Result {
	results := GetTasks(filters, opt)

	count := database.Count(TaskCollection, filters)

	pagination := query.GetPagination(count)

	result := models.Result{
		Data:       results,
		Pagination: pagination,
		//Query:      query,
	}

	return result
}

func CreateTask(Task models.Task) (bool, error) {
	_, err := database.InsertOne(TaskCollection, Task)
	if err != nil {
		return false, err
	}

	return true, nil
}

func GetTask(filter bson.M, opts *options.FindOneOptions) *models.Task {
	var data models.Task
	err := database.FindOne(TaskCollection, filter, opts).Decode(&data)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil
		}
		return nil
	}
	return &data
}

func UpdateTask(id string, Task interface{}) (*mongo.UpdateResult, error) {
	filters := bson.M{"id": id}

	res, err := database.UpdateOne(TaskCollection, filters, Task)

	if res == nil {
		return nil, err
	}

	return res, nil
}

func DeleteTask(id string) (*mongo.DeleteResult, error) {
	filter := bson.M{"id": id}

	res, err := database.DeleteOne(TaskCollection, filter)

	if res == nil {
		return nil, err
	}

	return res, nil
}
