import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send test score email to user
 * @param {string} to - Recipient email
 * @param {string} name - User name
 * @param {string} scoreUrl - URL to view score
 */
export const sendScoreEmail = async (to, name, scoreUrl) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to,
    subject: 'Your Test Results - CBT Bahasa Inggris',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e4e8; rounded: 8px;">
        <h2 style="color: #24292e; text-align: center;">Congratulations, ${name}!</h2>
        <p style="color: #586069; font-size: 16px; line-height: 1.5;">
          You have successfully completed your test package. You can view your detailed performance report and band scores by clicking the button below:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${scoreUrl}" style="background-color: #0366d6; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block;">View My Score</a>
        </div>
        <p style="color: #586069; font-size: 14px;">
          If the button doesn't work, copy and paste this link into your browser: <br>
          <a href="${scoreUrl}" style="color: #0366d6;">${scoreUrl}</a>
        </p>
        <hr style="border: 0; border-top: 1px solid #e1e4e8; margin: 20px 0;">
        <p style="color: #959da5; font-size: 12px; text-align: center;">
          This is an automated message from CBT Bahasa Inggris Proficiency Assessment System.
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
