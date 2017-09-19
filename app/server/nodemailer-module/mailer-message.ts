export interface MailerMessage {
    getSubject(): string;
    getMailMSG(): string;
}