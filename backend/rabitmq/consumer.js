import amqp from "amqplib/callback_api.js";
import env from "dotenv";
import sendVerificationEmail from "../utils/sendVerificationMail.js";
env.config();

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

		console.log(" [*] Waiting for data on queue - ", process.env.EMAIL_QUEUE);

		// listen and grab the data send by publisher
		// send the mail
		channel.consume(
			process.env.EMAIL_QUEUE,
			function (msg) {
				let parsedMsg = JSON.parse(msg.content.toString());
				console.log(" [x] User data : ", parsedMsg);
				// send the verification link to the user email associated asynchronysly
				sendVerificationEmail(
					parsedMsg.firstName,
					parsedMsg.lastName,
					parsedMsg.email
				);
			},
			{
				noAck: true,
			}
		);
	});
});
