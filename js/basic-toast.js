
/* Basic Toast Function */
function showToastFor(_message) {
	// get the reference to DIV toast
	var _toastBox = document.getElementById('toastContainer');
	// if it does not exist
	if (!_toastBox) {
		// create a new element
		let _newBox = document.createElement('div');
		// assign identifier
		_newBox.setAttribute('id','toastContainer');
		// add to DOM
		document.body.appendChild(_newBox);
		// fallback just in case
		_toastBox = document.getElementById('toastContainer');
	}
	// Check message 
	if (_message.trim() == '' || _message.length <= 0 || typeof _message == null) {
		// stop execution
		return;
	}
	// Add the "show" class to DIV
	_toastBox.className = 'show w3-light-card-1';
	//Add the message to show 
	_toastBox.innerHTML = _message.trim();
	// After 3 seconds, remove the show class from DIV
	setTimeout(function () { 
		_toastBox.className = _toastBox.className.replace("show", ""); 
	}, 2000);
}

// Test With Sample => showToastFor('hi!');