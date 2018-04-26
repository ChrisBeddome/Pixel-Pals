var ajax;

function ajaxInit() {
	ajax = {
		sendRequest: function (target, callback, data) {
			var request = new XMLHttpRequest();
			request.open("POST", target, true);
			if (!data) {
				request.send();
			} else {
				request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				request.send(data);
			}
			request.onload = function () {
				var response = request.response;
				callback(response);
			};
		}
	};
}