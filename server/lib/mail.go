package lib

import (
	"bytes"
	"gopkg.in/gomail.v2"
	"html/template"
	"kickof/models"
	"log"
	"os"
	"strconv"
)

func SendEmail(params models.SendMailRequest) error {
	from := "no-reply@storyrow.id"
	if os.Getenv("APP_DOMAIN") != "" {
		from = "no-reply@" + os.Getenv("APP_DOMAIN")
	}

	result, _ := ParseTemplate(params.TemplatePath, params.Data)

	m := gomail.NewMessage()
	m.SetAddressHeader("From", from, "Kickof")
	m.SetHeader("To", params.To)
	m.SetHeader("Subject", params.Subject)
	m.SetBody("text/html", result)

	m.Embed("templates/assets/logo.png")

	port, _ := strconv.ParseInt(params.MailSetting.MailPort, 10, 64)

	d := gomail.NewDialer(params.MailSetting.MailHost, int(port), params.MailSetting.MailUsername, params.MailSetting.MailAppPassword)
	err := d.DialAndSend(m)
	if err != nil {
		return err
	}
	return err
}

func ParseTemplate(templateFileName string, data interface{}) (string, error) {
	t, err := template.ParseFiles(templateFileName)
	if err != nil {
		log.Println(err)
		return "", err
	}
	buf := new(bytes.Buffer)
	if err = t.Execute(buf, data); err != nil {
		log.Println(err)
		return "", err
	}
	return buf.String(), nil
}
