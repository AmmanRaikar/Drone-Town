const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse the form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a transporter object using default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dronetown.noreply@gmail.com', // Your email
        pass: 'dronetown@2000', // App password (or use environment variables)
    },
});

// POST route to handle form submission
app.post('/book.html', (req, res) => {
    const { name, contact, email, eventName, eventVenue, service, specialRequest } = req.body;

    const mailOptions = {
        from: 'dronetown.noreply@gmail.com',
        to: 'destination-email@example.com', // Recipient's email
        subject: `Booking Request from ${name}`,
        text: `
            You have a new booking request:
            Name: ${name}
            Contact: ${contact}
            Email: ${email}
            Event Name: ${eventName}
            Event Venue: ${eventVenue}
            Service Chosen: ${service}
            Special Request: ${specialRequest}
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error.message);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent successfully:', info.response);
        res.send('Booking submitted successfully!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
