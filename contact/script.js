document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const successMessage = document.createElement('p');
    successMessage.classList.add('form-success');
    contactForm.appendChild(successMessage);

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill out all fields.');
            return;
        }

        const formData = new FormData(contactForm);

        const formAction = "https://formspree.io/f/xdkelvbg"

        const submitButton = contactForm.querySelector('button');
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        fetch(formAction, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(() => {
            successMessage.textContent = 'Email sent successfully. I will get back to you soon.';
            successMessage.classList.add('visible');
            contactForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Oops! There was a problem sending your message. Please try again.');
        })
        .finally(() => {
            submitButton.textContent = 'Send';
            submitButton.disabled = false;
        });
    });
});
