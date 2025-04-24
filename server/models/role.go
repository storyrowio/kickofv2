package models

const (
	SystemAdminRole = "systemadmin"
	AdminRole       = "admin"
	ManagerRole     = "manager"
	MemberRole      = "member"
)

type Role struct {
	Id            string       `json:"id"`
	Name          string       `json:"name"`
	Code          string       `json:"code"`
	PermissionIds []string     `json:"permissionIds"` // permission ids
	RoleType      string       `json:"roleType"`      // systemAdmin, admin, manager
	Permissions   []Permission `json:"permissions" bson:"-"`
	BasicDate     `bson:",inline"`
}

type Permission struct {
	Id          string `json:"id"` // user:create, user:read
	Name        string `json:"name"`
	Description string `json:"description"`
}

type UserProjectRole struct {
	UserId    string `json:"userId" bson:"userId"`
	ProjectId string `json:"projectId" bson:"projectId"`
	RoleId    string `json:"roleId" bson:"roleId"`
}
