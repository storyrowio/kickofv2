package controllers

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"kickof/lib"
	"kickof/models"
	"kickof/services"
	"log"
	"net/http"
	"time"
)

func GetProjects(c *gin.Context) {
	var query models.Query
	err := c.ShouldBindQuery(&query)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	filters := query.GetQueryFind()

	if query.UserId != "" {
		filters["userIds"] = bson.M{
			"$in": []string{query.UserId},
		}
	}

	if query.WorkspaceId != "" {
		filters["workspaceId"] = query.WorkspaceId
	}

	opts := query.GetOptions()

	results := services.GetProjectsWithPagination(filters, opts, query)

	c.JSON(http.StatusOK, models.Response{Data: results})
	return
}

func CreateProject(c *gin.Context) {
	profile := services.GetCurrentUser(c.Request)

	var request models.Project
	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(400, models.Response{Data: err.Error()})
		return
	}

	request.Id = uuid.New().String()
	request.UserIds = []string{profile.Id}
	request.CreatedAt = time.Now()
	request.UpdatedAt = time.Now()

	if request.Code == "" {
		request.Code = lib.CodeGenerator(request.Name)
	}

	_, err = services.CreateProject(request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	err = services.CreateDefaultStateToProject(request.WorkspaceId, request.Id)
	if err != nil {
		log.Println("Error Create Default State: ", err.Error())
	}

	c.JSON(http.StatusOK, models.Response{Data: request})
	return
}

func GetProjectByIdOrCode(c *gin.Context) {
	id := c.Param("id")

	result := services.GetProject(bson.M{"id": id}, nil)
	if result == nil {
		result = services.GetProject(bson.M{"code": id}, nil)
		if result == nil {
			c.JSON(http.StatusNotFound, models.Result{Data: "Data Not Found"})
			return
		}
	}

	c.JSON(http.StatusOK, models.Response{Data: result})
}

func UpdateProject(c *gin.Context) {
	id := c.Param("id")

	data := services.GetProject(bson.M{"id": id}, nil)
	if data == nil {
		c.JSON(http.StatusNotFound, models.Result{Data: "Data Not Found"})
		return
	}

	var request models.Project
	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	_, err = services.UpdateProject(id, request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(200, models.Response{Data: request})
}

func DeleteProject(c *gin.Context) {
	id := c.Param("id")

	_, err := services.DeleteProject(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: "Failed Delete Data"})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: "Success"})
}

func AddMemberToProject(c *gin.Context) {
	var request models.ProjectMemberRequest
	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	project := services.GetProject(bson.M{"id": request.ProjectId}, nil)
	if project == nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: errors.New("Project Not Found")})
		return
	}

	user := services.GetUser(bson.M{"id": request.UserId}, options.FindOne().SetProjection(bson.D{{"password", 0}}))
	if user == nil && request.Email != "" {
		user = services.GetUser(bson.M{"email": request.Email}, options.FindOne().SetProjection(bson.D{{"password", 0}}))
	}

	if user != nil {
		project.UserIds = append(project.UserIds, user.Id)
		_, err := services.UpdateProject(project.Id, project)
		if err != nil {
			c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
			return
		}
	}

	c.JSON(http.StatusOK, models.Response{Data: "Success"})
}

func GetProjectMembers(c *gin.Context) {
	id := c.Param("id")
	project := services.GetProject(bson.M{"id": id}, nil)
	if project == nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: "Workspace not found"})
		return
	}

	members := services.GetUsers(bson.M{
		"id": bson.M{
			"$in": project.UserIds,
		}}, options.Find().SetProjection(bson.M{"id": 1, "name": 1, "email": 1}))

	c.JSON(http.StatusOK, models.Response{Data: members})
}
