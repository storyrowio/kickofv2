package lib

import (
	"kickof/models"
	"math/rand"
	"regexp"
	"strconv"
	"strings"
	"time"
)

const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
const numberset = "0123456789"

var seededRand = rand.New(
	rand.NewSource(time.Now().UnixNano()))

func RandomChar(length int) string {
	b := make([]byte, length)
	for i := range b {
		if i == 0 {
			b[i] = charset[seededRand.Intn(25)]
		} else {
			b[i] = charset[seededRand.Intn(len(charset))]
		}
	}
	return string(b)
}

func RandomNumber(length int) string {
	b := make([]byte, length)
	for i := range b {
		if i == 0 {
			b[i] = charset[seededRand.Intn(25)]
		} else {
			b[i] = charset[seededRand.Intn(len(numberset))]
		}
	}
	return string(b)
}

func SlugGenerator(name string) string {
	text := []byte(strings.ToLower(name))

	regE := regexp.MustCompile("[[:space:]]")
	text = regE.ReplaceAll(text, []byte("-"))

	final := string(text) + "-" + RandomChar(3)
	final = strings.ReplaceAll(final, ".", "")

	return strings.ToLower(final)
}

func InvoiceGenerator() string {
	date := time.Now().Unix()
	char := RandomChar(3)

	return strconv.FormatInt(date, 10) + char
}

func CodeGenerator(name string) string {
	text := strings.ReplaceAll(name, " ", "")
	text = strings.ToLower(text)
	text = text + "-" + RandomNumber(3)

	return text
}

func GetAllSidebarMenus() []models.FrontSidebarMenu {
	menus := []models.FrontSidebarMenu{
		{
			Id:    "dashboard",
			Title: "Dashboard",
			Icon:  "dashboard",
			Path:  "/",
		},
		{
			Id:    "user",
			Title: "User",
			Icon:  "user",
			Children: []models.FrontSidebarMenu{
				{
					Id:          "user:create",
					Title:       "Create User",
					Path:        "/user",
					Permissions: []string{"user:create"},
				},
			},
		},
		{
			Id:           "system",
			Title:        "System",
			SectionTitle: true,
		},
		{
			Id:          "system-setting",
			Title:       "System Setting",
			Icon:        "systemSetting",
			Path:        "/system-setting",
			Permissions: []string{"system:setting"},
		},
		{
			Id:          "system-permission",
			Title:       "Permission",
			Icon:        "permission",
			Path:        "/system-permission",
			Permissions: []string{"system:setting"},
		},
		{
			Id:          "system-role",
			Title:       "Role",
			Icon:        "role",
			Path:        "/system-role",
			Permissions: []string{"system:setting"},
		},
	}

	return menus
}

func MenuHasAnyPermission(menuPermissions []string, userPermissions []string) bool {
	for _, perm := range menuPermissions {
		for _, userPermission := range userPermissions {
			if userPermission == "all" || userPermission == perm {
				return true
			}
		}
	}

	return len(menuPermissions) == 0
}

func GenerateSidebarMenus(userPermissions []string, menus []models.FrontSidebarMenu) []models.FrontSidebarMenu {
	if menus == nil {
		menus = GetAllSidebarMenus()
	}

	result := make([]models.FrontSidebarMenu, 0)

	for _, menu := range menus {
		if len(menu.Permissions) > 0 && !MenuHasAnyPermission(menu.Permissions, userPermissions) {
			continue
		}

		if len(menu.Children) > 0 {
			menu.Children = GenerateSidebarMenus(userPermissions, menu.Children)
			if len(menu.Children) == 0 {
				continue
			}
		}

		result = append(result, menu)
	}

	return result
}
