package models

type SendMailRequest struct {
	To           string      `json:"to"`
	From         string      `json:"from"`
	Subject      string      `json:"subject"`
	Data         interface{} `json:"data"`
	TemplatePath string      `json:"templatePath"`
	MailSetting  MailSetting `json:"mailSetting"`
}

type MailSetting struct {
	MailHost        string `json:"MAIL_HOST"`
	MailPort        string `json:"MAIL_PORT"`
	MailUsername    string `json:"MAIL_USERNAME"`
	MailAppPassword string `json:"MAIL_APP_PASSWORD"`
}

type VerificationMail struct {
	Name string `json:"name"`
	Link string `json:"link"`
}

type InvitationMail struct {
	InviterName   string `json:"inviterName"`
	WorkspaceName string `json:"workspaceName"`
	Email         string `json:"email"`
	Link          string `json:"link"`
	SupportEmail  string `json:"supportEmail"`
}
