package controllers

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"kickof/models"
	"kickof/services"
	"log"
	"net/http"
	"strings"
)

func GetPermissions(c *gin.Context) {
	var query models.Query
	err := c.ShouldBindQuery(&query)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	filters := query.GetQueryFind()
	opts := query.GetOptions()

	results := services.GetPermissions(filters, opts)

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

func UpdatePermission(c *gin.Context) {
	request := struct {
		Permissions []models.Permission `json:"permissions"`
	}{}
	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	newPermissions := make([]models.Permission, 0)

	for _, item := range request.Permissions {
		permission := services.GetPermission(bson.M{"id": item.Id}, nil)
		if permission == nil {
			newPermissions = append(newPermissions, item)

		} else {
			_, err := services.UpdatePermission(permission.Id, item)
			if err != nil {
				log.Println("Permission update error"+item.Id, err)
			}
		}
	}

	if len(newPermissions) > 0 {
		_, err := services.CreateManyPermissions(newPermissions)
		if err != nil {
			log.Println("Permission creation error", err)
		}
	}

	c.JSON(http.StatusOK, models.Response{Data: request.Permissions})
}

func DeletePermission(c *gin.Context) {
	ids := c.Param("ids")
	splittedIds := strings.Split(ids, ",")

	err := services.DeleteManyPermissions(splittedIds)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	c.JSON(http.StatusOK, models.Response{Data: splittedIds})
}
