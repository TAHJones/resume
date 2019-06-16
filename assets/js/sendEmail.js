


// on submit event send input values to emailjs template
window.onload = function() {
    contactForm.addEventListener('submit', function(event) {

        // target form element and input values
        var contactForm = document.getElementById('contactForm');
        var formName = contactForm.elements.namedItem('name').value;
        var formEmail = contactForm.elements.namedItem('email').value;
        var formMsg = contactForm.elements.namedItem('msg').value;
        
        // insert input value variables into templateParams variable in json format
        var templateParams = {
            "from_name": formName,
            "from_email": formEmail,
            "message_from_online_resume": formMsg
        };
        // console.log(0, templateParams);

        event.preventDefault();
        // console.log(1, formMsg);

        emailjs.send(
            "gmail", "resume_contact", templateParams
        ).then(
            function(response) {
            // console.log(2, templateParams);
            console.log('SUCCESS!', response.status, response.text);
            // if message is successfully submitted reset form input fields
            if(response.status === 200) {
                // console.log(3, templateParams);
                // contactForm.reset();
          }
        }, function(error) {
           console.log('FAILED...', error);
        });
        // if message is successfully submitted reset form input fields
        contactForm.reset();
    });
};