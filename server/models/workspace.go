package models

import "time"

const (
	PendingMemberInvitation = "pending"
	ExpiredMemberInvitation = "expired"
	SuccessMemberInvitation = "success"
)

type WorkspaceMemberRole struct {
	UserId string `json:"userId" bson:"userId"`
	RoleId string `json:"roleId" bson:"roleId"`
	User   User   `json:"user" bson:"-"`
	Role   Role   `json:"role" bson:"-"`
}

type Workspace struct {
	Id          string                `json:"id"`
	Name        string                `json:"name"`
	Description string                `json:"description"`
	Members     []WorkspaceMemberRole `json:"members"`
	BasicDate   `bson:",inline"`
}

type MemberInvitation struct {
	Id          string    `json:"id"`
	WorkspaceId string    `json:"workspaceId" bson:"workspaceId"`
	InviterId   string    `json:"inviterId" bson:"inviterId"` // User id
	Email       string    `json:"email" bson:"email"`
	ExpiresAt   time.Time `json:"expiresAt" bson:"expiresAt"`
	Status      string    `json:"status" bson:"status" default:"pending"`
	BasicDate   `bson:",inline"`
}
