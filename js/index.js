var signUpName = document.querySelector(".signupName");
var signUpEmail = document.querySelector(".signupEmail");
var signUpPassword = document.querySelector(".signupPassword");
var SignUpBtn = document.querySelector(".SignUp");
var signUpContainer = [];
// =============================================
var signInEmail = document.querySelector(".signInEmail");
var signInPassword = document.querySelector(".signInPassword");
var loginBtn = document.querySelector(".login");
var logoutBtn = document.querySelector(".logoutBtn");
// ==========================================
if (localStorage.getItem("users") == null) {
  signUpContainer = [];
} else {
  signUpContainer = JSON.parse(localStorage.getItem("users"));
}

function empty() {
  if (
    signUpName.value == "" ||
    signUpEmail.value == "" ||
    signUpPassword == ""
  ) {
    return false;
  } else {
    return true;
  }
}

// ===================================================
function exist() {
  for (var i = 0; i < signUpContainer.length; i++) {
    if (signUpContainer[i].email == signUpEmail.value) {
      // console.log("There are error");
      return false;
    }
  }
}
// ====================================================
function signup() {
  userInfo = {
    userName: signUpName.value,
    email: signUpEmail.value,
    password: signUpPassword.value,
  };
  if (empty() == false) {
    document.querySelector(
      ".exist"
    ).innerHTML = `<span class='text-danger m-3'>All Inputs Are Required</span>`;
    return false;
  }

  if (signUpContainer.length == 0) {
    signUpContainer.push(userInfo);
    localStorage.setItem("users", JSON.stringify(signUpContainer));
    document.querySelector(".exist").innerHTML =
      '<span class="text-success m-3">Success</span>';
    return true;
  }
  if (exist() == false) {
    document.querySelector(
      ".exist"
    ).innerHTML = `<span class='text-danger m-3'>Email Already Exists</span>`;
  } else {
    signUpContainer.push(userInfo);

    document.querySelector(
      ".exist"
    ).innerHTML = `<span class='text-info m-3'>Success</span>`;

    localStorage.setItem("users", JSON.stringify(signUpContainer));
  }
}

document.querySelector(".signUp").addEventListener("click", function () {
  signup();
});

// =====================Login============
if (localStorage.getItem("sessionUsername") != null) {
  var username = localStorage.getItem("sessionUsername");
}
if (username) {
  document.querySelector(".username").innerHTML = "Welcome " + username;
}

function login() {
  if (isLoginEmpty() == false) {
    document.querySelector(".error").innerHTML =
      '<span class="text-danger m-3">All inputs is required</span>';
    return false;
  }
  var email = signInEmail.value;
  var password = signInPassword.value;
  for (var i = 0; i < signUpContainer.length; i++) {
    if (
      signUpContainer[i].email.toLowerCase() == email.toLowerCase() &&
      signUpContainer[i].password.toLowerCase() == password.toLowerCase()
    ) {
      document
        .querySelector("div.homeContainer")
        .classList.replace("d-none", "d-block");
      // document.querySelector(".username").innerHTML = "Welcome " + username;
      document.querySelector("div.loginContaier").classList.add("d-none");

      localStorage.setItem(
        "sessionUsername",
        JSON.stringify(signUpContainer[i].userName)
      );
    } else {
      document.querySelector(".error").innerHTML =
        '<span class="p-2 text-danger">incorrect email or password</span>';
    }
  }
}
function isLoginEmpty() {
  if (signInPassword.value == "" || signInEmail.value == "") {
    return false;
  } else {
    return true;
  }
}

loginBtn.addEventListener("click", function () {
  login();
});

document.querySelector(".goSignUp").addEventListener("click", function (e) {
  e.preventDefault();
  document
    .querySelector("div.signUpContainer")
    .classList.replace("d-none", "d-block");
  document.querySelector("div.loginContaier").classList.add("d-none");
  console.log("heodslfjk");
});

document.querySelector(".goLogin").addEventListener("click", function (e) {
  e.preventDefault();
  document
    .querySelector("div.signUpContainer")
    .classList.replace("d-block", "d-none");
  document
    .querySelector("div.loginContaier")
    .classList.replace("d-none", "d-block");
  // console.log("heodslfjk");
});
// ===========================================================

// =====================LogOUt ======================================
document.querySelector(".logoutBtn").addEventListener("click", function (e) {
  e.preventDefault();

  document
    .querySelector("div.homeContainer")
    .classList.replace("d-block", "d-none");
  document
    .querySelector("div.loginContaier")
    .classList.replace("d-none", "d-block");
  localStorage.removeItem("sessionUsername");
  // console.log("heodslfjk");
});
