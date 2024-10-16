
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rsiva657@gmail.com', // Replace with your email
    pass: 'zjmo ueds aeui zsma', // Replace with your app-specific email password
  },
});

exports.sendFeedback = (req, res) => {
  const { rating, comments, name, email,  phoneNumber, } = req.body;
  console.log(rating,comments,name,email);
  

  const mailOptions = {
    from: email, // Sender email
    to: 'ramadurai110922@gmail.com', // Receiver email (you can replace this with your receiver email)
    subject: `Feedback from ${name}`,
    text: `You received a new feedback:
    Rating: ${rating}
    Comments: ${comments}
    Name: ${name}
    Email: ${email}
    Phone NUmber: ${phoneNumber}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending feedback' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Feedback sent successfully' });
    }
  });
};












// Assuming you've already created an Express app instance
// const express = require('express');
// const app = express();
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// app.use(cors()); // Enable CORS for all routes
// app.use(bodyParser.json()); // Parse JSON bodies

// // Nodemailer transporter setup
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'rsiva657@gmail.com', // Replace with your email
//     pass: 'Alliswell@12', // Replace with your email password (or app-specific password if using Gmail)
//   },
// });

// // Route to send feedback via email
// app.post('/feedback/send-feedback', (req, res) => { // Ensure this path matches what you use in the client
//   const { rating, comments, name, email } = req.body;

//   const mailOptions = {
//     from: 'ramadurai110922@gmail.com', 
//     to: 'rsiva657@gmail.com', 
//     subject: `Feedback from ${name}`,
//     text: `You received a new feedback:
//     Rating: ${rating}
//     Comments: ${comments}
//     Name: ${name}
//     Email: ${email}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send('Error sending email');
//     } else {
//       console.log('Email sent: ' + info.response);
//       res.status(200).send('Feedback sent successfully');
//     }
//   });
// });

// const PORT = 2002; // Ensure this matches the port you're trying to access
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
