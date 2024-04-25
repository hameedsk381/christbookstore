export const validateForm = (shippingDetails) => {
    let errors = {};
    let formIsValid = true;

    // Name validation
    if (!shippingDetails.name || shippingDetails.name.trim() === '') {
        formIsValid = false;
        errors['name'] = 'Please enter your name.';
    }

    // Email validation
    if (!shippingDetails.email) {
        formIsValid = false;
        errors['email'] = 'Please enter your email.';
    } else if (typeof shippingDetails.email !== 'undefined') {
        let lastAtPos = shippingDetails.email.lastIndexOf('@');
        let lastDotPos = shippingDetails.email.lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && shippingDetails.email.indexOf('@@') === -1 && lastDotPos > 2 && (shippingDetails.email.length - lastDotPos) > 2)) {
            formIsValid = false;
            errors['email'] = 'Email is not valid.';
        }
    }

    // Address validation
    if (!shippingDetails.address || shippingDetails.address.trim() === '') {
        formIsValid = false;
        errors['address'] = 'Please enter your address.';
    }

    // City validation
    if (!shippingDetails.city || shippingDetails.city.trim() === '') {
        formIsValid = false;
        errors['city'] = 'Please enter your city.';
    }

    if (!shippingDetails.zip) {
        formIsValid = false;
        errors['zip'] = 'Please enter your ZIP code.';
    } else if (!/^\d{6}$/.test(shippingDetails.zip)) { // Adjust the regex according to the country's ZIP format
        formIsValid = false;
        errors['zip'] = 'ZIP code is not valid.';
    }

    // Add validation for phone number
    if (!shippingDetails.phoneNum || shippingDetails.phoneNum.trim() === '' || shippingDetails.phoneNum.length !== 10) {
        formIsValid = false;
        errors['phoneNum'] = 'Please enter a 10-digit phone number.';
    }


    return {formIsValid,errors};
};
export const validateCredentials = (userDetails)=>{
    const errors = {};
    const validatePassword = (password) => {
        return password.length >= 6;
    };
const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
};

    const validatephoneNumber = (phoneNumber) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    const validateUsername = (username) => {
        const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
        return usernameRegex.test(username);
    };
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
    if (!validateEmail(userDetails.email)) {
        errors['email'] = 'Please enter a valid email address.';
    }
    if (!validateUsername(userDetails.username)) {
        errors['username'] = 'Username must be 3 to 16 characters long and can only contain letters, numbers, hyphens, and underscores.';
    }
    if (!validatePassword(userDetails.password)) {
        errors['password'] = 'Password must be at least 6 characters long.';
    }
    if (!validateConfirmPassword(userDetails.password,userDetails.confirmPassword)) {
        errors['confirmPassword'] = 'Password doesnt match';
    }
    
    if (!validatephoneNumber(userDetails.phoneNum)) {
        errors['phoneNum'] = 'Please enter a valid 10-digit phone number.';
    }

    return errors;
}
