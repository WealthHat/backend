const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.mandrillapp.com', // Use the Mailchimp SMTP server
  port: 465, // Use the appropriate port
  secure: true, // Set to true if the port is 465
  auth: {
    user: 'wealth', // Your Mailchimp username (usually your API key)
    pass: 'md--3In8449lKd4vCz8TOWalw', // Use an empty string as the password
  },
});


const sendEmail = (email, firstname, code) => {
  const mailOptions = {
    from: 'info@hapartment.org', // Sender's email
    to: email, // Recipient's email
    subject: 'Test Email',
    text: 'This is a test email sent using Nodemailer and Mailchimp SMTP.',
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
