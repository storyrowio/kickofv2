package models

type InviteMemberRequest struct {
	WorkspaceId string `json:"workspaceId"`
	Email       string `json:"email"`
}
