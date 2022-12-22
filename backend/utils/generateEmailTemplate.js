import getVerificationLink from "./getVerificationLink.js";
import env from "dotenv";
env.config();
const generateEmailTemplate = (firstName, lastName, email) => {
	const verificationLink = getVerificationLink(firstName, lastName, email);
	return `
	<body style="background-color:rgb(230, 230, 230); padding : 10px;">
	<h2 style="color:rgb(30, 75, 83); text-align: center; ">
		MyCompany -  Please verify the following link to continue
	</h2>
	<div style="padding:18px;margin:auto;">
	<p>Hello ${firstName + " " + lastName}, </p>
	<p>We are very happy to see you at MyCompany. Please click Verify Email button and enjoy to all our services hessel free.</p>
	<p>This link is valid for 24 Hours. Make sure you do it within deadline otherwise you may have to re-generate the link.</p>
	</div>
	<div style="display:flex; flex-direction:column; justify-content:center; align-items:center;">
	<a href=${verificationLink} style="display:block; margin:auto;"><button style="outline:none; background-color: rgb(30, 75, 83); color:white; padding:4px 10px;border:none; border-radius:6px; font-size:20px;">Verify Email</button></a>
	</div>
	<div style="padding:18px;margin:auto;">
	<p>Regards</p>
	<p>MyCompany</p>
	</div>
	<br>

	</body>
	`;
};

export default generateEmailTemplate;
