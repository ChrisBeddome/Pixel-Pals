var inboxPage = {};

function inboxInit() {
	inboxPage.getMessages = function () {
		var callback = function (response) {
			var messages = JSON.parse(response);
			inboxPage.populateMessageTable(messages);
		};

		ajax.sendRequest("phpScripts/get_messages.php", callback);
	};


	inboxPage.populateMessageTable = function (messages) {

		var table = document.querySelector("#messageTable");

		searchPage.clearTable(table);

		if (messages.length === 0) {
			return;
		}

		for (var i = 0; i < messages.length; i++) {
			var row = document.createElement("tr");

			var sender = document.createElement("td");
			var timestamp = document.createElement("td");

			sender.textContent = messages[i].sender;
			timestamp.textContent = messages[i].timestamp;

			row.appendChild(sender);
			row.appendChild(timestamp);
			table.appendChild(row);
			
			let content = messages[i].content;
			let senderName = messages[i].sender;
			
			row.addEventListener("click", function() {
				inboxPage.loadMessage(content, senderName, this);
			})
		}
	};
	
	
	inboxPage.loadMessage = function(content, sender, button) {
		var messageBox = document.getElementById("messageContent");
		messageBox.textContent = content;
		messageBox.sender = sender;
		
		view.showReceivedMessageBox();
		
		var rows = document.querySelectorAll("#messageTable tr");
		for (var i = 0; i < rows.length; i++) {
			rows[i].classList.remove("selectedMessage");
		}
		
		button.classList.add("selectedMessage");
	};
	
	inboxPage.sendMessage = function(username, content) {
		if (content.length < 2) {
			alert("Message cannot be blank");
			return;
		}
		
		var callback = function(response) {
			var message = JSON.parse(response);
			if (message === "fail") {
				view.showError("inbox", "Login error");
				view.showError("search", "Login error");
			} else if (message === "sent") {
				view.showError("inbox", "Message Sent");
				view.showError("search", "Message Sent");
				view.closeMessagePrompt();
			} else {
				view.showError("inbox", message);
				view.showError("search", message);
				
			}
		};
		
		var data = "username=" + username + "&content=" + content;
		
		ajax.sendRequest("phpScripts/send_message.php", callback, data);
	}; 
	
	document.getElementById("replyButton").addEventListener("click", function() {
		var username = document.getElementById("messageContent").sender;
		view.openMessagePrompt(username);
	});
	
	document.getElementById("sendButton").addEventListener("click", function () {
			var content = document.getElementById("sendMessageContent").value;
			var username =  document.getElementById("sendMessage").username;
			inboxPage.sendMessage(username, content);
		});
}