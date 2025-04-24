package controllers

import (
	"github.com/gin-gonic/gin"
	"kickof/lib"
	"kickof/models"
	"kickof/services"
	"net/http"
)

func GetFrontSidebarMenus(c *gin.Context) {
	profile := services.GetCurrentUser(c.Request)
	if profile == nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: "Unauthorized"})
		return
	}

	userPermissions := make([]string, 0)
	for _, permission := range profile.Permissions {
		userPermissions = append(userPermissions, permission.Id)
	}

	menus := lib.GenerateSidebarMenus(userPermissions, nil)

	c.JSON(http.StatusOK, models.Response{Data: menus})
}
