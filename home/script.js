const getData = async (data) => {
  const response = await fetch(data, {
    method: "GET",
  });
  const result = await response.json();
  return result;
};

//tampilan default
const home = async () => {
  getData("category")
    .then((dataInputs) => {
      let categoryIndex0 = dataInputs.titles[0];
      let optValue = `<option value="${categoryIndex0}" hidden>Pilih kategori</option>`;

      // sorting dataInputs titles lalu tampilkan
      dataInputs.titles.sort().map((dataInputs) => {
        optValue += `
          <option value="${dataInputs}">${dataInputs.toUpperCase()}</option>
        `;
      });

      document.getElementById("output").innerHTML = `
         <div id="categoryForm">
            <div class="input-group">
              <select id="category" required onchange="printDataCategory()">
                ${optValue}
              </select>
            </div>
          </div>
          <div id="printData"><div/>
        `;

      fetch("getPasswords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: categoryIndex0 }),
      })
        .then((res) => res.json())
        .then((result) => {
          isDataPwPrintToHtml(categoryIndex0, result);
        })
        .catch((err) => {
          alert(err);
        });
    })
    .catch((err) => {
      alert(err);
    });
};

function createNewInput() {
  let inputContainer = document.getElementById("input-container");
  let inputGroupContainer = document.getElementById("new-input-group");
  let newInputGroupContainer = document.createElement("div");
  newInputGroupContainer.classList.add("input-group");
  let inputFromNewInput = document.getElementById("new-input");

  let label = `<label>${inputFromNewInput.value}</label>`;
  let input = `<input placeholder="Masukkan ${inputFromNewInput.value}" name="${inputFromNewInput.value}" autofocus></input>`;
  let span = document.createElement("span");
  span.setAttribute("id", `validate${inputFromNewInput.value}`);
  newInputGroupContainer.innerHTML = label + input;
  inputGroupContainer.remove();
  inputContainer.appendChild(newInputGroupContainer);
  inputContainer.appendChild(span);
}

function newInput() {
  let inputContainer = document.getElementById("input-container");
  let inputGroupContainer = document.createElement("div");

  inputGroupContainer.classList.add("new-input-group");
  inputGroupContainer.setAttribute("id", "new-input-group");
  inputContainer.appendChild(inputGroupContainer);

  let label = `<label>judul</label>`;
  let input = `<input id="new-input" placeholder="Masukkan judul untuk input baru" autofocus></input>`;
  let button = "<button type='button' onclick='createNewInput()'>+</button>";
  inputGroupContainer.innerHTML = label + input + button;
}

async function deleteData(id) {
  const confirmation = confirm(
    "Apakah Anda yakin ingin menghapus dataInputs ini?"
  );
  const reqData = { id: id };
  if (confirmation) {
    const url = `deletePassword`;

    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    })
      .then((response) => {
        if (response.ok) {
          home();
        } else {
          alert("Failed to delete dataInputs");
        }
      })
      .catch((error) => {
        alert("Error deleting dataInputs:", error);
      });
  } else {
    alert("Penghapusan dataInputs dibatalkan");
  }
}

