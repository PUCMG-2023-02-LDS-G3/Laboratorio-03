import "dotenv/config";
import {MailService} from '@sendgrid/mail';

class EmailService {
  sengrid = new MailService()
  constructor() {
    this.sengrid.setApiKey("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");
  }

  async sendEmail(email: string, subject: string, message: string) {
    const msg = {
      to: email,
      from: "arthurjuju7@gmail.com",
      subject: subject,
      text: "dasdadas",
      html: `<strong>${message}</strong>`,
    };

    await this.sengrid.send(msg);
  }
}

export default EmailService;
