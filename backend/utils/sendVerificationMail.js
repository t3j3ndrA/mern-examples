import generateEmailTemplate from "./generateEmailTemplate.js";
import nodemailer from "nodemailer";
import env from "dotenv";
env.config();

const sendVerificationEmail = async (firstName, lastName, email) => {
	const from = process.env.GMAIL_EMAIL;
	const to = email;
	const subject = "MyCompany - Account activation link";
	const html = generateEmailTemplate(firstName, lastName, email);

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.GMAIL_EMAIL,
			pass: process.env.GMAIL_APP_PASS,
		},
	});

	let mailOptions = {
		from,
		to,
		subject,
		html,
	};

	console.log("MAIL-OPTIONS >> ", mailOptions);

	transporter.sendMail(mailOptions, (err, response) => {
		if (err) {
			console.log("error >> ", err);
		} else {
			console.log("response >> ", response);
		}
	});
};

export default sendVerificationEmail;
