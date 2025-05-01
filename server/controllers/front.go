package controllers

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"kickof/models"
	"kickof/services"
	"net/http"
)

func GetUserFrontSidebarMenus(c *gin.Context) {
	profile := services.GetCurrentUser(c.Request)
	if profile == nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: "Unauthorized"})
		return
	}

	menus, err := services.GetUserFrontSidebarMenus(*profile)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: menus})
}

func GetFrontSidebarMenus(c *gin.Context) {
	menus := services.GetFrontSidebarMenus(bson.M{}, nil)

	c.JSON(http.StatusOK, models.Response{Data: menus})
}

func CreateFrontSidebarMenus(c *gin.Context) {
	request := struct {
		Menus []models.FrontSidebarMenu `json:"menus"`
	}{}
	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	_, err = services.CreateManyFrontSidebarMenu(request.Menus)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: request})
	return
}

func GetFrontSidebarMenu(c *gin.Context) {
	id := c.Param("id")

	menus := services.GetFrontSidebarMenu(bson.M{"id": id}, nil)

	c.JSON(http.StatusOK, models.Response{Data: menus})
}

func UpdateFrontSidebarMenu(c *gin.Context) {
	id := c.Param("id")

	data := services.GetFrontSidebarMenu(bson.M{"id": id}, nil)
	if data == nil {
		c.JSON(http.StatusNotFound, models.Result{Data: "Data Not Found"})
		return
	}

	var request map[string]interface{}
	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	_, err = services.UpdateFrontSidebarMenu(id, request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(200, models.Response{Data: request})
}

func DeleteFrontSidebarMenu(c *gin.Context) {
	id := c.Param("id")

	_, err := services.DeleteFrontSidebarMenu(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: "Failed Delete Data"})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: "Success"})
}
