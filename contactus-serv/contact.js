document.addEventListener("DOMContentLoaded", function() {
    const forgotForm = document.getElementById('ForgotRegistrationForm');

    // Helper function to display or hide error messages
    function displayError(errorId, message = '') {
        const errorElement = document.getElementById(errorId);
        if (message) {
            errorElement.style.display = 'inline';
            errorElement.textContent = message;
        } else {
            errorElement.style.display = 'none';
            errorElement.textContent = '';
        }
    }

    // Field validation functions
    function validateField(fieldId, errorId, errorMessage) {
        const fieldValue = document.getElementById(fieldId).value.trim();
        if (fieldValue === '') {
            displayError(errorId, errorMessage);
            return false;
        } else {
            displayError(errorId);
            return true;
        }
    }

    function validateEmail(fieldId, errorId) {
        const emailValue = document.getElementById(fieldId).value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue === '' || !emailPattern.test(emailValue)) {
            displayError(errorId, 'Please enter a valid email address.');
            return false;
        } else {
            displayError(errorId);
            return true;
        }
    }

    function validateContactNumber(fieldId, errorId) {
        const contactValue = document.getElementById(fieldId).value.trim();
        const contactPattern = /^[0-9]{10}$/; // Example pattern, adjust as needed
        if (contactValue === '' || !contactPattern.test(contactValue)) {
            displayError(errorId, 'Please enter a valid 10-digit contact number.');
            return false;
        } else {
            displayError(errorId);
            return true;
        }
    }

    // Adding error elements dynamically
    function addErrorElements(formId, fieldIds) {
        const form = document.getElementById(formId);
        fieldIds.forEach(fieldId => {
            const errorElement = document.createElement('div');
            errorElement.id = `${fieldId}Error`;
            errorElement.style.color = 'red';
            errorElement.style.display = 'none';
            form.querySelector(`#${fieldId}`).parentNode.appendChild(errorElement);
        });
    }

    addErrorElements('ForgotRegistrationForm', ['firstName', 'lastName', 'email', 'contactNumber', 'message']);

    forgotForm.addEventListener('submit', function(event) {
        let isValid = true;

        isValid &= validateField('firstName', 'firstNameError', 'First name is required.');
        isValid &= validateField('lastName', 'lastNameError', 'Last name is required.');
        isValid &= validateEmail('email', 'emailError');
        isValid &= validateContactNumber('contactNumber', 'contactNumberError');
        isValid &= validateField('message', 'messageError', 'Message is required.');

        // Prevent form submission if there are validation errors
        if (!isValid) {
            event.preventDefault();
        }
    });
});