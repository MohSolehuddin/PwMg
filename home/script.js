const getData = async (data) => {
  const response = await fetch(data, {
      method: 'GET'
    })
  const result = await response.json();
  return result;
};
//tampilan default
const home = async ()=> {
  let dataPw;
  getData('http://localhost:3000/category')
    .then((data)=>{
      let optValue = `<option value="none">Pilih kategori</option>`;
      data.titles.forEach((data) => {
        optValue += `
          <option value="${data}">${data}</option>
        `
      })
      document.getElementById('output').innerHTML = `
        <div id="categoryForm">
            <div class="input-group">
              <select id="category" required onchange="printDataCategory()">
                ${optValue}
              </select>
            </div>
          </div>
          <br/>
          <br/>
          <div id="printData">
            
          <div/>
        `;
    })
    .catch((err)=>{
      alert(err);
    })
}
// hapus data berdasarkan id
async function deleteData(id) {
  const confirmation = confirm('Apakah Anda yakin ingin menghapus data ini?');
  const reqData = {id: id};
  if (confirmation) {
    const url = `http://localhost:3000/deletePassword`;
    
    await fetch(url, {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqData)
    }).then((response) => {
        if (response.ok) {
          home();
        } else {
          alert('Failed to delete data');
        }
      })
      .catch((error) => {
        alert('Error deleting data:', error);
      });
  } else {
    alert('Penghapusan data dibatalkan');
  }
}
// form menambahkan data password
const addForm = () => {
  document.getElementById('output'). innerHTML = `
      <form id="addPass" action="/addPassword" method="post">
        <h4>Tambahkan Password</h4>
        
        <br/>
        
        <div class="input-group">
          <label for="category">kategori</label>
          <input type="text" id="category" name="category" required>
        </div>
        
        <br/>
        
        <div class="input-group">
          <label for="name">Nama</label>
          <input type="text" id="name" name="name" required>
        </div>
      
        <br/>
        
        <div class="input-group">
          <label for="username">Nama Pengguna</label>
          <input type="text" id="username" name="username" required>
        </div>
      
        <br/>
        
        <div class="input-group">
          <label for="password">password</label>
          <input type="password" id="password" name="password" required>
          <button type="button" onclick="showPassword('password')">show</button>
        </div>
        
        <br/>
        <div class="input-group">
          <label for="gmail">gmail</label>
          <input type="text" id="gmail" name="gmail" required>
        </div>
        
        <br/>
        <div class="input-group">
          <label for="no">nomer hp</label>
          <input type="text" id="no" name="no" required>
        </div>
        
        
        <button type="submit">Tambahkan</button>
    </form>
  `
}
//form update data
const updateForm = async (id) => {
  // mendapatkan category
  let category = document.getElementById('category').value ;
  const reqData = { title: category };
  // Menggunakan fetch untuk mengambil data terdekripsi
  await fetch('http://localhost:3000/getPasswords', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqData)
  }).then(res => res.json())
  .then(data => {
      // mencari data dengan id tertentu 
      let value = data.passwords.find(item => item.id == id);
      // mengganti tampilan ke update form dan mengisi nilai sebelumnya agar pengguna tidak mengisi data yang sama  2 kali 
      document.getElementById('output').innerHTML = `
          <button type="submit" class="mt-3 w-30" onclick="home()">...kembali</button>
          
          
          <form id="updateForm" action="/update" method="POST">
            <h4>Rubah Password</h4>
            
            <div class="input-group">
              <label for="id">id</label hidden>
              <input type="text" id="id" value="${value.id}" name="id" readonly hidden>
            </div>
            
            <div class="input-group">
              <label for="category">kategori</label>
              <input type="text" id="category" value="${category}" name="category" required>
            </div>
            
            <br/>
            
            <div class="input-group">
              <label for="name">Nama</label>
              <input type="text" id="name" value="${value.name}" name="name" required>
            </div>
          
            <br/>
            
            <div class="input-group">
              <label for="username">nama pengguna</label>
              <input type="text" id="username" value="${value.username}" name="username" required>
            </div>
          
            <br/>
            
            <div class="input-group">
              <label for="password">password</label>
              <input type="password" id="password" value="${value.pw}" name="password" required>
              <button type="button" onclick="showPassword('password')">show</button>
            </div>
            
            <br/>
            <div class="input-group">
              <label for="gmail">gmail</label>
              <input type="text" id="email" value="${value.email}" name="email">
            </div>
            
            <br/>
            <div class="input-group">
              <label for="no">nomer hp</label>
              <input type="text" id="no" value="${value.no}" name="no">
            </div>
            
            
            <button type="submit" class="mt-3 w-100">Rubah</button>
          </form>
        `;
    })
    .catch(err => {
      alert(err + " kembali ke tampilan awal");
      home();
    })
}
// function data yang akan di print ke html
function isDataPwPrintToHtml(category, data) {
  //membuat variabel penampung data dan tag html yang akan di tampilkan
  let dataPrintHtml = `<h3>data password ${category}</h3>`;
  // membuat variabel i sebagai penanda id pada tag html
  let i=0;
  
  if ("passwords" in data) {
    data["passwords"].forEach(function(element) {
      dataPrintHtml += `
        <div id="container-passwords" class="container-passwords">
        
          <div class="container-password">
          
            <div class="elementPw">
              <p>
                nama:
              </p>
              <p id="${element.name}">
                ${element.name}
              </p>
              <button class="copy" onclick="copyText('${element.name}')"></button>
            </div>
            
            <div class="elementPw">
              <p>
                Username:
              </p>
              <p id="${element.username}">
                ${element.username}
              </p>
              <button class="copy" onclick="copyText('${element.username}')"></button>
            </div>
            
            <div class="elementPw">
              <p>
                Password:
              </p>
              <p id="${element.pw}">
                ${element.pw}
              </p>
              <button class="copy" onclick="copyText('${element.pw}')"></button>
            </div>
            
            <div class="elementPw">
              <p>
                Gmail:
              </p>
              <p id="${element.email}">
                ${element.email}
              </p>
              <button class="copy" onclick="copyText('${element.email}')"></button>
            </div>
            
            <div class="elementPw">
              <p>
                no hp:
              </p>
              <p id="${element.no}">
                ${element.no}
              </p>
              <button class="copy" onclick="copyText('${element.no}')"></button>
            </div>
            
            
          </div>
          
          <button type="submit" onclick="updateForm('${element.id}')">
            edit
          </button>
          
          <button type="submit" onclick="deleteData('${element.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="aqua" class="bi bi-trash3-fill" viewBox="0 0 16 16"><path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/></svg>
          </button>    
        </div>
      `;
      i++;
    });
    document.getElementById('printData').innerHTML = dataPrintHtml;
  } else {
    document.getElementById('printData').innerHTML = 'Kategori tidak ditemukan';
  }
}

