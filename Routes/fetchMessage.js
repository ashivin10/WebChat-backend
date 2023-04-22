const router = require("express").Router();
const message = require("../Models/Message");
const fetchuser = require('../MiddleWare/fetchuser')

router.get("/",fetchuser, async (req, res) => {
	try {
		const msg = await message.find();

		res.status(201).send(msg);
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;