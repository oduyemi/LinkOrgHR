const express = require('express');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const app = express();
const port = 3000;

app.post('/generate-payslips', async (req, res) => {
  const { department } = req.body;
  const employees = await getEmployeesByDepartment(department);

  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  for (const employee of employees) {
    const pdfDoc = new PDFDocument();
    let buffers = [];
    pdfDoc.on('data', buffers.push.bind(buffers));
    pdfDoc.on('end', async () => {
      const pdfData = Buffer.concat(buffers);
      const mailOptions = {
        from: 'your-email@gmail.com',
        to: employee.workEmail,
        subject: 'Your Payslip',
        attachments: [{ filename: 'payslip.pdf', content: pdfData }],
        text: 'Please find your payslip attached.',
      };

      await transporter.sendMail(mailOptions);
    });

    pdfDoc.text(`Payslip for ${employee.name}`);
    pdfDoc.text(`Job Title: ${employee.jobTitle}`);
    pdfDoc.text(`Salary: $${employee.salary}`);
    pdfDoc.end();
  }

  res.status(200).send('Payslips generated and sent successfully');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const getEmployeesByDepartment = async (department) => {
  // Fetch employees from your database based on the department
  return []; 
};
