import express from "express";
const router = express.Router();
import jwt, { decode } from "jsonwebtoken";
import amqp from "amqplib/callback_api.js";

import {
	TOKEN_NOT_FOUND,
	LINK_EXPIRED,
	USER_VERIFIED,
	LINK_SENT_FOR_VERIFICATION,
} from "../../constants.js";

import findByEmail from "../../controllers/user/findByEmail.js";
import user from "../../models/user.js";

router.get("/verify-user", async (req, res) => {
	const query = req.query;
	const token = query?.token;

	console.log("token recived = " + token);

	if (!token) {
		return res.json({ code: -1, msg: TOKEN_NOT_FOUND });
	}
	const JWT_SECRETS = process.env.JWT_SECRETS;

	jwt.verify(token, JWT_SECRETS, (err, decoded) => {
		if (err) {
			console.log(err);
			return res.json({ code: 0, msg: LINK_EXPIRED });
		}

		// update verification status in database for corresponding user
		user
			.findOneAndUpdate({ email: decoded.email }, { isVerified: true })
			.then(() => {
				// set user-id in cookies from database
				res.cookie("token", decoded);
				return res.redirect(process.env.BASE_URL);
			});
	});
});

router.get("/generate-verification-link", async (req, res) => {
	const { email } = req.body;
	const foundUser = await findByEmail(email);
	if (!foundUser) return res.json({ code: 0, msg: USER_NOT_FOUND });
	if (foundUser.isVerified) return res.json({ code: 2, msg: USER_VERIFIED });

	amqp.connect(process.env.RABBITMQ_URI, function (error0, connection) {
		if (error0) {
			throw error0;
		}
		connection.createChannel(function (error1, channel) {
			if (error1) {
				throw error1;
			}

			channel.assertQueue(process.env.EMAIL_QUEUE, {
				durable: false,
			});

			// send the json-stringified data to the consumer
			// consumer will push the email sending process in a queue
			channel.sendToQueue(
				process.env.EMAIL_QUEUE,
				Buffer.from(JSON.stringify(foundUser))
			);
		});
	});
	return res.json({ code: 1, msg: LINK_SENT_FOR_VERIFICATION });
});

export default router;
