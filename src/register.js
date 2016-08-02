/**
 * Attempts to register the user using the data gathered from an html form. First creates local variables corresponding to the
 * input fields of the form. Then clears the #error and #successfulRegistration variables which will later be used to alert the user
 * of the status of their registration query. The input data is then validated and in the event of invalid input an appropriate message 
 * is displayed to the user. If the input data is valid, the function proceeds to interact with the REST api via an ajax query, 
 * using json as the data type. In the event of a successful registration, the REST api returns a json object containing the id number 
 * of the newly registered user. In case of a server-side error, invalid input or taken username, a json object containing the error message
 * is returned instead. Either way an appropriate message is assigned to the messaging variables and shown to the user.
 */
function register(){

    var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	var confirmPassword = document.getElementById("confirmPassword").value;
	
	$("#error").text('');
	$("#successfulRegistration").text('');
	
	//Checks all fields are filled.
	if(!email || !password || !confirmPassword){
		$("#error").text('Fill out all fields!');
		return;
	}
	if (password === confirmPassword) {
		if(!validateEmail(email)){
			$("#error").text('Invalid email!');
			return;
		}
	
		if(!validatePassword(password)){
			$("#error").text('Invalid password! A valid password must be in the range of 8 to 20 characters, must start with lower case letter, must contain at least one of te following: upper case letter; lower case letter, digit and special symbol (@#$%^&+=).');
			return;
		}
	}
	else {
		$("#error").text('The two passwords must match!');
		return
	}
	
    $.ajax({
        url: "http://10.32.23.129:8080/register",
        type: "POST",
        data:  JSON.stringify({ "email": email, "password": password }),
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

/**
 * Validates a variable following the RFC standart. Returns true if the email is valid and false if not.
 */
function validateEmail(email) {
  var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

/**
 * Validates a password according to the rules set by the REST application. In order to be considered valid a password must:
 * - be in the range of 8 to 20 characters
 * - start with lower case letter
 * - contain at least one of the following: 
 * upper case letter; lower case letter, digit and special symbol (@#$%^&+=)
 */
function validatePassword(password){
	var regex = /^[a-z](?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{7,19}$/;
	return regex.test(password);
}