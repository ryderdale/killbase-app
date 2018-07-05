//use pushState() to change the url and allow manipulations to still receive a backbuton 
let signIn = document.getElementById('sign-in');
let bodySection = document.getElementById('body-section');

let user_id; 

function popVolunteerOpportunities() {
    document.getElementById('add-volunteer-opportunity-button').hidden = false;
    document.getElementById('volunteer-opportunites-container').hidden = false;
    document.getElementById('volunteer-opportunities-cards-container').hidden = false;
    
    let cardsContainer = document.getElementById('volunteer-opportunities-cards-container');
    cardsContainer.innerHTML = '';
    let popVolunteerOpportunitiesHeader = new Headers();
        popVolunteerOpportunitiesHeader.append('content-type', 'application/json');
        let appInit = {
            method: 'GET',
            headers: popVolunteerOpportunitiesHeader,
        }
        let URL = "/volunteer-opportunities/"; 
        fetch(URL, appInit).then(function(response){
            return response.json();
        })
        .then(function (content){
            console.log(content)
            let cardsContainer = document.getElementById('volunteer-opportunities-cards-container');
            cardsContainer.innerHTML = '';
            content.forEach(volOpp => {
                let card = document.createElement('section');
                cardsContainer.appendChild(card); 
                card.classList.add('card-list-view');
                let cardColumn1 = document.createElement('section');
                card.appendChild(cardColumn1);
                cardColumn1.classList.add('card-column');
                let cardColumn2 = document.createElement('section');
                card.appendChild(cardColumn2);
                cardColumn2.classList.add('card-column');
                let cardColumn3 = document.createElement('section');
                card.appendChild(cardColumn3);
                cardColumn3.classList.add('card-column');
                let cardColumn4 = document.createElement('section');
                card.appendChild(cardColumn4);
                cardColumn4.classList.add('card-column');
                // let cardInfo = document.createElement('div');
                if (volOpp.volunteer_opportunity_name) {
                    cardColumn1.innerHTML += '<h4>'+volOpp.volunteer_opportunity_name+'</h4>';
                }
                if (volOpp.volunteer_opportunity_location_name) {
                    cardColumn3.innerHTML += '<p> Location: ' + volOpp.volunteer_opportunity_location_name + '</p>';
                }
                if(volOpp.street) {
                    cardColumn3.innerHTML += '<p>' + volOpp.street + '</p>'
                }
                if(volOpp.city && volOpp.state) {
                    cardColumn3.innerHTML += '<p>' + volOpp.city +', ' +volOpp.state+'</p>'
                }
                if(volOpp.zipcode) {
                    cardColumn3.innerHTML += '<p>' + volOpp.zipcode + '</p>'
                }
                if (volOpp.max_volunteers_needed) {
                    cardColumn2.innerHTML += '<p>Minimum Volunteers: ' + volOpp.min_volunteers_needed + '</p>';
                }
                if (volOpp.max_volunteers_needed) {
                    cardColumn2.innerHTML += '<p> Maximum Volunteers: ' + volOpp.max_volunteers_needed + '<p>';
                }
                if(volOpp.volunteers_count) {
                    cardColumn1.innerHTML += '<p>Volunteers Signed Up: ' + volOpp.volunteers_count + '<p>';
                }
                if(volOpp.volunteer_opportunity_requirements) {
                    cardColumn2.innerHTML += '<p>Requiremnts: ' + volOpp.volunteer_opportunity_requirements + '<p>';
                }
                if(volOpp.volunteer_opportunity_description) {
                    cardColumn1.innerHTML += '<p>Description: ' + volOpp.volunteer_opportunity_description + '<p>';
                }
                cardColumn4.innerHTML += '<button class="volunteer-button" volunteerOpportunityId="'+volOpp.volunteer_opportunity_id+'">Volunteer</button>';
                cardColumn4.innerHTML += '<button class="edit-button" volunteerOpportunityId="'+volOpp.volunteer_opportunity_id+'">Edit</button>';
                cardColumn4.innerHTML += '<button class="delete-button" volunteerOpportunityId="'+volOpp.volunteer_opportunity_id+'">Delete</button>';
        });
        })
        .catch(function (error) {
            console.error("Fetch error:", error);
        });
        
}
    //upper right navigation links
    let createAccount = document.getElementById('create-account');
    createAccount.addEventListener('click', (event) => { 
        event.preventDefault();
        createAccountButton();
    });

    let signin = document.getElementById('sign-in')
    signin.addEventListener('click', (event) => { 
        event.preventDefault();
        signInButton();
    });

    let logout = document.getElementById('logout-button');
    logout.addEventListener('click', (event) => {
        document.getElementById('login-buttons-container').hidden = false;
        document.getElementById('logout-buttons-container').hidden= true;
        let user_id = undefined;
    })
    


    //create account forms sumbit
    let createAccountSubmit = document.getElementById('submit-create-account');
    createAccountSubmit.addEventListener('click', (event) => {
        event.preventDefault();
        createUserInstance()
    });

    let submitVolunteerProfile = document.getElementById('submit-volunteer-profile');
    submitVolunteerProfile.addEventListener('click', (event) => {
        event.preventDefault();
        createVolunteerInstance(); 
    })


    //main navigation links 
    let volunteerOpportunities = document.getElementById('volunteer-opportunites-button');
    volunteerOpportunities.addEventListener('click', (event) => {
        event.preventDefault();
        volunteerOpportunitiesLink()
    });

    let eventOrganizers = document.getElementById('event-oragnizers-button');
    eventOrganizers.addEventListener('click', (event) => {
        event.preventDefault();
        eventOrganizersLink();
    });
    
    let eventSponsors = document.getElementById('event-sponsors-button');
    eventSponsors.addEventListener('click', (event) => {
        event.preventDefault();
        eventSponsorsLink();
    });


    let volunteers = document.getElementById('volunteers-button');
    volunteers.addEventListener('click', (event) => { 
        event.preventDefault();
        volunteersLink();
    });
    
    //signin form submit 
    let signinSubmit = document.getElementById('sign-in-submit');
    signinSubmit.addEventListener('click', (event) => { 
        event.preventDefault();
        signinSubmitFetch();
    }); 


    let addVolunteerOpportunity = document.getElementById('add-volunteer-opportunity-button');
    addVolunteerOpportunity.addEventListener('click', (event) => { 
        event.preventDefault();
        document.getElementById('add-volunteer-opportunity-form').hidden = false;
        document.getElementById('add-volunteer-opportunity-button').hidden = true;
        document.getElementById('volunteer-opportunities-cards-container').hidden = true;
        document.getElementById("edit-volunteer-opportunity").hidden = true;
        document.getElementById("submit-volunteer-opportunity").hidden = false;
    });

    let submitVolunteerOpportunity = document.getElementById('submit-volunteer-opportunity');
    submitVolunteerOpportunity.addEventListener('click', (event) => { 
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
        body.volunteers_count = 0;
        body.volunteer_opportunity_requirements = document.add_volunteer_opportunity.requirements.value;
        body.volunteer_opportunity_description = document.add_volunteer_opportunity.description.value;

        let newVolunteeringOpHeaders = new Headers();
        newVolunteeringOpHeaders.append('content-type', 'application/json');
        let appInit = {
            method: 'POST',
            headers: newVolunteeringOpHeaders,
            body: JSON.stringify(body)
        }
        let loginURL = "/volunteer-opportunities"; 
        fetch(loginURL, appInit).then(function(response){
            console.log(response);
            return response.json(); 
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
    });
    let volunteerOpportunitiesContainer = document.getElementById('volunteer-opportunites-container')
    volunteerOpportunitiesContainer.addEventListener('click', (event) => { 
        if(event.target.classList.contains('delete-button')){
            let volunteer_opportunity_id = event.target.attributes.volunteerOpportunityId.value;
            let deleteVolunteeringOpHeaders = new Headers();
            deleteVolunteeringOpHeaders.append('content-type', 'application/json');
            let body = {};
            body.volunteer_opportunity_id = volunteer_opportunity_id;
            let appInit = {
                method: 'DELETE',
                headers: deleteVolunteeringOpHeaders,
                body: JSON.stringify(body)
            }
            let loginURL = "/volunteer-opportunities/" + volunteer_opportunity_id; 
            fetch(loginURL, appInit).then(function(response){
                return response  
            })
            .then(function () {
                popVolunteerOpportunities();
            })  
            .catch(function (error) {
                console.error("Fetch error:", error);
            });
        }
        if(event.target.classList.contains('edit-button')){
            document.getElementById('add-volunteer-opportunity-form').hidden = false;
            document.getElementById('add-volunteer-opportunity-button').hidden = true;
            document.getElementById('volunteer-opportunities-cards-container').hidden = true;
            let volunteer_opportunity_id = event.target.attributes.volunteerOpportunityId.value;
            document.getElementById('edit-volunteer-opportunity').setAttribute('volunteerOpportunityId',volunteer_opportunity_id);
            let editVolunteeringOpHeaders = new Headers();
            editVolunteeringOpHeaders.append('content-type', 'application/json');
            // let body = {};
            let appInit = {
                method: 'GET',
                headers: editVolunteeringOpHeaders,
                // body: JSON.stringify(body)
            }
            let loginURL = "/volunteer-opportunities/" + volunteer_opportunity_id; 
            fetch(loginURL, appInit).then(function(response){
                return response.json();   
            })
            .then(function (event) {
                document.getElementsByName('volunteer_opportunity_name')[0].value = event[0].volunteer_opportunity_name;
                document.getElementsByName('locationName')[0].value = event[0].volunteer_opportunity_location_name;
                document.getElementsByName('street')[0].value = event[0].street;
                document.getElementsByName('city')[0].value = event[0].city;
                document.getElementsByName('state')[0].value = event[0].state;
                document.getElementsByName('zipcode')[0].value = event[0].zipcode;
                document.getElementsByName('start_date_time')[0].value = event[0].data_time_timezone_start;
                document.getElementsByName('end_date_time')[0].value = event[0].date_time_timezone_end;
                document.getElementsByName('minVolunteers')[0].value = event[0].max_volunteers_needed;
                document.getElementsByName('maxVolunteers')[0].value = event[0].min_volunteers_needed;
                document.getElementsByName('requirements')[0].value = event[0].volunteer_opportunity_requirements;
                document.getElementsByName('description')[0].value = event[0].volunteer_opportunity_description;
                document.getElementById("edit-volunteer-opportunity").hidden = false;
                document.getElementById("submit-volunteer-opportunity").hidden = true;
            })  
            .catch(function (error) {
                console.error("Fetch error:", error);
            })
        }
        if(event.target.classList.contains('volunteer-button')) {
            let volunteer_opportunity_id = event.target.attributes.volunteerOpportunityId.value;
            let addVolunteeringOpHeaders = new Headers();
            addVolunteeringOpHeaders.append('content-type', 'application/json');
            let body = {};
            body.volunteer_opportunity_id = volunteer_opportunity_id;
            let appInit = {
                method: 'PUT',
                headers: addVolunteeringOpHeaders,
                body: JSON.stringify(body)
            }
            let loginURL = "volunteer-opportunities/volunteer-opportunity-volunteer/"+volunteer_opportunity_id; 
            fetch(loginURL, appInit).then(function(response){
                console.log('fetch initiated');
                return response.json();   
            })
            .then(function (event) {
                console.log(event);
            })  
            .catch(function (error) {
                console.error("Fetch error:", error);
            });
        }    
    });
    
    let editSubmit = document.getElementById('edit-volunteer-opportunity');
    editSubmit.addEventListener('click', (event) => { 
        let volunteer_opportunity_id = event.target.attributes.volunteerOpportunityId.value;
        let editVolunteeringOpHeaders = new Headers();
        editVolunteeringOpHeaders.append('content-type', 'application/json');
        let body = {};
        body.volunteer_opportunity_id = volunteer_opportunity_id;
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
        let appInit = {
            method: 'PUT',
            headers: editVolunteeringOpHeaders,
            body: JSON.stringify(body)
        }
        let loginURL = "/volunteer-opportunities/"+volunteer_opportunity_id; 
        fetch(loginURL, appInit).then(function(response){
            return response.json();   
        })
        .then(function (event) {
            console.log(event);
        })  
        .then(function () {
            volunteerOpportunities.click();
        })
        .catch(function (error) {
            console.error("Fetch error:", error);
        });
    });
    








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
        console.log(response);
        user_id = response[0].user_id; 
        document.getElementById('create-account-container').hidden = true;
        document.getElementById('account-creation-success').hidden= false;
        document.getElementById('login-buttons-container').hidden = true;
        document.getElementById('logout-buttons-container').hidden= false;
        document.getElementById('create-volunteer-profile').hidden=false;
    })
    .catch(function (error) {
        console.error("Fetch error:", error);
    });
}; 

function createVolunteerInstance() {
    let body = {};  
    body.first_name = document.createAccount.imageURL.value;
    body.last_name = document.createAccount.volunteerBio.value;
    body.email = document.createAccount.publicProfile.value;
    body.username = document.createAccount.displayName.value;
    body.password = document.createAccount.password.value;
    let createUserHeaders = new Headers();
    createUserHeaders.append('content-type', 'application/json');
    let appInit = {
        method: 'POST',
        headers: createUserHeaders,
        body: JSON.stringify(body)
    }
    let loginURL = "/users"; 
    fetch(loginURL, appInit).then(function(response){
        return response.json()
    })
    .then(function (response) {
        user_id = response[0].user_id; 
        document.getElementById('create-account-container').hidden = true;
        document.getElementById('account-creation-success').hidden= false;
        document.getElementById('login-buttons-container').hidden = true;
        document.getElementById('logout-buttons-container').hidden= false;
        document.getElementById('create-volunteer-profile').hidden=false;
    })
    .catch(function (error) {
        console.error("Fetch error:", error);
    });
}




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


