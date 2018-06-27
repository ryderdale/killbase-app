let appHeader = new Headers();
appHeader.append('Content-Type', 'application/json');

let createAccount = document.getElementById('submit-create-account');
let signIn = document.getElementById('sign-in');



createAccount.addEventListener('click', (event) => {
    event.preventDefault();
    let body = {}  
    body.email = document.createAccount.email.value;
    body.handle_name = document.createAccount.username.value;
    body.password = document.createAccount.password.value;
    console.log('Body data', body);
    let createUserHeaders = new Headers();
    createUserHeaders.append('content-type', 'application/json');
    let appInit = {
        method: 'POST',
        headers: createUserHeaders,
        body: JSON.stringify(body)
    }
    let loginURL = "http://localhost:8000/users"; 
    fetch(loginURL, appInit).then(function(response){
        return response.json();    
    })
    .then(function (data) {
        // console.log('User response parsed:', JSON.parse(response));
        if (data) {
            document.getElementById('create-account-container').hidden = true;
            document.getElementById('account-creation-success').hidden= false;
        }
        else {
            alert("error submitting request to create account. Please check you internet connection and try again")
        }
    })
    .catch(function (error) {
        console.error("Fetch error:", error);
    });

    console.log(body);
});