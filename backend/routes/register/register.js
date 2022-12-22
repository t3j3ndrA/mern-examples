import express from "express";
const router = express.Router();
import {
	LINK_SENT_FOR_VERIFICATION,
	USER_ALREADY_REGISTERED,
} from "../../constants.js";

import amqp from "amqplib/callback_api.js";

import findByEmail from "../../controllers/user/findByEmail.js";
import saveUser from "../../controllers/user/saveUser.js";

router.post("/get-verification", (req, res) => {
	sendVerificationEmail("Dhanani", "Tejendra", "tejendradhanani@gmail.com");
	res.json({ msg: "email send" });
});

router.post("/", async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	const userFound = await findByEmail(email);

	if (userFound) {
		return res.json({ code: 2, msg: USER_ALREADY_REGISTERED });
	}

	saveUser(firstName, lastName, password, email)
		.then((savedUser) => {
			// create the channel for RabbitMQ
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
						Buffer.from(JSON.stringify(req.body))
					);
				});
			});

			return res.json({
				code: 1,
				msg: LINK_SENT_FOR_VERIFICATION,
			});
		})
		.catch((err) => {
			console.log(err);
			return res.json(err);
		});
});

export default router;
