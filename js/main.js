var nameInput = document.getElementById("name");
var urlInput = document.getElementById("url");
var tableBody = document.getElementById("tableBody");
var bookList = [];

var localArray = JSON.parse(localStorage.getItem("bookmark"));

if (localStorage.getItem("bookmark") !== null) {
  bookList = JSON.parse(localStorage.getItem("bookmark"));
  displayBookmarks();
}
/******Add Bookmark******/
function addBookmark() {
  var bookmarks = {
    name: nameInput.value.trim(),
    url: urlInput.value.trim(),
  };
  /*Validate if any input is empty*/
  if (bookmarks.name == "" || bookmarks.url == ""){
    return Swal.fire({
      icon: "error",
      title: "Inputs Empty",
      text: "Please Fill Inputs!",
    });
  }
  /*Validate if inputs values are valid or not valid*/
  if (!regex["name"].test(bookmarks.name) || !regex["url"].test(bookmarks.url)){
    return Swal.fire({
      icon: "error",
      title: "Site name or Url is not valid",
      text: "Site Name must start with at least 3 characters, Site Url must start with http or https",
    });
  }
  /*Validate if bookmark already exists*/
  if (bookList.some((e) => e.name === bookmarks.name || e.url === bookmarks.url)){
    return Swal.fire({
      icon: "error",
      title: "Site name or Url is Already Exist",
      text: "Please Enter Another!",
    });
  }
  /*After Validation push, store, display, clear inputs */
  bookList.push(bookmarks);
  localStorage.setItem("bookmark", JSON.stringify(bookList));
  Swal.fire({
    title: "Bookmark is Added!",
    text: "Enjoy!",
    icon: "success",
  });
  displayBookmarks();
  clearInputs();
}
/******Clear Inputs******/
function clearInputs() {
  nameInput.value = null;
  urlInput.value = null;
  nameInput.classList.remove("is-valid");
  urlInput.classList.remove("is-valid");
}
/******display******/
function displayBookmarks() {
  box = "";
  for (var i = 0; i < bookList.length; i++) {
    box += `
        <tr>
                <td>${i + 1}</td>
                <td>${bookList[i].name}</td>
                <td><a target='_blank' href='${bookList[i].url}'><button id="visit" class="btn btn-visit"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
                <td><button onclick="confirmDeletion(${i})" id="delete" class="btn btn-danger delete"><i class="fa-solid fa-trash"></i> Delete</button></td>
        </tr>`;
  }
  tableBody.innerHTML = box;
}
/******delete******/
function confirmDeletion(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteBookmark(index);
      Swal.fire({
        title: "Deleted!",
        text: "Your Bookmark has been deleted.",
        icon: "success",
      });
    }
  });
}
function deleteBookmark(index) {
  bookList.splice(index, 1);
  localStorage.setItem("bookmark", JSON.stringify(bookList));
  displayBookmarks();
}
/*****Validation*****/
var regex = {
  name: /[a-zA-z]{3}/,
  url: /^(https?:\/\/)(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
};
function validate(e) {
  if (regex[e.id].test(e.value)) {
    e.classList.add("is-valid");
    e.classList.remove("is-invalid");
    e.classList.remove("focused");
  } else {
    e.classList.add("is-invalid");
    e.classList.remove("is-valid");
    e.classList.remove("focused");
  }
}
