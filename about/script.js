// HOME

document
  .getElementById("createForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var passwordName = document.getElementById("passwordName").value;
    var passwordValue = document.getElementById("passwordValue").value;
    // Lakukan operasi create password di sini (misalnya menyimpan data ke database atau variabel)
    console.log(
      "Create Password - Name: " + passwordName + ", Value: " + passwordValue
    );
  });

document
  .getElementById("deleteForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var deletePasswordName =
      document.getElementById("deletePasswordName").value;
    // Lakukan operasi delete password di sini (misalnya menghapus data dari database atau variabel)
    console.log("Delete Password - Name: " + deletePasswordName);
  });

document
  .getElementById("updateForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var updatePasswordName =
      document.getElementById("updatePasswordName").value;
    var newPasswordValue = document.getElementById("newPasswordValue").value;
    // Lakukan operasi update password di sini (misalnya mengubah data di database atau variabel)
    console.log(
      "Update Password - Name: " +
        updatePasswordName +
        ", New Value: " +
        newPasswordValue
    );
  });

document
  .getElementById("readForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var readPasswordName = document.getElementById("readPasswordName").value;
    // Lakukan operasi read password di sini (misalnya membaca data dari database atau variabel)
    console.log("Read Password - Name: " + readPasswordName);
  });

document
  .getElementById("categoryForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var category = document.getElementById("category").value;
    // Lakukan operasi pemilihan kategori password di sini (misalnya menampilkan data dari kategori tertentu)
    console.log("Selected Category: " + category);
  });

function mousedown(tag, option, value) {
  $(`${tag}`).mousedown(function () {
    $(`${tag}`).css(`${option}`, `${value}`);
  });
}
function mouseup(tag, option, value) {
  $(`${tag}`).mouseup(function () {
    $(`${tag}`).css(`${option}`, `${value}`);
  });
}

function jquery() {
  $(document).ready(function () {
    $("h3").css("color", "aqua");
    $("section").css("color", "white");
    $("body").css("backgroundColor", "black");
    mousedown("p", "color", "yellow");
    mouseup("p", "color", "aqua");
    mousedown("h3", "color", "white");
    $(".container").css("backgroundColor", "white");
  });
}
