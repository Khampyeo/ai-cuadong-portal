export type EmailingDto = {
  smtpHost: string;
  smtpPort: number;
  smtpUserName: string;
  smtpPassword: string;
  smtpDomain: string;
  smtpEnableSsl: boolean;
  smtpUseDefaultCredentials: boolean;
  defaultFromAddress: string;
  defaultFromDisplayName: string;
};

export type SendTestEmailDto = {
  senderEmailAddress: string;
  targetEmailAddress: string;
  subject: string;
  body: string;
};
