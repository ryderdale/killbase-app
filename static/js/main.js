//use pushState() to change the url and allow manipulations to still receive a backbuton 
let signIn = document.getElementById('sign-in');
let bodySection = document.getElementById('body-section');
let user_id; 

function popVolunteerOpportunities() {

}


bodySection.addEventListener('click', (event) => {
    event.preventDefault();
    let createAccountSubmit = document.getElementById('submit-create-account');
    if (event.target === createAccountSubmit) {
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
        let loginURL = "http://localhost:8000/users"; 
        fetch(loginURL, appInit).then(function(response){
            return response;   
        })
        .then(function (user_id) {
            // console.log('User response parsed:', JSON.parse(response));
            if (user_id) {
                user_id = user_id; 
                console.log(user_id);
                document.getElementById('create-account-container').hidden = true;
                document.getElementById('account-creation-success').hidden= false;
                document.getElementById('login-buttons-container').hidden = true;
                document.getElementById('logout-buttons-container').hidden= false;
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
        document.getElementById('add-volunteer-opportunity-form').hidden = true;
        document.getElementById('add-volunteer-opportunity-button').hidden = true;
        document.getElementById('add-volunteer-opportunity-successful').hidden= true;
    }
    let signin = document.getElementById('sign-in')
    if (event.target === signin) {
        document.getElementById('create-account-container').hidden = true;
        document.getElementById('account-creation-success').hidden= true;
        document.getElementById('sign-in-container').hidden = false;
        document.getElementById('add-volunteer-opportunity-form').hidden = true;
        document.getElementById('add-volunteer-opportunity-button').hidden = true;
        document.getElementById('add-volunteer-opportunity-successful').hidden= true;
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
        document.getElementById('add-volunteer-opportunity-button').hidden = false;
        document.getElementById('add-volunteer-opportunity-form').hidden = true;
        document.getElementById('add-volunteer-opportunity-successful').hidden= true;
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
        document.getElementById('add-volunteer-opportunity-button').hidden = true;
        document.getElementById('add-volunteer-opportunity-form').hidden = true;
        document.getElementById('add-volunteer-opportunity-successful').hidden= true;
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
        document.getElementById('add-volunteer-opportunity-button').hidden = true;
        document.getElementById('add-volunteer-opportunity-form').hidden = true;
        document.getElementById('add-volunteer-opportunity-successful').hidden= true;

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
        document.getElementById('add-volunteer-opportunity-button').hidden = true;
        document.getElementById('add-volunteer-opportunity-form').hidden = true;
        document.getElementById('add-volunteer-opportunity-successful').hidden= true;
    }
    let signinSubmit = document.getElementById('sign-in-submit');
    if (event.target === signinSubmit) {
        let body = {};
        let username = document.createAccount.username.value;
        let email = document.createAccount.email.value;
        body.username = username;
        body.password = document.createAccount.password.value;

        let loginHeaders = new Headers();
        loginHeaders.append('content-type', 'application/json');
        let appInit = {
            method: 'POST',
            headers: loginHeaders,
            body: JSON.stringify(body)
        }
        let loginURL = "http://localhost:8000/users/login"; 
        fetch(loginURL, appInit).then(function(response){
            user_id = response;
            return user_id;   
        })
        // .then(function (user_id) {
        //     // console.log('User response parsed:', JSON.parse(response));
        //     if (user_id) {
        //         user_id = user_id;
        //         console.log(user_id);
        //         document.getElementById('login-buttons-container').hidden = true;
        //         document.getElementById('logout-buttons-container').hidden= false;
        //     }
        //     else {
        //         alert("Error submitting request to login to account. Please check your internet connection and try again")
        //     }
        // })
        .catch(function (error) {
            console.error("Fetch error:", error);
        });
    }
    let logout = document.getElementById('logout-button');
    if (event.target === logout) {
        document.getElementById('login-buttons-container').hidden = false;
        document.getElementById('logout-buttons-container').hidden= true;
        let user_id = undefined; 
    }
    let addVolunteerOpportunity = document.getElementById('add-volunteer-opportunity-button');
    if (event.target === addVolunteerOpportunity) {
        document.getElementById('add-volunteer-opportunity-form').hidden = false;
        document.getElementById('add-volunteer-opportunity-button').hidden = true;
    }
    let submitVolunteerOpportunity = document.getElementById('submit-volunteer-opportunity');
    if(event.target === submitVolunteerOpportunity) {
        let body = {};
        body.volunteer_opportunity_name = document.add_volunteer_opportunity.volunteer_opportunity_name.value;
        body.volunteer_opportunity_location_name = document.add_volunteer_opportunity.locationName.value;
        body.street = document.add_volunteer_opportunity.street.value;
        body.city = document.add_volunteer_opportunity.city.value;
        body.state = document.add_volunteer_opportunity.state.value;
        body.zipcode = document.add_volunteer_opportunity.zipcode.value;
        body.data_time_timezone_start = document.add_volunteer_opportunity.start_date_time.value;
        body.date_time_timezone_end = document.add_volunteer_opportunity.end_date_time.value;
        body.min_volunteers_needed = document.add_volunteer_opportunity.minVolunteers.value;
        body.max_volunteers_needed = document.add_volunteer_opportunity.maxVolunteers.value;
        body.volunteer_opportunity_requirements = document.add_volunteer_opportunity.requirements.value;
        body.volunteer_opportunity_description = document.add_volunteer_opportunity.description.value;
        
        // body.volunteer_opportunity_name = volunteer_opportunity_name;
        // body.volunteer_opportunity_location_name = volunteer_opportunity_location_name;
        // body.street = street; 
        // body.city = city;
        // body.state = state;
        // body.zipcode = zipcode;
        // body.data_time_timezone_start = data_time_timezone_start;
        // body.date_time_timezone_end = date_time_timezone_end;
        // body.min_volunteers_needed = min_volunteers_needed;
        // body.max_volunteers_needed = max_volunteers_needed; 
        // body.volunteer_opportunity_description = volunteer_opportunity_description;
        // body.volunteer_opportunity_requirments = volunteer_opportunity_requirments;

        let newVolunteeringOpHeaders = new Headers();
        newVolunteeringOpHeaders.append('content-type', 'application/json');
        let appInit = {
            method: 'POST',
            headers: newVolunteeringOpHeaders,
            body: JSON.stringify(body)
        }
        let loginURL = "http://localhost:8000/submit-volunteer-opportunity"; 
        fetch(loginURL, appInit).then(function(response){
            return response   
        })
        .then(function (added_volunteer_opportunity) {
            // console.log('User response parsed:', JSON.parse(response));
            if (added_volunteer_opportunity) {
                console.log(user_id);
                document.getElementById('add-volunteer-opportunity-form').hidden = true;
                document.getElementById('add-volunteer-opportunity-successful').hidden= false;
            }
            else {
                alert("Error submitting request to login to account. Please check your internet connection and try again")
            }
        })
        .catch(function (error) {
            console.error("Fetch error:", error);
        });
    }
});