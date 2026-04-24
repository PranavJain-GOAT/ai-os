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
      from: process.env.EMAIL_FROM || 'AIStack <noreply@aistack.com>',
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
  const subject = 'Welcome to AIStack!';
  const html = `<h1>Hello ${name}!</h1><p>Welcome to AIStack, the premium AI solutions marketplace.</p>`;
  return sendEmail(to, subject, html);
};

const sendPurchaseConfirmation = async (to, productName) => {
  const subject = 'Your Purchase Confirmation';
  const html = `<h1>Thank You!</h1><p>You have successfully purchased ${productName}. Proceed to your dashboard to install it.</p>`;
  return sendEmail(to, subject, html);
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendPurchaseConfirmation
};
