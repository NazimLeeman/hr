import nodemailer from 'nodemailer';

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bento.mailer.service@gmail.com',
    pass: 'ifwd jdkb moph xnzu',
  },
});

// Function to send the payroll email
function sendPayrollEmail(to: string, subject: string, content: string): void {
  const mailOptions = {
    from: 'bento.mailer.service@gmail.com',
    to,
    subject,
    text: content,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

export { sendPayrollEmail };
