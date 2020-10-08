var Webflow = Webflow || [];
Webflow.push(function() {

	// display error message
	function displayError(message) {
		hideLoading();
		failureMessage.innerText = message;
		failureMessage.style.display = 'block';
	}

	// hiding the loading indicator
	function hideLoading() {
		showForm();
		successMessage.style.display = 'none';
	}

	// hide the form
	function hideForm() {
		form.style.display = 'none';
	}

	// show the loading indicator
	function showLoading() {
		hideForm();
		successMessage.style.display = 'block';
	}

	// show the form
	function showForm() {
		form.style.display = 'block';
	}

	// listen for xhr events
	function addListeners(xhr) {
		xhr.addEventListener('loadstart', showLoading);
	}

	// add xhr settings
	function addSettings(xhr) {
		xhr.timeout = requestTimeout;
	}

	// capture form submit 
	// prevent default behavior
	// send our own ajax request!
	// capture response
	function triggerSubmit(event) {
		event.preventDefault();
		let formData = new FormData(event.target);
		let xhr = new XMLHttpRequest();

		// setup + send request
		xhr.open('POST', event.srcElement.action);
		addListeners(xhr);
		addSettings(xhr);
		xhr.send(formData);

		// capture xhr response
		xhr.onload = function() {
			if (xhr.status === 302) {
				window.location.assign(event.srcElement.dataset.redirect);
			} else {
				displayError(errorMessage);
			}
		}

		// capture xhr request timeout
		xhr.ontimeout = function() {
			displayError(errorMessageTimedOut);
		}
	}

	// replace 'form-one' with your form ID
	const form = document.getElementById('form-one');

	// set the Webflow Error Message Div Block ID to 'error-message'
	let failureMessage = document.getElementById('error-message');

	// set the Webflow Success Message Div Block ID to 'success-message'
	let successMessage = document.getElementById('success-message');

	// set request timeout in milliseconds (1000ms = 1second)
	let requestTimeout = 10000;

	// error messages
	let errorMessageTimedOut = 'Oops! Seems this timed out. Please try again.';
	let errorMessage = 'Oops! Something went wrong. Please try again.';

	// trigger on form submit
	form.addEventListener('submit', triggerSubmit);

});
