package models

const (
	TodoStateType       = "todo"
	InProgressStateType = "inProgress"
	CompletedStateType  = "completed"
	CancelledStateType  = "cancelled"
)

type State struct {
	Id          string    `json:"id"`
	WorkspaceId string    `json:"workspaceId" bson:"workspaceId"`
	ProjectId   string    `json:"projectId" bson:"projectId"`
	Name        string    `json:"name"`
	Type        string    `json:"type"` // todo, inProgress
	IsDefault   bool      `json:"isDefault" bson:"isDefault"`
	Workspace   Workspace `json:"workspace" bson:"-"`
	Project     Project   `json:"project" bson:"-"`
	Tasks       []Task    `json:"tasks" bson:"-"`
	BasicDate   `bson:",inline"`
}