// function untuk menampilkan data ke html 
const printDataCategory = async () => {
  const category = document.getElementById('category').value;
  const reqData = { title: category };
  // Menggunakan fetch untuk mengambil data terdekripsi
  await fetch('http://localhost:3000/getPasswords', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqData)
  }).then(res => res.json())
  .then(data => {
    isDataPwPrintToHtml(category,data);
  }).catch(error => {
    alert(error);
  });
};

// fungsi copy text
function copyText(id) {
  // Membuat elemen textarea baru
  var textarea = document.createElement('textarea');
  // Mengambil teks yang akan disalin
  var text = document.getElementById(`${id}`).innerText;
  // Mengatur nilai teks pada elemen textarea
  textarea.value = text;
  // Menambahkan elemen textarea ke dalam dokumen
  document.body.appendChild(textarea);
  // Memilih teks di dalam textarea
  textarea.select();
  // Menyalin teks ke clipboard
  document.execCommand('copy');
  // Menghapus elemen textarea
  document.body.removeChild(textarea);
  // Memberikan notifikasi
  alert(`Teks berhasil disalin (${text})`);
}

// // validasi input 
// class ValidationInput {
//   static isNotEmpty(input) {
//     return input.trim() !== '';
//   }

//   static isSafeInput(charInput) {
//     const dangerousChars = ["<", ">", "&", "'", "\""];
//     return !dangerousChars.some(char => charInput.includes(char));
//   }

//   static isNotNumber(input) {
//     return isNaN(input);
//   }

//   static isNotEmail(input) {
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     return !emailRegex.test(input);
//   }

//   static isStrongPassword(password) {
//     // ... implementasi yang sebelumnya
//   }

//   static isValidPhoneNumber(phoneNumber) {
//     const phoneRegex = /^[0-9]{10}$/;
//     return phoneRegex.test(phoneNumber);
//   }

//   static isNumericInRange(input, min, max) {
//     if (isNaN(input)) {
//       return false;
//     }
//     const numericInput = parseFloat(input);
//     return numericInput >= min && numericInput <= max;
//   }

//   static isValidInputRange(input, min, max) {
//     if (isNaN(input)) {
//       return false;
//     }
//     return input >= min && input <= max;
//   }
// }

function showPassword(id) {
    let password = document.getElementById(`${id}`);
    password.type = password.type === "password" ? "text" : "password";
    console.log(password.type);
}