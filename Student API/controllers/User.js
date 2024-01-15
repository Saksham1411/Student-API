const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const userRegister = async (req, res) => {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        await User.create({ email, password: hashedPassword });
        res.status(StatusCodes.CREATED).send('created');
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send('user already exist');
    }

}

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).send('user not found');
        // const err = new Error('user not found');
        // console.log(err.message);
        // throw err;
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
        return res.status(StatusCodes.BAD_REQUEST).send('password not matched');
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECERT);

    res.status(StatusCodes.OK).send({ msg: 'login success', token });

}

module.exports = { userRegister, userLogin };