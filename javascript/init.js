function init() {
	ajaxInit();
	loginInit();
	searchInit();
	viewInit();
	characterInit();
	inboxInit();

	//enter site if user is logged in
	(function checkIfLoggedIn() {
		var callback = function (status) {
			if (status) {
				view.enterSite();
			} else {
				document.getElementById("loginUsernameField").focus();
			}
		};
		loginPage.checkLoginStatus(callback);
	})();
}

window.onload = init;