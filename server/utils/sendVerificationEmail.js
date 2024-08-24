const sendEmail = require('./sendEmail');

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;

  const message = ` <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2>Account Confirmation</h2>
  <p>Dear ${name},</p>
  <p>Thank you for registering with our web app. To activate your account, please click the button below:</p>
  <div style="text-align: center; margin-top: 20px;">
      <a href="${verifyEmail}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #fff; text-decoration: none;">Confirm Account</a>
  </div>
  <p>If you did not sign up for an account, you can safely ignore this email.</p>
  <p>Thank you,</p>
  <p>Your Reader Team</p>
</div>`;

  return sendEmail({
    to: email,
    subject: 'Email Confirmation',
    html: `${message}`,
  });
};

module.exports = sendVerificationEmail;
