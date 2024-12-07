/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import nodemailer from "nodemailer";
import mailgen from "mailgen";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { Logger } from "winston";
import configuration from "@/config/configuration.js";
import { User } from "@/models/User.js";

export interface MailPayload {
  user: User;
  link: string;
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

  async send(payload: MailPayload): Promise<boolean> {
    this.logger.info(`Sending password reset email to ${payload.user.email}`);
    try {
      const email = {
        body: {
          name: payload.user.firstName + " " + payload.user.lastName,
          intro:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.",
          action: {
            instructions:
              "Please click on the following link, or paste this into your web browser to complete the process:",
            button: {
              text: "Reset your password",
              link: payload.link,
            },
          },
          outro:
            "If you did not request this, please ignore this email and your password will remain unchanged.\n" +
            "\n" +
            "Best regards,\n" +
            "The Quizloom Team",
        },
      };
      const mailGenerator = new mailgen({
        theme: "default",
        product: {
          name: "Quizloom",
          link: "https://quizloom.com/",
        },
      });

      // Generate an HTML email with the provided contents
      const emailBody = mailGenerator.generate(email);

      const info = await this.transporter.sendMail({
        from: `"Quizloom Team" <${configuration.smtp.username}>`,
        to: payload.user.email,
        subject: "Reset Password",
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
