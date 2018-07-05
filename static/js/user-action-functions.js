//upper right links
function createAccountButton () {
    document.getElementById('sign-in-container').hidden = true;
    document.getElementById('create-account-container').hidden = false;
    document.getElementById('account-creation-success').hidden= true;
    document.getElementById('add-volunteer-opportunity-form').hidden = true;
    document.getElementById('add-volunteer-opportunity-button').hidden = true;
    document.getElementById('add-volunteer-opportunity-successful').hidden= true;
    document.getElementById('volunteer-opportunities-cards-container').hidden = true;
}

function signInButton () {
    document.getElementById('create-account-container').hidden = true;
    document.getElementById('account-creation-success').hidden= true;
    document.getElementById('sign-in-container').hidden = false;
    document.getElementById('add-volunteer-opportunity-form').hidden = true;
    document.getElementById('add-volunteer-opportunity-button').hidden = true;
    document.getElementById('add-volunteer-opportunity-successful').hidden= true;
    document.getElementById('volunteer-opportunities-cards-container').hidden = true;
}

//sign up process functions
function createUserInstance () {
    let body = {};  
    body.first_name = document.createAccount.firstName.value;
    body.last_name = document.createAccount.lastName.value;
    body.email = document.createAccount.email.value;
    body.username = document.createAccount.username.value;
    body.password = document.createAccount.password.value;
    console.log('Body data', body);
    let createUserHeaders = new Headers();
    createUserHeaders.append('content-type', 'application/json');
    let appInit = {
        method: 'POST',
        headers: createUserHeaders,
        body: JSON.stringify(body)
    }
    let loginURL = "/users"; 
    fetch(loginURL, appInit).then(function(response){
        console.log(response);
        return response.json()
    })
    .then(function (response) {
        user_id = response[0].user_id; 
        document.getElementById('create-account-container').hidden = true;
        document.getElementById('account-creation-success').hidden= false;
        document.getElementById('login-buttons-container').hidden = true;
        document.getElementById('logout-buttons-container').hidden= false;
    })
    .catch(function (error) {
        console.error("Fetch error:", error);
    });

    console.log(body);
}; 


//main navigation links 
function volunteerOpportunitiesLink () {
    document.getElementById('create-account-container').hidden = true;
    document.getElementById('account-creation-success').hidden = true;
    document.getElementById('sign-in-container').hidden = true;
    document.getElementById("event-organizers-container").hidden = true;
    document.getElementById("event-sponsors-container").hidden = true;
    document.getElementById("volunteers-container").hidden = true;
    document.getElementById('add-volunteer-opportunity-form').hidden = true;
    document.getElementById('add-volunteer-opportunity-successful').hidden = true;
    popVolunteerOpportunities(); 
}

function eventOrganziersLink() {
    document.getElementById('create-account-container').hidden = true;
    document.getElementById('account-creation-success').hidden= true;
    document.getElementById('sign-in-container').hidden = true;
    document.getElementById('volunteer-opportunites-container').hidden = true;
    document.getElementById("event-organizers-container").hidden = false;
    document.getElementById("event-sponsors-container").hidden = true;
    document.getElementById("volunteers-container").hidden = true;
    document.getElementById('add-volunteer-opportunity-button').hidden = true;
    document.getElementById('add-volunteer-opportunity-form').hidden = true;
    document.getElementById('add-volunteer-opportunity-successful').hidden= true;
    document.getElementById('volunteer-opportunities-cards-container').hidden = true;
}

function eventSponsorsLink() {
    document.getElementById('create-account-container').hidden = true;
        document.getElementById('account-creation-success').hidden= true;
        document.getElementById('sign-in-container').hidden = true;
        document.getElementById('volunteer-opportunites-container').hidden = true;
        document.getElementById("event-organizers-container").hidden = true;
        document.getElementById("event-sponsors-container").hidden = false;
        document.getElementById("volunteers-container").hidden = true;
        document.getElementById('add-volunteer-opportunity-button').hidden = true;
        document.getElementById('add-volunteer-opportunity-form').hidden = true;
        document.getElementById('add-volunteer-opportunity-successful').hidden= true;
        document.getElementById('volunteer-opportunities-cards-container').hidden = true;
}

function volunteersLink() {
    document.getElementById('create-account-container').hidden = true;
    document.getElementById('account-creation-success').hidden= true;
    document.getElementById('sign-in-container').hidden = true;
    document.getElementById('volunteer-opportunites-container').hidden = true;
    document.getElementById("event-organizers-container").hidden = true;
    document.getElementById("event-sponsors-container").hidden = true;
    document.getElementById("volunteers-container").hidden = false;
    document.getElementById('add-volunteer-opportunity-button').hidden = true;
    document.getElementById('add-volunteer-opportunity-form').hidden = true;
    document.getElementById('add-volunteer-opportunity-successful').hidden= true;
    document.getElementById('volunteer-opportunities-cards-container').hidden = true;
}

//sign in submit fetch 
function signinSubmitFetch() {
    let body = {};
    body.email = document.loginAccount.email.value;
    body.password = document.loginAccount.password.value;
    let loginHeaders = new Headers();
    loginHeaders.append('content-type', 'application/json');
    let appInit = {
        method: 'POST',
        headers: loginHeaders,
        body: JSON.stringify(body)
    }
    let loginURL = "/users/login"; 
    fetch(loginURL, appInit).then(function(response){
        return response.json();   
    })
    .then((user)=>{
        user_id = user[0].user_id; 
        document.getElementById('sign-in-container').hidden = true;
        document.getElementById('login-buttons-container').hidden = true;
        document.getElementById('logout-buttons-container').hidden= false;
        popVolunteerOpportunities(); 
        
    })
    .catch(function (error) {
        console.error("Fetch error:", error);
    });
}

