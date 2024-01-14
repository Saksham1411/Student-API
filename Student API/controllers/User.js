const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const SecertKey = 'nvsklgsa0';

const userRegister = async (req, res) => {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({ email, password: hashedPassword });

    res.send('created');
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
        return res.send('user not found');
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
        return res.send('password not matched');
    }

    const token = jwt.sign({ email: user.email }, SecertKey);

    res.cookie("token", token).send({ msg: 'login success', token });

}

module.exports = { userRegister, userLogin };