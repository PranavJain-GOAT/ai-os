const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.sendgrid.net',
    port: process.env.SMTP_PORT || 587,
    auth: {
      user: process.env.SMTP_USER || 'apikey',
      pass: process.env.SMTP_PASS || 'fake_pass_for_dev'
    }
  });
};

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Deployra <noreply@deployra.com>',
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error('Email sending failed:', error);
    if (process.env.NODE_ENV !== 'development') {
      throw error;
    } else {
      logger.warn('Skipping email error in development mode.');
    }
  }
};

const sendWelcomeEmail = async (to, name) => {
  const subject = 'Welcome to Deployra!';
  const html = `<h1>Hello ${name}!</h1><p>Welcome to Deployra, the premium AI solutions marketplace.</p>`;
  return sendEmail(to, subject, html);
};

const sendPasswordResetEmail = async (to, name, resetUrl) => {
  const subject = 'Reset Your Deployra Password';
  const html = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eef2f6; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.02);">
      <div style="margin-bottom: 24px; text-align: center;">
        <img src="https://deployra.vercel.app/logo.png" alt="Deployra" style="width: 48px; height: 48px;" />
        <h2 style="color: #0f172a; font-size: 24px; font-weight: 700; margin-top: 16px; margin-bottom: 8px;">Reset Your Password</h2>
      </div>
      <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">Hello ${name},</p>
      <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">We received a request to reset the password for your Deployra account. Click the button below to choose a new password. This link is valid for 1 hour.</p>
      <div style="text-align: center; margin: 32px 0;">
        <a href="${resetUrl}" style="background-color: #108a00; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 9999px; font-weight: 700; font-size: 16px; display: inline-block; transition: background-color 0.2s;">Reset Password</a>
      </div>
      <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
      <div style="font-size: 13px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 24px; text-align: center;">
        If the button above doesn't work, copy and paste this URL into your browser:<br/>
        <a href="${resetUrl}" style="color: #108a00; text-decoration: underline; word-break: break-all;">${resetUrl}</a>
      </div>
      <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 32px 0;" />
      <p style="color: #94a3b8; font-size: 11px; text-align: center; margin: 0;">Deployra Marketplace © 2026</p>
    </div>
  `;
  return sendEmail(to, subject, html);
};

const sendPurchaseConfirmation = async (to, name, details) => {
  const subject = 'Purchase Confirmation - Deployra';
  const html = `<h1>Thank you for your purchase, ${name}!</h1><p>We are processing your order.</p>`;
  return sendEmail(to, subject, html);
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendPurchaseConfirmation,
  sendPasswordResetEmail
};
