module.exports.handleErrors = (user,err) => {
    let error = { email: "", password: "" };
    
    //Incorrect Email
    if (err.message === 'Incorrect Email') {
        error.email = 'Email Not Registered';
    }

    //Incorrect Password
    if (err.message === 'Incorrect Password') {
        error.password = 'Password Incorrect';
    }

    //Duplicate Error
    if (err.code === 11000) {
        error.email = "Email is taken"
        return error;
    }

    //Validation Errors
    if (err.message.includes(`${user} validation failed`)) {
        Object.values(err.errors).forEach(({ properties }) => {
            error[properties.path] = properties.message
        })
    }
    return error;
};