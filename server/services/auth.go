package services

import (
	"errors"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"kickof/database"
	"kickof/lib"
	"kickof/models"
	"log"
	"time"
)

func AuthWithSocial(user *models.User, request models.AuthRequest) error {
	isExist := false
	if user != nil {
		userSocial := GetUserSocials(user.Id)
		for _, val := range userSocial {
			if val.Type == request.Social && val.SocialId == request.SocialId {
				isExist = true
			}
		}
	}

	if !isExist {
		roleId := ""
		role := GetRole(bson.M{"code": models.AdminRole}, nil, false)
		if role != nil {
			roleId = role.Id
		}
		newUserId := uuid.New().String()
		userSocial := models.UserSocial{
			Id:       uuid.New().String(),
			UserId:   newUserId,
			Type:     request.Social,
			SocialId: request.SocialId,
		}

		if user == nil {
			newUser := models.User{
				Id:            newUserId,
				RoleId:        roleId,
				Name:          request.Name,
				Email:         request.Email,
				Image:         request.Image,
				Active:        true,
				LastActive:    time.Now(),
				CurrentSocial: userSocial.Id,
				BasicDate: models.BasicDate{
					CreatedAt: time.Now(),
					UpdatedAt: time.Now(),
				},
			}
			_, err := CreateUser(newUser)
			if err != nil {
				return err
			}
		} else {
			if user.Image == "" {
				user.Image = request.Image
			}
			user.CurrentSocial = userSocial.Id
			user.Active = true
			user.LastActive = time.Now()
			user.UpdatedAt = time.Now()
			_, err := UpdateUser(user.Id, user)
			if err != nil {
				log.Println("Error Update User Auth Social:", err.Error())
			}
		}

		_, err := CreateUserSocial(userSocial)
		if err != nil {
			return err
		}
	}

	return nil
}

func Activate(token string) (bool, error) {
	email, err := lib.VerifyToken(token)

	if err != nil {
		return false, err
	}

	filter := bson.M{"email": email}

	var user models.User
	cursor := database.FindOne(UserCollection, filter, nil)

	err = cursor.Decode(&user)
	if err != nil {
		return false, err
	}

	user.Active = true

	_, err = database.UpdateOne(UserCollection, filter, user)
	if err != nil {
		return false, err
	}

	return true, nil
}

func ForgotPassword(email string, url string) (bool, error) {
	user := GetUser(bson.M{"email": email}, nil)
	if user == nil {
		return false, errors.New("user not found")
	}

	token, err := lib.GenerateToken(email)

	if err != nil {
		return false, err
	}

	tokenValue := *token

	data := models.VerificationMail{
		Name: user.Name,
		Link: url + tokenValue,
	}

	mailRequest := models.SendMailRequest{
		To:           user.Email,
		Subject:      "Your Verification Link",
		Data:         data,
		TemplatePath: "templates/forgot-password.html",
	}

	err = lib.SendEmail(mailRequest)
	if err != nil {
		log.Println("Error sending email:", err)
	}

	return true, nil
}

func UpdatePassword(token string, password string) (bool, error) {
	email, err := lib.VerifyToken(token)

	if err != nil {
		return false, err
	}

	filter := bson.M{"email": email}

	var user models.User
	cursor := database.FindOne(UserCollection, filter, nil)

	err = cursor.Decode(&user)
	if err != nil {
		return false, err
	}

	user.Password = lib.HashAndSalt(password)

	_, err = database.UpdateOne(UserCollection, filter, user)
	if err != nil {
		return false, err
	}

	return true, nil
}
