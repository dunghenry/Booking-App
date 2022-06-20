export const validateRegister = (user) => {
    const { name, email, password, confirmPassword } = user;
    const errors = [];
    if (!name.trim()) {
        errors.push("Please add your name!");
    }
    else if (name.length > 20) {
        errors.push("Your name is longer than 15 characters!");
    }
    if (!email.trim()) {
        errors.push("Please add your email!");
    }
    else if (!validateEmail(email)) {
        errors.push("Email format is incorrect!");
    }
    if (password && confirmPassword) {
        const msg = checkPassword(password, confirmPassword);
        if (msg) errors.push(msg);
    }
    else if (!password || !confirmPassword) {
        errors.push("Password or confirm password cannot be blank!");
    }
    return {
        errMsg: errors,
        errLength: errors.length
    }
}


export const checkPassword = (password, confirmPassword) => {
    if (password.length < 6 || confirmPassword.length < 6) {
        return ("Password must be at least 6 characters!");
    }
    else if (password !== confirmPassword) {
        return ("Confirm password did not match!");
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export default validateEmail;