const jwt = require('jsonwebtoken');
const College = require("../models/college");
const Student = require("../models/student");

const checkCollege = (req, res, next) => {
    const token = req.cookies.jwt;
    //check if token exists
    if (token) {
        jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.college = null;
                res.cookie('jwt', '', { maxAge: 1 });
                res.redirect('/college/login');
            }
            else {
                console.log(decodedToken);
                let college = await College.findById(decodedToken.id);

                if (college) {
                    res.locals.college = college;
                    next();
                }
                else {
                    res.locals.college = null;
                    res.cookie('jwt', '', { maxAge: 1 });
                    res.redirect('/college/login');
                }
            }
        })
    }
    else {
        res.locals.college = null;
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/college/login');
    }
};

const checkStudent = (req, res, next) => {
    const token = req.cookies.jwt;
    //check if token exists
    if (token) {
        jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.cookie('jwt', '', { maxAge: 1 });
                res.redirect('/student/login');
            }
            else {
                console.log(decodedToken);
                let student = await Student.findById(decodedToken.id);

                if (student) {
                    res.locals.student = student;
                    next();
                }
                else {
                    res.locals.student = null;
                    res.cookie('jwt', '', { maxAge: 1 });
                    res.redirect('/student/login');
                }
            }
        })
    }
    else {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/student/login');
    }

}
module.exports = { checkCollege, checkStudent }