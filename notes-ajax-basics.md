# AJAX Basics
* AJAX is not a language, it is a process.
* A request is sent to the server and the server returns a response
* The request can be for a webpage, a text file, a result from a database, or form information...etc
* Use the XMLHttpRequestObject in JavaScript
	- This is usually abbreviated to xhr
* Can be broken into 4 main steps:
	- Create an XMLHTTP Request object
	- Create a callback function. This is the function that will run when the server returns its response
	- Open a request. Add the HTTP method and the URL to send
	- Send the request
* Note that you can never tell the order multiple ajax requests will run their callbacks

## URL Encoding
* http://url-encode-decode.com for encoding / decoding url strings
* & space + all have special meaning in url strings
	- & = %26
	- space = +
	- + = %2B
* JavaScript and jQuery have methods to convert and decode
* You can use GET methods with query strings to retrieve information from a URL, this is relatively common
	- However, it is not a good practice to send data in a GET request that will be saved into a database
* GET methods have limitations for sending data
	- All of the data is sent in the URL
	- Data will appear in the computer's browser history.
	- There is only so much informaiton that you can put in a URL, ex 2000 char limit
	- POST sends data separate from the URL and is better for sending data

## AJAX Security Limitations
* You cannot use AJAX to communicate with urls that are not on the same server
	- This is the Single Origin Policy
* Cannot switch from http to https
* You cannot switch ports
* You cannot switch hosts (http://myserver.com vs http://db.myserver.com)
* Circumvent the Single Origin Policy
	- Create a Web Proxy
		+ Setup a script that asks for information from another website then have your ajax communicate with that script
		+ JSONP - JSON with Padding
			* Allows linking to json from other domains
			* jQuery provides good integration with JSONP
		+ CORS - Cross-Origin Resource Sharing
			* W3C Reccomendation
			* Allows a server to accept requests from other domains
			* Can require credentials before sending a response

## Parsing Data
* The browser sees the XML, JSON, etc as a plain string
* You must parse the data for the browser
* Use JSON.parse('yourJson') to parse JSON
	- JSON.parse is valid in IE 8
	- Your string must be a valid JSON file otherwise you will trigger a JavaScript error

## jQuery
* Has a lot of AJAX methods that simplify such tasks
* It is designed to work with a wide range of browsers and handles the considerations that you would otherwise need to account for
* You can actually send JSON in some methods and it will be automatically converted
```javascript
var url = '/employees.php';
var data = {
	firstName: "Jeff",
	lastName: "Lebowki"
};
var callback = (response) => { /* do some stuff */ };

$.get(url, data, callback); // Sends an AJAX get request
```
### Posting Data with jQuery
---
* Posting Data:
```javascript
var data = {
	firstName : "Jeff",
	lastName : "Lebowski"
};
$.post('http://website.com/posts', data, (response) => /* Do some stuff */ )
```
* Submitting form data
```javascript
$(document).ready(() => {
	$('#myForm').submit((event) => {
		event.preventDefault(); // Prevent the form from actually submit the form from submitting when the submit button is clicked
		var url = $(this).attr('action'); // Set url to the action property of the form
		var formData = $(this).serialize(); // Get all of the form data w/out needing to loop through the form elements
		$.post(url, formData, (respons) => {
			$('#signup').html('<p>Thanks for signing up!</p>'); // Indicate to the user that the form was submitted
		}); // end post
	}); // end submit
}); // end ready
```

### jQuery .ajax() Method
---
* The 'ultimate' jQuery ajax method as it is very flexible and powerful
* The second parameter is an array of settings that lets you customize the function to a high degree
```javascript
var url = $(this).attr('action');
var formData = $(this).serialize();
$(document).ready(() => {
	$.ajax(url, {
		data: formData,
		type: "POST",
		success: (response) => $('#signup').html('<p>Thanks for signing up!</p>')
	});
});
```

### jQuery .success() and .fail() Methods
* You can add additional methods such as .fail() to handle errors or other statuses
```javascript
$.get('missing.html', (data) => {
	$('#footer').html(data);
}).fail((jqXHR) => { // jqXHR holds the jQuery XHR object passed in by the fail method to the function
	// handle the failure case
	alert(jqXHR.statusText);
});
```