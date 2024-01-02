import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

interface SendMailConfig {
    to: string;
    from: string;
    subject: string;
    html: string;
}

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService){}

    sendMail(config: SendMailConfig): void {
         this.mailerService.sendMail({
             to: config.to,
             from: config.from,
             subject: config.subject,
             html: config.html
         });
     }
}
