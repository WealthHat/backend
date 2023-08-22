const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mailchimp = require('mailchimp-api-v3');

const app = express();
const port = 3000; // Set your desired port

// Configure body-parser to parse incoming JSON
app.use(bodyParser.json());

// Initialize Mailchimp API with your API key
const mailchimpApiKey = 'eb5f567b19c8c94326fde6ba3a813834-us21';
const mailchimpAudienceId = '3f7207fac8'; // The ID of your Mailchimp audience

const mailchimpClient = new mailchimp(mailchimpApiKey);

// Configure Nodemailer with your SMTP settings
const transporter = nodemailer.createTransport({
  host: 'smtp.mandrillapp.com',
  port: 587,
  secure: false,
  auth: {
    user: 'wealth', // Your custom domain email
    pass: 'md--3In8449lKd4vCz8TOWalw',
  },
});

// Registration endpoint
app.post('/register', async (req, res) => {
  try {
    // Assuming you are receiving the user's email in the request body
    const { email } = req.body;

    // Add user to Mailchimp audience
    // await mailchimpClient.post(`/lists/${mailchimpAudienceId}/members`, {
    //   email_address: email,
    //   status: 'subscribed',
    // });

    // Send welcome email using Nodemailer
    await transporter.sendMail({
      from: 'support@hapartment.org',
      to: email,
      subject: 'Welcome to Hapartment!',
      text: 'Thank you for registering!',
    });

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
