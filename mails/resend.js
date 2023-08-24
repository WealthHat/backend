const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.mandrillapp.com', // Use the Mailchimp SMTP server
  port: 587, // Use the appropriate port
  secure: false, // Set to true if the port is 465
  auth: {
    user: 'wealth', // Your Mailchimp username (usually your API key)
    pass: process.env.SMTP_KEY, // Use an empty string as the password
  },
});


const  ResendEmail = (email, firstname, code) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL, // Sender's email
    to: email, // Recipient's email
    subject: 'welcome to WealthHat',
    html: `
     <p>${firstname}, Thank you for joining us, Use this code ${code} to activate your account</p>

    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    }
  });
};

module.exports = ResendEmail;
