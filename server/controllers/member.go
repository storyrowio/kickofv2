package controllers

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"kickof/lib"
	"kickof/models"
	"kickof/services"
	"log"
	"net/http"
	"os"
	"time"
)

func InviteMember(c *gin.Context) {
	var request models.InviteMemberRequest
	err := c.ShouldBindJSON(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	profile := services.GetCurrentUser(c.Request)
	if profile == nil {
		c.JSON(http.StatusUnauthorized, models.Response{Data: errors.New("no user found")})
		return
	}

	workspace := services.GetWorkspace(bson.M{"id": request.WorkspaceId}, nil, false)
	if workspace == nil {
		c.JSON(http.StatusNotFound, models.Response{Data: fmt.Sprintf("workspace %s does not exist", request.WorkspaceId)})
	}

	token, err := lib.GenerateToken(request.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, models.Response{Data: err.Error()})
		return
	}

	invitationConfirmUrl := fmt.Sprintf("%s/invite-member-confirm/%s", os.Getenv("FRONTEND_URL"), token)
	mailData := models.InvitationMail{
		InviterName:   profile.Name,
		WorkspaceName: workspace.Name,
		Email:         request.Email,
		Link:          invitationConfirmUrl,
		SupportEmail:  os.Getenv("SUPPORT_EMAIL"),
	}
	mailRequest := models.SendMailRequest{
		To:           request.Email,
		Subject:      "You’ve been invited to join a workspace on Loomtales.",
		Data:         mailData,
		TemplatePath: "templates/invitation-member.html",
	}

	err = services.SendMail(mailRequest)
	if err != nil {
		log.Println("Error sending email:", err)
	}

	_, err = services.CreateMemberInvitation(models.MemberInvitation{
		WorkspaceId: workspace.Id,
		InviterId:   profile.Id,
		Email:       request.Email,
		ExpiresAt:   time.Now().Add(time.Hour * 24),
		Status:      models.PendingMemberInvitation,
	})

	c.JSON(http.StatusOK, models.Response{Data: "Success"})
}
