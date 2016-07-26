function register(){

    var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	
	$("#error").text('');
	$("#successfulRegistration").text('');
	
	if(!validateEmail(email)){
		$("#error").text('Invalid email!');
		return;
	}
	
	if(!validatePassword(password)){
		$("#error").text('Invalid password! A valid password must be in the range of 8 to 20 characters, must start with lower case letter, must contain at least one of te following: upper case letter; lower case letter, digit and special symbol (@#$%^&+=).');
		return;
	}
	
    $.ajax({
        url: "http://localhost:8080/register",
        type: "POST",
        data:  JSON.stringify({ email: email, password: password }),
        dataType: 'json',
		contentType: "application/json; charset=utf-8",
        success: function (result) {
            $("#successfulRegistration").text('You have registered successfully! Your id is ' + result.id);
			document.getElementById("regform").reset();
        },
        error: function (xhr, ajaxOptions, thrownError) {
        $("#error").text(JSON.parse(xhr.responseText).message);
        }
    });
	
};

function validateEmail(email) {
  var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}
function validatePassword(password){
	var regex = /^[a-z](?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{7,19}$/;
	return regex.test(password);
}