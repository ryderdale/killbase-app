
let signIn = document.getElementById('sign-in');
let bodySection = document.getElementById('body-section');


bodySection.addEventListener('click', (event) => {
    event.preventDefault();
    let createAccountSubmit = document.getElementById('submit-create-account');
    if (event.target === createAccountSubmit) {
        let body = {}  
        body.first_name = document.createAccount.first_name.value;
        body.last_name = document.createAccount.last_name.value;
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
    }
    let createAccount = document.getElementById('create-account');
    if (event.target === createAccount) {
        document.getElementById('sign-in-container').hidden = true;
        document.getElementById('create-account-container').hidden = false;
        document.getElementById('account-creation-success').hidden= true;
    }
    let signin = document.getElementById('sign-in')
    if (event.target === signin) {
        document.getElementById('create-account-container').hidden = true;
        document.getElementById('account-creation-success').hidden= true;
        document.getElementById('sign-in-container').hidden = false;
    }
    let volunteerOpportunities = document.getElementById('volunteer-opportunites-button');
    if(event.target === volunteerOpportunities){
        document.getElementById('create-account-container').hidden = true;
        document.getElementById('account-creation-success').hidden= true;
        document.getElementById('sign-in-container').hidden = true;
        document.getElementById('volunteer-opportunites-container').hidden = false;
        document.getElementById("event-organizers-container").hidden = true;
        document.getElementById("event-sponsors-container").hidden = true;
        document.getElementById("volunteers-container").hidden = true;
    }
    let eventOrganizers = document.getElementById('event-oragnizers-button');
    if(event.target === eventOrganizers) {
        document.getElementById('create-account-container').hidden = true;
        document.getElementById('account-creation-success').hidden= true;
        document.getElementById('sign-in-container').hidden = true;
        document.getElementById('volunteer-opportunites-container').hidden = true;
        document.getElementById("event-organizers-container").hidden = false;
        document.getElementById("event-sponsors-container").hidden = true;
        document.getElementById("volunteers-container").hidden = true;
    }
    let eventSponsors = document.getElementById('event-sponsors-button');
    if(event.target === eventSponsors) {
        document.getElementById('create-account-container').hidden = true;
        document.getElementById('account-creation-success').hidden= true;
        document.getElementById('sign-in-container').hidden = true;
        document.getElementById('volunteer-opportunites-container').hidden = true;
        document.getElementById("event-organizers-container").hidden = true;
        document.getElementById("event-sponsors-container").hidden = false;
        document.getElementById("volunteers-container").hidden = true;
    }
    let volunteers = document.getElementById('volunteers-button');
    if(event.target === volunteers) {
        document.getElementById('create-account-container').hidden = true;
        document.getElementById('account-creation-success').hidden= true;
        document.getElementById('sign-in-container').hidden = true;
        document.getElementById('volunteer-opportunites-container').hidden = true;
        document.getElementById("event-organizers-container").hidden = true;
        document.getElementById("event-sponsors-container").hidden = true;
        document.getElementById("volunteers-container").hidden = false;
    }
    

});