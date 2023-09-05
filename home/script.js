const getData = async (data) => {
  const response = await fetch(data, {
      method: 'GET'
    })
  const result = await response.json();
  return result;
};

// hapus data berdasarkan id
async function deleteData(id) {
  const confirmation = confirm('Apakah Anda yakin ingin menghapus data ini?');
  
  if (confirmation) {
    const url = `http://localhost:3000/${id}`;

    await fetch(url, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          alert('Data deleted successfully');
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

//tampilan default
const home = async ()=> {
  let dataPw;
  await getData('http://localhost:3000/home/categoryData.json')
    .then((data)=>{
      let optValue;
      data.category.forEach((data) => {
        optValue += `
          <option value="${data}">${data}</option>
        `
      })
      
      document.getElementById('output').innerHTML = `
        <div id="categoryForm">
            <h4>Select Category</h4>
            <div class="input-group">
              <label for="category">Category</label>
              <select id="category" required>
                ${optValue}
              </select>
            </div>
            <button type="submit" class=" mt-2 w-100"
             onclick="printDataCategory()">Pilih</button>
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
        
        
        <button type="submit" class="mt-3 w-100">Tambahkan</button>
    </form>
  `
}
//form update data
const updateForm = async (id) => {
  await getData('http://localhost:3000/home/pw.json')
    .then(data => {
      // mendapatkan category
      let category = document.getElementById('category').value ;
      // mendapatkan arr data berdasarkan category
      let arrData = data[category];
      // mencari data dengan id tertentu 
      let value = arrData.find(item => item.id === id);
      // mengganti tampilan ke update form dan mengisi nilai sebelumnya agar pengguna tidak mengisi data yang sama  2 kali 
      document.getElementById('output').innerHTML = `
          <button type="submit" class="mt-3 w-30" onclick="home()">...kembali</button>
          
          
          <form id="updateForm" action="/update" method="put">
            <h4>Rubah Password</h4>
            
            <div class="input-group">
              <label for="category">kategori</label>
              <input type="text" id="category" value="${category}" required>
            </div>
            
            <br/>
            
            <div class="input-group">
              <label for="name">Nama</label>
              <input type="text" id="name" value="${value.name}" required>
            </div>
          
            <br/>
            
            <div class="input-group">
              <label for="username">nama pengguna</label>
              <input type="text" id="username" value="${value.username}" required>
            </div>
          
            <br/>
            
            <div class="input-group">
              <label for="password">password</label>
              <input type="password" id="password" value="${value.password}" required>
            </div>
            
            <br/>
            <div class="input-group">
              <label for="gmail">gmail</label>
              <input type="text" id="gmail" value="${value.gmail}">
            </div>
            
            <br/>
            <div class="input-group">
              <label for="no">nomer hp</label>
              <input type="text" id="no" value="${value.no}">
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
  
  if (category in data) {
    data["passwords"].forEach(function(element) {
      dataPrintHtml += `
        <div id="container-passwords" class="container-passwords">
        
          <div id="${element.id}" class="container-password">
          
            <div id="${element.name}" class="elementPw">
              <p id="${element.name}${i}">
                nama:
              </p>
              <p id="name${element.name}${i}">
                ${element.name}
                
              </p>
              <button class="copy" onclick="copyText('name${element.name}${i}')"></button>
            </div>
            
            <div id="${element.username}" class="elementPw">
              <p id="${element.username}${i}">
                Username:
              </p>
              <p id="un${element.username}${i}">
                ${element.username}
              </p>
              <button class="copy" onclick="copyText('un${element.username}${i}')"></button>
            </div>
            
            <div id="${element.password}" class="elementPw">
              <p id="${element.password}${i}">
                Password:
              </p>
              <p id="pw${element.password}${i}">
                ${element.password}
              </p>
              <button class="copy" onclick="copyText('pw${element.password}${i}')"></button>
            </div>
            
            <div id="${element.gmail}" class="elementPw">
              <p id="${element.gmail}${i}">
                Gmail:
              </p>
              <p id="gmail${i}${i}">
                ${element.gmail}
              </p>
              <button class="copy" onclick="copyText('gmail${i}${i}')"></button>
            </div>
            
            <div id="${element.no}" class="elementPw">
              <p id="${element.no}${i}">
                no hp:
              </p>
              <p id="no${element.no}${i}">
                ${element.no}
              </p>
              <button class="copy" onclick="copyText('no${element.no}${i}')"></button>
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
  console.log("Selected Category: " + category);
}
// function menampilkan data ke html
// const printDataCategory= async () => {
//   //mendapatkan ketegori
//   let category = document.getElementById('category').value;
//   let reqData = {title: category};
//   await fetch('http://localhost:3000/getPasswords', {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(reqData)
//   })
//     .then(data => {
//       console.log("data berhasil di decript");
//     })
//     .catch(err => {
//       console.log(err);
//     })
//   await fetch("http://localhost:3000/home/pw.json")
//   .then(response => response.json())
//   .then(data => {
//     isDataPwPrintToHtml(category, data)
//   })
//   .catch(error => {
//     console.log(error);
//   });
// };
// Menampilkan data ke HTML
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
  })
    .then(response => response.json())
    // .then(decryptedData => {
      // Mengambil data dari /home/pw.json
    //   fetch("http://localhost:3000/home/pw.json")
    //     .then(response => response.json())
    //     .then(data => {
    //       isDataPwPrintToHtml(category, data, decryptedData);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // })
    .catch(err => {
      console.log(err);
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