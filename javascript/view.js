//contains all site-wide view functionality
var view = {};

function viewInit() {

	//page display stuff
	view.pages = Array.prototype.slice.call(document.getElementsByClassName("page"));
	view.buttons = document.getElementsByClassName("navButton");
	view.container1 = document.getElementById("container1");
	view.container2 = document.getElementById("container2");
	view.hiddenContainer = document.getElementById("hiddenContainer");
	view.currentPage = view.pages[0];
	view.currentContainer = view.container1;
	view.nextContainer = view.container2;

	view.loadPage = function (page) {
		if (page === view.currentPage) {
			return;
		}

		view.nextContainer.appendChild(page);

		//determines which direction divs will slide in from, true = right, false = left
		var direction = view.pages.indexOf(view.currentPage) > view.pages.indexOf(page);
		var incomingStart = direction ? 120 : -20;
		var outgoingStart = 50;
		var centeredPos = 50;
		var increment = direction ? -10 : 10;

		view.nextContainer.style.left = incomingStart + "%";
		view.nextContainer.style.display = "block";

		function animationFrame(incomingPos, outgoingPos) {
			view.nextContainer.style.left = incomingPos + "%";
			view.currentContainer.style.left = outgoingPos + "%";

			if (incomingPos === centeredPos) {
				view.removePage(page);
				return;
			}

			setTimeout(function () {
				animationFrame(incomingPos + increment, outgoingPos + increment);
			}, 12);
		}

		//if the inbox page is loaded, get users messages
		if (view.pages.indexOf(page) === 3) {
			inboxPage.getMessages();
			view.hideReceivedMessageBox();
		}

		view.moveHighlighter(view.pages.indexOf(page), direction);
		animationFrame(incomingStart, outgoingStart);
		view.clearErrors();
		view.hideMobileMenu();
	};

	view.removePage = function (page) {
		view.hiddenContainer.appendChild(view.currentPage);
		view.currentContainer.style.display = "none";
		view.swapContainers();
		view.currentPage = page;
	};

	view.swapContainers = function () {
		var temp = view.currentContainer;
		view.currentContainer = view.nextContainer;
		view.nextContainer = temp;
	};

	view.enterSite = function () {
		var header = document.getElementById("navbar");
		var footer = document.getElementById("footer");

		header.style.top = "0px";
		footer.style.bottom = "0px";

		characterPage.getUserData();
		view.loadPage(view.pages[1]);
		searchPage.connect.getGameNames();
	}

	view.leaveSite = function () {
		var header = document.getElementById("navbar");
		var footer = document.getElementById("footer");

		header.style.top = "-105px";
		footer.style.bottom = "-105px";

		view.loadPage(view.pages[0]);
		setTimeout(function () {
			document.getElementById("loginUsernameField").focus();
		}, 200);

		view.clearErrors();
		view.hideMobileMenu();
	}


	//navigation highlighter stuff
	view.navHighlighter = document.getElementById("navHighlighter");
	view.navButtons = document.getElementsByClassName("navButton");

	view.moveHighlighter = function (position, direction) {
		var endPos;
		switch (position) {
			case 0:
				endPos = 388;
				break;
			case 1:
				endPos = 280;
				break;
			case 2:
				endPos = 168;
				break;
			case 3:
				endPos = 72;
				break;
			default:
				endPos = 388;
				break
		}
		
		var startPos = parseInt(view.navHighlighter.style.right);

		var increment = direction ? Math.abs((startPos - endPos) / 5) : -Math.abs((startPos - endPos) / 5);

		function animationFrame(pos, end) {
			view.navHighlighter.style.right = Math.floor(pos) + "px";

			if (direction) {
				if (pos > end) {
					view.navHighlighter.style.right = end + "px";
					return;
				}
			} else {
				if (pos < end) {
					view.navHighlighter.style.right = end + "px";
					return;
				}
			}

			setTimeout(function () {
				animationFrame(pos + increment, end);
			}, 15);


		}

		animationFrame(startPos, endPos);

		for (var i = 0; i < view.navButtons.length; i++) {
			view.navButtons[i].classList.remove("navItemSelected");
		}

		view.navButtons[position].classList.add("navItemSelected");
	}

	view.showRegisterForm = function () {

		document.getElementById("loginForm").style.display = "none";
		document.getElementById("registerForm").style.display = "block";

		document.getElementById("registerUsername").value = "";
		document.getElementById("registerEmail").value = "";
		document.getElementById("registerPassword").value = "";
		document.getElementById("registerPassword2").value = "";
		document.getElementById("loginUsernameField").value = "";
		document.getElementById("loginPasswordField").value = "";

		document.getElementById("registerUsername").focus();
		view.clearErrors("login");
	};

	view.showLoginForm = function () {
		document.getElementById("registerForm").style.display = "none";
		document.getElementById("loginForm").style.display = "block";

		document.getElementById("registerUsername").value = "";
		document.getElementById("registerEmail").value = "";
		document.getElementById("registerPassword").value = "";
		document.getElementById("registerPassword2").value = "";
		document.getElementById("loginUsernameField").value = "";
		document.getElementById("loginPasswordField").value = "";

		document.getElementById("loginUsernameField").focus();
		view.clearErrors("login");
	};

	//called during logout
	view.clearInfo = function () {
		document.getElementById("messageContent").textContent = "";
		document.getElementById("messageContent").sender = false;
		view.closeMessagePrompt("searchPage");
		view.closeMessagePrompt("messagePage");
		view.hideReceivedMessageBox();

		var list = document.querySelector("#serverName");
		searchPage.clearList(list);

		var option = document.createElement('option');
		option.value = "default";
		option.textContent = "Select a server";
		option.setAttribute("disabled", "true");
		list.appendChild(option);

		option = document.createElement('option');
		option.value = "all";
		option.textContent = "All servers";
		list.appendChild(option);
		list.value = "default";

		searchPage.clearTable(document.getElementById("characterTable"));
		searchPage.clearTable(document.getElementById("messageTable"));
	}

	view.showError = function (page, message) {
		var errorMsg = document.getElementById(page + "ErrorDisplay");
		errorMsg.style.display = "block";
		errorMsg.textContent = message;

		setTimeout(function () {
			view.clearErrors(page);
		}, 6000);
	};

	view.clearErrors = function (page) {
		//if no page specified, clear all errors
		if (page === undefined) {
			var errorBoxes = document.getElementsByClassName("errorDisplay");

			for (var i = 0; i < errorBoxes.length; i++) {
				errorBoxes[i].style.display = "none";
				errorBoxes[i].textContent = "";
			}
		} else {
			var errorMsg = document.getElementById(page + "ErrorDisplay");
			errorMsg.style.display = "none";
			errorMsg.textContent = "";
		}
	};

	view.openMessagePrompt = function (username) {
		var messagePrompt = document.getElementById("sendMessage");
		messagePrompt.username = username;

		messagePrompt.style.display = "block";
		messagePrompt.children[1].focus();
		messagePrompt.children[0].children[0].textContent = "To: " + username;

		view.displayOverlay();

		messagePrompt.children[0].children[1].addEventListener("click", function () {
			view.closeMessagePrompt();
		});
	};

	view.closeMessagePrompt = function () {
		var messagePrompt = document.getElementById("sendMessage");
		messagePrompt.username = "";

		messagePrompt.style.display = "none";
		messagePrompt.children[0].children[0].textContent = "";
		messagePrompt.children[1].value = "";

		view.hideOverlay();
	};

	view.displayOverlay = function () {
		document.getElementById("blockOverlay").style.display = "block";
	};

	view.hideOverlay = function () {
		document.getElementById("blockOverlay").style.display = "none";
	};

	view.showReceivedMessageBox = function () {
		document.getElementById("receivedMessage").style.display = "block";
	};

	view.hideReceivedMessageBox = function () {
		document.getElementById("receivedMessage").style.display = "none";
	};

	view.toggleMobileMenu = function() {
		var menu = document.querySelector("#navbar ul");
		menu.classList.toggle("menuHide");
	};

	view.hideMobileMenu = function() {
		var menu = document.querySelector("#navbar ul");
		menu.classList.add("menuHide");
	};

	//add event listeners on page load
	for (var i = 0; i < view.buttons.length; i++) {
		let page = view.pages[i];
		view.buttons[i].addEventListener("click", function () {
			view.loadPage(page);
		});
	}

	//initialize navHighligther position on page load
	view.navHighlighter.style.right = "388px";


	document.querySelector("#switchToRegister").addEventListener("click", view.showRegisterForm);
	document.querySelector("#switchToLogin").addEventListener("click", view.showLoginForm);

	document.getElementById("menuButton").addEventListener("click", function() {
		view.toggleMobileMenu();
	})
}