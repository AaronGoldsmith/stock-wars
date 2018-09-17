$(document).ready(function() {
  // Getting references to our form and input
  var firstName = $("#first-input-su");
  var lastName = $("#last-input-su");
  var moneyChoice = $("#money-choice");
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input-su");
  var passwordInput = $("input#password-input-su");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      first: firstName.val().trim(),
      last: lastName.val().trim(),
      money: moneyChoice.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    console.log(userData)

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.first, userData.last, userData.email, userData.password, userData.money);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(first, last, email, password, money) {
    console.log(first,last)
    $.post("/api/signup", {
      first: first,
      last: last,  
      email: email,
      password: password,
      money: money
    }).then(function(data) {
      console.log(data)
      // window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
