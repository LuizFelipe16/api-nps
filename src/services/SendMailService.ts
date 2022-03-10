import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

// Ele ta mandando o emial, mas precisa terminar com a integração com GMail que é diferente e 
// Ele não ta pegando template certo, acho que é por causa da autenticação com GMail

class SendMailService {
  private client: Transporter;

  constructor() {
    // Método executado assim que uma classe é chamada/executada
    // nodemailer.createTestAccount().then((account) => {
    //   const transporter = nodemailer.createTransport({
    //     host: account.smtp.host,
    //     port: account.smtp.port,
    //     secure: account.smtp.secure,
    //     auth: {
    //       user: account.user,
    //       pass: account.pass
    //     }
    //   });

    //   this.client = transporter;
    // });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        user: "felipefelizatti215@gmail.com",
        pass: "felipebarcelona2@",
      }
    });

    this.client = transporter;
  }

  async execute(to: string, subject: string, variables: object, path: string) {
    const templateFileContent = fs.readFileSync(path).toString("utf8");
    const mailTemplateParse = handlebars.compile(templateFileContent);

    const html = mailTemplateParse(variables);

    this.client.sendMail({
      to,
      subject,
      html,
      from: "<felipefelizatti215@gmail.com>"
    }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email enviado!")
      }
    });

    // console.log('Message sent: %s', message.messageId);
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();