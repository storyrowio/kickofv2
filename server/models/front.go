package models

type FrontSidebarMenu struct {
	Id           string             `json:"id"`
	Title        string             `json:"title"`
	Icon         string             `json:"icon"`
	Path         string             `json:"path"`
	Permissions  []string           `json:"permissions,omitempty"`
	Children     []FrontSidebarMenu `json:"children,omitempty"`
	SectionTitle bool               `json:"sectionTitle"`
	BasicDate    `bson:",inline"`
}
