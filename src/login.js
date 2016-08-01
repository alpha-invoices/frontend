/**
 * Attempts to log the user in using the data gathered from an html form. First creates local variables corresponding to the
 * input fields of the form. Checks whether all the field are filled out and the function proceeds to interact with the REST api via an ajax query, 
 * using json as the data type. In the event of a successful login, the REST api returns a json object containing the id number 
 * of the logged in user. In case of a server-side error, invalid username or password, a json object containing the error message
 * is returned instead. Either way an appropriate message is assigned to the messaging variables and shown to the user.
 */
function login(){

    var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	
	//Checks all fields are filled.
	if(!email || !password){
		$("#error").text('Fill out all fields!');
		return;
	}
	
	
    $.ajax({
        url: "http://10.32.23.129:8080/login",
        type: "POST",
        data:  JSON.stringify({ "email": email, "password": password }),
        dataType: 'json',
		contentType: "application/json; charset=utf-8",
        success: function (result) {
            //$("#successfulLogin").text('You have logged in successfully! Your id is ' + result.id);
			alert('You have logged in successfully! Your id is ' + result.id);
			window.location = '/template.html';
			document.getElementById("logform").reset();
        },
        error: function (xhr, ajaxOptions, thrownError) {
        $("#error").text(JSON.parse(xhr.responseText).message);
        }
    });
	
};

