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

const StateCollection = "states"

func GetStateTasks(stateId string) []models.Task {
	result := GetTasks(bson.M{"stateId": stateId}, nil)
	return result
}

func GetStates(filters bson.M, opt *options.FindOptions, includeDetail bool) []models.State {
	results := make([]models.State, 0)

	cursor := database.Find(StateCollection, filters, opt)
	if cursor == nil {
		return results
	}
	for cursor.Next(context.Background()) {
		var data models.State
		err := cursor.Decode(&data)
		if err == nil {
			if includeDetail {
				if data.ProjectId != "" {
					project := GetProject(bson.M{"id": data.ProjectId}, nil)
					if project != nil {
						data.Project = *project
					}
				}
				if data.WorkspaceId != "" {
					workspace := GetWorkspace(bson.M{"id": data.WorkspaceId}, nil)
					if workspace != nil {
						data.Workspace = *workspace
					}
				}
			}

			data.Tasks = GetStateTasks(data.Id)

			results = append(results, data)
		}
	}

	return results
}

func GetStatesWithPagination(filters bson.M, opt *options.FindOptions, query models.Query) models.Result {
	results := GetStates(filters, opt, true)

	count := database.Count(StateCollection, filters)

	pagination := query.GetPagination(count)

	result := models.Result{
		Data:       results,
		Pagination: pagination,
		Query:      query,
	}

	return result
}

func CreateState(State models.State) (bool, error) {
	_, err := database.InsertOne(StateCollection, State)
	if err != nil {
		return false, err
	}

	return true, nil
}

func CreateDefaultStateToProject(workspaceId string, projectId string) error {
	defaultStates := []models.State{
		{Name: "To Do", Type: models.TodoStateType},
		{Name: "In Progress", Type: models.InProgressStateType},
		{Name: "Completed", Type: models.CompletedStateType},
		{Name: "Cancelled", Type: models.CancelledStateType},
	}

	data := make([]interface{}, 0)
	for _, val := range defaultStates {
		val.WorkspaceId = workspaceId
		val.ProjectId = projectId
		val.IsDefault = true
		val.CreatedAt = time.Now()
		val.UpdatedAt = time.Now()
		data = append(data, val)
	}

	_, err := database.InsertMany(StateCollection, data)
	if err != nil {
		return err
	}

	return nil
}

func GetState(filter bson.M, opts *options.FindOneOptions) *models.State {
	var data models.State
	err := database.FindOne(StateCollection, filter, opts).Decode(&data)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil
		}
		return nil
	}
	return &data
}

func UpdateState(id string, State interface{}) (*mongo.UpdateResult, error) {
	filters := bson.M{"id": id}

	res, err := database.UpdateOne(StateCollection, filters, State)

	if res == nil {
		return nil, err
	}

	return res, nil
}

func DeleteState(id string) (*mongo.DeleteResult, error) {
	filter := bson.M{"id": id}

	res, err := database.DeleteOne(StateCollection, filter)

	if res == nil {
		return nil, err
	}

	return res, nil
}
