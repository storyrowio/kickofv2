package controllers

import (
	"github.com/gin-gonic/gin"
	"kickof/lib"
	"kickof/models"
	"kickof/services"
	"log"
	"net/http"
)

func GetFrontSidebarMenus(c *gin.Context) {
	profile := services.GetCurrentUser(c.Request)
	if profile == nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: "Unauthorized"})
		return
	}
	log.Println(profile.Permissions)
	menus := lib.GenerateSidebarMenus(profile.Permissions, nil)

	c.JSON(http.StatusOK, models.Response{Data: menus})
}