const sendDataForm = async (url, option) => {
  let addPass = document.getElementById("addPass");
  let inputs = addPass.querySelectorAll("input");
  let success = document.getElementById("successMessage");
  success.style.color = "aqua";
  let dataInputs = {};

  inputs.forEach((input) => {
    input.required
      ? (dataInputs[input.name] = { value: input.value, required: true })
      : (dataInputs[input.name] = { value: input.value, required: false });
  });
  let valid = true;
  for (const key in dataInputs) {
    let id = `validate${key}`;
    let errorMessage = document.getElementById(id);
    errorMessage.style.color = "red";

    if (dataInputs[key].value === "" && dataInputs[key].required) {
      errorMessage.innerText = "please this input required";
      valid = false;
    } else if (
      ValidationInput.isNotEmail(dataInputs[key].value) &&
      key === "Email" &&
      dataInputs[key].value.trim() !== ""
    ) {
      errorMessage.innerText =
        "Invalid email, please use example@example.example";
      valid = false;
    } else if (
      !ValidationInput.isStrongPassword(dataInputs[key].value) &&
      (key === "Pin" || key === "Password") &&
      dataInputs[key].value.trim() !== ""
    ) {
      errorMessage.innerText =
        "password is don`t strong, please required combine Lower case, upeer case, number, simbol, and min 8 char";
      valid = false;
    } else {
      errorMessage.innerText = "";
    }
  }

  if (valid) {
    let data = {};
    for (const key in dataInputs) {
      if (Object.hasOwnProperty.call(dataInputs, key)) {
        if (dataInputs[key].value.trim() !== "") {
          data[key] = dataInputs[key].value;
        }
      }
    }
    const response = await fetch(url, {
      method: option,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    success.innerText = result.message;
    if (result.success) {
      setTimeout(() => {
        home();
      }, 1000);
    }
  }
};

const addForm = () => {
  document.getElementById("output").innerHTML = `
      <form id="addPass" class="formInput">
        <h4>Tambahkan Password</h4>
        
        <section id="input-container">
          <div class="input-group">
            <label>Kategori</label>
            <input autocomplete="on" type="text" id="category" name="title" placeholder="Masukkan kategori, contoh instagram" required autofocus>
          </div>
          <span id="validatetitle"></span>
          
          <div class="input-group">
            <label>Username</label>
            <input autocomplete="off" type="text" id="username" name="Username" placeholder="masukkan username, contoh msytc213" required>
            </div>
            <span id="validateUsername"></span>

          
          <div class="input-group">
            <label>Password</label>
            <input autocomplete="off" type="password" id="password" name="Password" placeholder="********" required>
            <button id="showButton" class="showButton" type="button" onclick="showPassword('password')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
              </svg>
            </button>
            <button id="randomPass" type="button" onclick="randomPassword('password')">acak</button>
            </div>
            <span id="validatePassword"></span>

          
          <div class="input-group">
            <label>Pin</label>
            <input autocomplete="off" type="password" id="pin" name="Pin" placeholder="****** (opsional)">
            <button id="showPin" class="showButton" type="button" onclick="showPassword('pin','showPin')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
              </svg>
            </button>
            <button id="randomPass" type="button" onclick="randomPassword('pin')">acak</button>
            </div>
            <span id="validatePin"></span>

          
          <div class="input-group">
            <label>Email</label>
            <input autocomplete="off" class="email" type="text" id="email" name="Email" placeholder="example@gmail.com (opsional)">
            </div>
            <span id="validateEmail"></span>
        </section>

        <button id="addInput" type="button" onclick="newInput()">input baru</button>
        <button id="sendButton" type="button" onclick="sendDataForm('addPassword', 'POST')">Tambahkan</button>
        <p id="successMessage"></p>
    </form>
  `;
};

const updateForm = async (id) => {
  let category = document.getElementById("category").value;
  const reqData = { title: category };
  await fetch("getPasswords", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqData),
  })
    .then((res) => res.json())
    .then((data) => {
      // mencari data dengan id tertentu
      let value = data.passwords.find((item) => item.id == id);
      //var result untuk menampung hasil looping objek
      let result = `
          <button type="submit" class="back" onclick="home()">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#fff" class="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
              <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1"/>
            </svg>
          </button>
          
          <form id="addPass" class="formInput" action="/update" method="POST">
            <h4>Edit password</h4>
            <section id="input-container">
            <div class="input-group">
              <label>Kategori</label>
              <input autocomplete="off" type="text" id="category" value="${category}" placeholder="Masukkan kategori, contoh ${category}" name="title" required autofocus>
            </div>
            <span id="validatetitle"></span>
            `;
      for (let key in value) {
        if (value.hasOwnProperty(key) && key !== "email") {
          if (key.toUpperCase() !== "PASSWORD" && key.toUpperCase() !== "PIN") {
            result +=
              key == "id"
                ? `<div class="input-group none">
                    <label>${key}</label>
                    <input autocomplete="off" class="${key}" type="${key}" id="${key}" value="${value[key]}" name="${key}" readonly hidden>
                  </div>
                  <span id="validate${key}"></span>
                  `
                : `<div class="input-group">
                    <label>${key}</label>
                    <input autocomplete="off" class="${key}" type="${key}" id="${key}" value="${
                    value[key]
                  }" name="${key}" placeholder="Masukkan ${key.toLowerCase()}">
                  </div>
                  <span id="validate${key}"></span>
                  `;
          } else {
            let uniqueId = `${Math.floor(Math.random() * 1000000)}${key}${
              value[key]
            }`;
            result += `<div class="input-group ${key}">
                        <label>${key}</label>
                        <input autocomplete="off" type="password" id="inputId${uniqueId}${key}" value="${
              value[key]
            }" name="${key}" placeholder=" Masukkan ${key.toLowerCase()}">
                        <button id="showButton${uniqueId}${key}" class="showButton" type="button" onclick="showPassword('inputId${uniqueId}${key}', 'showButton${uniqueId}${key}')">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                          </svg>
                        </button>
                        <button id="randomPass" type="button" onclick="randomPassword('inputId${uniqueId}${key}')">acak</button>
                      </div>
                  <span id="validate${key}"></span>
                      `;
          }
        } else {
          result += `<div class="input-group">
                      <label>${key}</label>
                      <input autocomplete="off" class="${key}" type="${key}" id="${key}" value="${value[key]}" name="${key}" placeholder="${key}" required>
                    </div>
                  <span id="validate${key}"></span>
                    `;
        }
      }
      document.getElementById("output").innerHTML = `
            ${result}
            </section>
            <button id="addInput" type="button" onclick="newInput()">input baru</button>
            <button id="sendButton" type="button" onclick="sendDataForm('update', 'POST')">Rubah</button>
            <p id="successMessage"></p>
          </form>
        `;
    })
    .catch((err) => {
      alert(err + " kembali ke tampilan awal");
      home();
    });
};

