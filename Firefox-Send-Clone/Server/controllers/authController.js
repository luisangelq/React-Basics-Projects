const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");

exports.signIn = async (req, res, next ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
        res.status(422).json({ msg: "This User Doesn't Exist"  });

        return next();
    }

    if(bcrypt.compareSync(password, user.password)){
        res.status(200).json({ msg: "User Logged In Successfully"  });
    }else {
        res.status(422).json({ msg: "Invalid Password"  });
    }




}

exports.userData = async (req, res, next ) => {

}