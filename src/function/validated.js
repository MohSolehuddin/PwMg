class ValidationInput {
  static isNotEmpty(input) {
    return input.trim() !== '';
  }
  static isSafeInput(charInput) {
    const dangerousChars = ["<", ">", "&", "'", "\""];
    return !dangerousChars.some(char => charInput.includes(char));
  }
  static isNotNumber(input) {
    return isNaN(input);
  }
  static isNotEmail(input) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return !emailRegex.test(input);
  }
  static isStrongPassword(password) {
    // Memeriksa minimal 8 karakter
    if (password.length < 8) {
      return false;
    }
    // Memeriksa apakah ada huruf besar, huruf kecil, angka, dan simbol
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    return hasUpperCase && hasLowerCase && hasDigit && hasSymbol;
  }
  static isValidPhoneNumber(phoneNumber) {
    // Menggunakan regex untuk memeriksa apakah nomor telepon sesuai dengan format tertentu
    const phoneRegex = /^[0-9]{10}$/; // Format yang diharapkan adalah 10 digit angka
    return phoneRegex.test(phoneNumber);
  }

  static isNumericInRange(input, min, max) {
    // Memeriksa apakah input adalah angka
    if (isNaN(input)) {
      return false;
    }
    // Memeriksa apakah angka berada dalam rentang yang diinginkan
    const numericInput = parseFloat(input);
    return numericInput >= min && numericInput <= max;
  }

  static isValidInputRange(input, min, max) {
    // Memeriksa apakah input (string atau angka) berada dalam rentang yang diinginkan
    if (isNaN(input)) {
      return false;
    }
    return input >= min && input <= max;
  }
}