package controllers

import (
	"github.com/gin-gonic/gin"
	"kickof/models"
	"kickof/services"
	"net/http"
)

func GetPermissions(c *gin.Context) {
	results := services.GetPermissions(nil, nil)

	c.JSON(http.StatusOK, models.Response{Data: results})
}

func CreatePermission(c *gin.Context) {
	request := struct {
		Permissions []models.Permission `json:"permissions"`
	}{}
	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	err = services.CreateManyPermission(request.Permissions)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: request.Permissions})
}