const isDataPwPrintToHtml = (category, data) => {
  let dataPrintHtml = `<h3 class="data-title">List password ${category}</h3>`;
  let ifNotZeroPrintExecutionButton = 0;

  if ("passwords" in data) {
    data["passwords"].forEach((element) => {
      dataPrintHtml += `
        <div id="container-passwords" class="container-passwords">
          <div class="container-password">`;
      for (let key in element) {
        //jika elemnt mempunyai properti, bukan id dan bukan String kosong
        if (element.hasOwnProperty(key) && key !== "id") {
          ifNotZeroPrintExecutionButton++;
          if (key.toUpperCase() !== "PASSWORD" && key.toUpperCase() !== "PIN") {
            dataPrintHtml += `
              <div class="elementPw">
                <label>${key}</label>
                <input autocomplete="off" id="${element[key]}" type="${key}" value="${element[key]}" readonly>
                <button class="copy" onclick="copyText('${element[key]}', 'messageDataPassword${ifNotZeroPrintExecutionButton}')"></button>
                <span class="messageDataPassword" id="messageDataPassword${ifNotZeroPrintExecutionButton}"></span>
              </div>`;
          } else {
            let uniqueId = Math.floor(Math.random() * 1000000);
            dataPrintHtml += `
              <div class="elementPw">
                <label>${key}</label>
                <input autocomplete="off" class="${key}" id="inputId${uniqueId}" type="password" value="${element[key]}" readonly>
                <span class="messageDataPassword" id="messageDataPassword${ifNotZeroPrintExecutionButton}"></span>
                <button class="showButton" id="showButton${uniqueId}"
                type="button" onclick="showPassword('inputId${uniqueId}',
                'showButton${uniqueId}')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                  </svg>
                </button>
                <button class="copy password"
                onclick="copyText('inputId${uniqueId}', 'messageDataPassword${ifNotZeroPrintExecutionButton}')"></button>
              </div>`;
          }
        }
      }
      if (ifNotZeroPrintExecutionButton !== 0) {
        dataPrintHtml += `
          </div>
            <button type="submit" onclick="updateForm('${element.id}')">
              edit
            </button>
            
            <button type="submit" onclick="deleteData('${element.id}')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="aqua" class="bi bi-trash3-fill" viewBox="0 0 16 16"><path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/></svg>
            </button>
          </div>
          </div>`;
      }
      ifNotZeroPrintExecutionButton = 0;
    });
  } else {
    dataPrintHtml += `<p>Tidak ada data pada kategori ini.</p>`;
  }
  document.getElementById("printData").innerHTML = dataPrintHtml;
};

const printDataCategory = async () => {
  const category = document.getElementById("category").value;
  const reqData = { title: category };
  await fetch("getPasswords", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqData),
  })
    .then((res) => res.json())
    .then((data) => {
      isDataPwPrintToHtml(category, data);
    })
    .catch((error) => {
      alert(error);
    });
};

function copyText(id, elementMessageId) {
  let textarea = document.createElement("textarea");
  let text = document.getElementById(`${id}`).value;
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  let message = document.getElementById(elementMessageId);
  message.textContent = `Teks berhasil disalin (${text})`;
  setTimeout(() => {
    message.textContent = "";
  }, 3000);
}

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

function showPassword(id, buttonId) {
  if (buttonId === undefined) {
    buttonId = "showButton";
  }
  let password = document.getElementById(`${id}`);
  let showButton = document.getElementById(`${buttonId}`);
  password.type = password.type === "password" ? "text" : "password";
  showButton.innerHTML =
    password.type === "password"
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16"><path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/><path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/></svg>';
}
function randomPassword(id) {
  let randomInputElement = document.getElementById(id);
  let length = 20;
  if (randomInputElement.value.trim() !== "") {
    length = randomInputElement.value;
  }
  if (!parseInt(length)) {
    length = 20;
  }

  let charUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let charLower = "abcdefghijklmnopqrstuvwxyz";
  let char = charLower + charUpper;
  let symbol = "!@#$%^&*()-+<>!@#$%^&*()-+<>";
  let number = "01234567890123456789";
  let chars = char + symbol + number;

  let includeSymbol = /[!@#$%^&*()-+<>!@#$%^&*()-+<>]/;
  let includeNumber = /[0-9]/;
  let includeUpperChar = /[A-Z]/;
  let includeLowerChar = /[a-z]/;
  let pass = "";

  pass += chars.charAt(Math.floor(Math.random() * chars.length));
  pass += chars.charAt(Math.floor(Math.random() * chars.length));
  for (let x = 0; x < length - 2; x++) {
    if (!includeLowerChar.test(pass)) {
      pass += charLower.charAt(Math.floor(Math.random() * charLower.length));
    } else if (!includeUpperChar.test(pass)) {
      pass += charUpper.charAt(Math.floor(Math.random() * charUpper.length));
    } else if (!includeNumber.test(pass)) {
      pass += number.charAt(Math.floor(Math.random() * number.length));
    } else if (!includeSymbol.test(pass)) {
      pass += symbol.charAt(Math.floor(Math.random() * symbol.length));
    } else {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }
  randomInputElement.value = pass;
}
