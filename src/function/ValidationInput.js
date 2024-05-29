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
    // ... implementasi yang sebelumnya
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

  // Tambahkan metode validasi tambahan di sini sesuai kebutuhan

  static validateInput(input, validationRules) {
    return validationRules.every((rule) => rule(input));
  }
}

// Contoh penggunaan:
const userInput = "example@domain.com";
const validationRules = [
  Validation.isNotEmpty,
  Validation.isSafeInput,
  Validation.isNotNumber,
  Validation.isNotEmail,
  Validation.isStrongPassword,
];

if (Validation.validateInput(userInput, validationRules)) {
  console.log("Input valid");
} else {
  console.log("Input tidak valid");
}

// Contoh penggunaan lain:
const userPhoneNumber = "1234567890";
if (Validation.isValidPhoneNumber(userPhoneNumber)) {
  console.log("Nomor telepon valid");
} else {
  console.log("Nomor telepon tidak valid");
}

const userInputNumeric = "42";
if (Validation.isNumericInRange(userInputNumeric, 10, 50)) {
  console.log("Angka berada dalam rentang yang diinginkan");
} else {
  console.log("Angka tidak berada dalam rentang yang diinginkan");
}
