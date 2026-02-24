export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
    // Basic phone validation (digits and optional +)
    const re = /^\+?[\d\s-]{8,}$/;
    return re.test(String(phone));
};

export const validatePassword = (password) => {
    return password.length >= 8;
};

export const validateRequired = (value) => {
    return value && value.trim().length > 0;
};

export const getAuthIdentifierType = (identifier) => {
    if (validateEmail(identifier)) return 'email';
    if (validatePhone(identifier)) return 'phone';
    return 'unknown';
};
