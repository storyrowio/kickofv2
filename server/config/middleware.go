package config

import (
	"errors"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"kickof/lib"
	"kickof/models"
	"kickof/services"
	"net/http"
	"os"
	"strings"
)

func GetToken(request *http.Request) *string {
	header := request.Header["Authorization"]
	if header == nil {
		return nil
	}

	split := strings.Split(header[0], " ")
	if len(split) != 2 || strings.ToLower(split[0]) != "bearer" {
		return nil
	}

	return &split[1]
}

func CheckToken(tokenString string) (string, error) {
	claims := &models.Claims{}

	_, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET_KEY")), nil
	})

	if err != nil {
		return "", errors.New("token invalid")
	}

	return claims.Email, nil
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		header := c.Request.Header["Authorization"]

		if header == nil {
			c.Abort()
			c.Writer.WriteHeader(http.StatusUnauthorized)
			_, err := c.Writer.Write([]byte("unauthorized"))
			if err != nil {
				return
			}
			return
		}

		split := strings.Split(header[0], " ")
		if len(split) != 2 || strings.ToLower(split[0]) != "bearer" {
			c.Abort()
			c.Writer.WriteHeader(http.StatusUnauthorized)
			_, err := c.Writer.Write([]byte("bearer token format needed"))
			if err != nil {
				return
			}
			return
		}

		_, err := CheckToken(split[1])
		if err != nil {
			c.Abort()
			c.Writer.WriteHeader(http.StatusUnauthorized)
			_, err := c.Writer.Write([]byte("token invalid"))
			if err != nil {
				return
			}
			return
		}
	}
}

func CorsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func AdminMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := GetToken(c.Request)
		if token == nil {
			c.Abort()
			c.Writer.WriteHeader(http.StatusUnauthorized)
			_, err := c.Writer.Write([]byte("unauthorized"))
			if err != nil {
				return
			}
			return
		}

		_, err := CheckToken(*token)
		if err != nil {
			c.Abort()
			c.Writer.WriteHeader(http.StatusUnauthorized)
			_, err := c.Writer.Write([]byte("token invalid"))
			if err != nil {
				return
			}
			return
		}

		email, err := lib.VerifyToken(*token)
		if err != nil {
			c.Abort()
			c.Writer.WriteHeader(http.StatusUnauthorized)
			_, err := c.Writer.Write([]byte("unauthorized"))
			if err != nil {
				return
			}
			return
		}

		user := services.GetUser(bson.M{"email": email}, nil)
		if user == nil {
			c.Abort()
			c.Writer.WriteHeader(http.StatusUnauthorized)
			_, err := c.Writer.Write([]byte("unauthorized"))
			if err != nil {
				return
			}
			return
		}

		role := services.GetRole(bson.M{"id": user.RoleId}, nil, false)
		if role == nil {
			c.Abort()
			c.Writer.WriteHeader(http.StatusUnauthorized)
			_, err := c.Writer.Write([]byte("unauthorized"))
			if err != nil {
				return
			}
			return
		}

		if role.Code != models.SystemAdminRole {
			c.Abort()
			c.Writer.WriteHeader(http.StatusUnauthorized)
			_, err := c.Writer.Write([]byte("forbidden"))
			if err != nil {
				return
			}
			return
		}

		c.Next()
	}
}
