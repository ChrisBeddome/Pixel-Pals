var loginPage;

function loginInit() {

	loginPage = {

		validate: function () {
			var username = document.querySelector("#loginUsernameField").value;
			var password = document.querySelector("#loginPasswordField").value;

			document.querySelector("#loginUsernameField").value = "";
			document.querySelector("#loginPasswordField").value = "";

			if (username.length === 0 || password.length === 0) {
				view.showError("login", "Must fill in all fields");
				document.getElementById("loginUsernameField").focus();
			} else {
				loginPage.login(username, password);
			}
		},

		login: function (username, password) {
			var data = "username=" + username + "&password=" + password;

			var callback = function (response) {
				var serverResponse = JSON.parse(response);

				if (serverResponse === "logged in") {
					view.enterSite();
					view.clearErrors("login");
				} else {
					view.showError("login", serverResponse);
					document.getElementById("loginUsernameField").focus();
				}
			};

			ajax.sendRequest("phpScripts/login.php", callback, data);
		},

		logout: function () {
			var callback = function (response) {
				var serverResponse = JSON.parse(response);
				if (serverResponse === "logged out") {
					view.leaveSite();
					view.clearInfo();
				} else {
					alert(serverResponse);
				}
			};

			ajax.sendRequest("phpScripts/logout.php", callback);
		},

		validateRegister: function () {
			var username = document.querySelector("#registerUsername").value;
			var email = document.querySelector("#registerEmail").value;
			var password = document.querySelector("#registerPassword").value;
			var password2 = document.querySelector("#registerPassword2").value;

			if (username.length === 0 || password.length === 0 || password.length === 0 || password2.length === 0) {
					view.showError("login", "Must fill in all fields")
				document.getElementById("registerUsername").focus();
			} else if (username.length < 3) {
					view.showError("login", "Username must be at least 3 characters")
				document.getElementById("registerUsername").focus();
			} else if (password.length < 6 || password2.length < 6) {
					view.showError("login", "Password must be at least 6 characters")
			} else if (password !== password2) {
					view.showError("login", "Passwords do not match")
			} else {
				loginPage.register(username, email, password);
			}
		},

		register: function (username, email, password) {
			var data = "username=" + username + "&email=" + email + "&password=" + password;

			var callback = function (response) {
				var serverResponse = JSON.parse(response);

				if (serverResponse === "registered") {
					view.showLoginForm();
					loginPage.login(email, password);
					view.clearErrors("login");

				} else {
					view.showError("login", serverResponse);
				}
			};

			ajax.sendRequest("phpScripts/register.php", callback, data);
		},

		checkLoginStatus: function (sendback) {
			var callback = function (response) {
				var serverResponse = JSON.parse(response);
				if (serverResponse === "true") {
					sendback(true)
				} else {
					sendback(false);
				}
			};

			ajax.sendRequest("phpScripts/check_login_status.php", callback);
		}
	};

	document.querySelector("#loginPage #loginButton").addEventListener("click", loginPage.validate);
	document.querySelector("#loginPage #loginPasswordField").addEventListener("keydown", function (e) {
		if (e.keyCode === 13) {
			loginPage.validate();
		}
	});
	document.querySelector("#registerPassword2").addEventListener("keydown", function (e) {
		if (e.keyCode === 13) {
			loginPage.validateRegister();
		}
	});
	document.querySelector("#logoutButton").addEventListener("click", loginPage.logout);
	document.querySelector("#registerButton").addEventListener("click", loginPage.validateRegister);
	
	var errorDisplays = document.getElementsByClassName("errorDisplay");
	for (var i = 0; i < errorDisplays.length; i++) {
		errorDisplays[i].addEventListener("click", function() {
			this.style.display = "none";
			this.textContent = "";
		});
	}
}