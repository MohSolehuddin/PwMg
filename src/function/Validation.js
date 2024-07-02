class ValidationInput {
  static isNotEmpty(input) {
    return input.trim() !== "";
  }

  static isSafeInput(charInput) {
    const dangerousChars = ["<", ">", "&", "'", '"'];
    return !dangerousChars.some((char) => charInput.includes(char));
  }

  static isNotNumber(input) {
    return isNaN(input);
  }

  static isNotEmail(input) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return !emailRegex.test(input);
  }

  static isStrongPassword(password) {
    if (password.length < 8) {
      return false;
    }
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    return hasUpperCase && hasLowerCase && hasDigit && hasSymbol;
  }

  static isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  }

  static isNumericInRange(input, min, max) {
    if (isNaN(input)) {
      return false;
    }
    const numericInput = parseFloat(input);
    return numericInput >= min && numericInput <= max;
  }

  static isValidInputRange(input, min, max) {
    if (isNaN(input)) {
      return false;
    }
    return input >= min && input <= max;
  }
}

module.exports = ValidationInput;
