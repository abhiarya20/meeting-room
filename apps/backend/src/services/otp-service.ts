import crypto from "crypto";
import hashService from "./hash-service";
import nodemailer from "nodemailer";

class OtpService {
  async generateOtp() {
    const otp = crypto.randomInt(100000, 999999);
    return otp;
  }

  async sendByEmail(email, otp, name) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    return await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: email, // list of receivers
      subject: "OTP for Verification", // Subject line
      html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Edudoor OTP Verification</title>
                <style>
                body {
                    font-family: sans-serif;
                    background-color: #fff;
                }

                .container {
                    max-width: 600px;
                    margin: 0 auto;
                }

                h2 {
                    text-align: center;
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }

                .otp-code {
                    font-size: 36px;
                    font-weight: bold;
                    text-align: center;
                    margin: 20px 0;
                    color: #fff;
                    background-color: #000;
                    padding: 20px;
                    border-radius: 5px;
                }

                p {
                    font-size: 16px;
                    line-height: 24px;
                    margin: 0;
                }

                .cta-button {
                    text-decoration: none;
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #46c4e3;
                    color: #fff;
                    font-size: 16px;
                    font-weight: bold;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                </style>
            </head>
            <body>
                <div class="container">
                <h2>Meeting Room OTP Verification</h2>

                <p>Dear User,</p>

                <p>Welcome to the Meeting Room, To verify your email, please enter the following OTP code:</p>

                <div class="otp-code">${otp}</div>

                <p>This code is valid for 5 minutes.</p>

                <p>If you have any problems, please don't hesitate to contact us.</p>

                <a href="mailto:abhyarya.2.0@gmail.com" class="cta-button">Contact Us</a>

                <p>Thanks,</p>
                <p>Meeting Room</p>
                </div>
            </body>
            </html>`,
    });
  }

  verifyOtp(hashedOtp, data) {
    let computedHash = hashService.hashOtp(data);
    return computedHash === hashedOtp;
  }
}

export default new OtpService();
