package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"kickof/config"
	"kickof/controllers"
	"kickof/database"
	"kickof/models"
	"log"
	"net/http"
	"os"
	"time"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file, will use system environment")
	}

	log.Println("Version: ", os.Getenv("VERSION"))

	if !database.Init() {
		log.Printf("Connected to MongoDB URI: Failure")
		return
	}

	router := gin.New()
	router.Use(gin.Logger())

	router.Use(static.Serve("/", static.LocalFile("./dist", true)))

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	corsConfig.AllowMethods = []string{"POST", "GET", "PATCH", "OPTIONS", "DELETE"}
	corsConfig.AllowHeaders = []string{"Origin", "Content-Type", "Authorization", "Accept", "User-Agent", "Cache-Control", "Pragma"}
	corsConfig.ExposeHeaders = []string{"Content-Length"}
	corsConfig.AllowCredentials = true
	corsConfig.MaxAge = 12 * time.Hour
	router.Use(cors.New(corsConfig))

	api := router.Group("/api")
	{
		api.GET("/version", func(c *gin.Context) {
			c.JSON(http.StatusOK, models.Response{
				Data: "Storyrow Api v" + os.Getenv("VERSION"),
			})
			return
		})

		api.GET("/default", controllers.CreateDefaultData)

		api.POST("/register", controllers.SignUp)
		api.POST("/login", controllers.SignIn)
		api.GET("/refresh-token", controllers.RefreshToken)
		api.POST("/activate", controllers.Activate)
		api.POST("/forgot-password", controllers.ForgotPassword)
		api.PATCH("/update-password", controllers.UpdatePassword)

		protected := api.Group("/", config.AuthMiddleware())
		{
			front := protected.Group("/front")
			{
				front.GET("/menus", controllers.GetFrontSidebarMenus)
			}

			protected.GET("/profile", controllers.GetProfile)
			protected.PATCH("/profile", controllers.UpdateProfile)

			protected.GET("/role", controllers.GetRoles)
			protected.POST("/role", controllers.CreateRole)
			protected.GET("/role/:id", controllers.GetRoleById)
			protected.PATCH("/role/:id", controllers.UpdateRole)
			protected.DELETE("/role/:id", controllers.DeleteRole)
			protected.POST("/role/attach-permission", controllers.AttachPermissionsToRole)

			protected.GET("/user", controllers.GetUsers)
			protected.POST("/user", controllers.CreateUser)
			protected.GET("/user/:id", controllers.GetUserById)
			protected.PATCH("/user/:id", controllers.UpdateUser)
			protected.DELETE("/user/:id", controllers.DeleteUser)

		}
	}

	port := "8000"
	if os.Getenv("PORT") != "" {
		port = os.Getenv("PORT")
	}

	err = router.Run(":" + port)
	if err != nil {
		return
	}
}
