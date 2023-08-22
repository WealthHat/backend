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


const sendEmail = (email, firstname, code) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL, // Sender's email
    to: email, // Recipient's email
    subject: 'welcome to WealthHat',
    html: `
     <p>Thank you for joining us</p>

    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendEmail;
