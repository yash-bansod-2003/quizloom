import nodemailer from "nodemailer";
import mailgen from "mailgen";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { Logger } from "winston";
import configuration from "@/config/configuration.js";

export interface MailPayload {
  email: string;
  content: mailgen.Content;
  subject: string;
}

class MailService {
  private readonly transporter: nodemailer.Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >;

  constructor(private readonly logger: Logger) {
    this.logger = logger;
    this.transporter = nodemailer.createTransport({
      service: configuration.smtp.service,
      auth: {
        user: configuration.smtp.username,
        pass: configuration.smtp.password,
      },
    });
  }

  async send({ email, subject, content }: MailPayload): Promise<boolean> {
    this.logger.info(`Sending password reset email to`);
    try {
      const mailGenerator = new mailgen({
        theme: "default",
        product: {
          name: "Quizloom",
          link: "https://quizloom.com/",
        },
      });

      // Generate an HTML email with the provided contents
      const emailBody = mailGenerator.generate(content) as string;

      const info = await this.transporter.sendMail({
        from: `"Quizloom Team" <${configuration.smtp.username}>`,
        to: email,
        subject: subject,
        html: emailBody,
      });

      this.logger.info(`Email sent: ${info.messageId}`);
      return true;
    } catch (error) {
      this.logger.error(`Error sending email: ${error as string}`);
      return false;
    }
  }
}

export default MailService;
