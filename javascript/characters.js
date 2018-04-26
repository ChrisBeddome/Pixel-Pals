var characterPage = {};

function characterInit() {

	characterPage.getUserCharacters = function () {
		var callback = function (response) {
			var charInfo = JSON.parse(response);
			characterPage.populateCharacterTable(charInfo);
		};
		ajax.sendRequest("phpScripts/get_user_characters.php", callback);
	};


	characterPage.getUserData = function () {
		var callback = function (status) {
			if (status) {
				characterPage.getUserCharacters();
			}
		}
		loginPage.checkLoginStatus(callback);
	};


	characterPage.populateCharacterTable = function (charInfo) {
		var table = document.querySelector("#userCharacterTable");
		characterPage.clearTable(table);

		if (charInfo.length === 0) {
			return;
		}

		characterPage.createHeaders(table);

		var charIDRow = 3;
		for (var i = 0; i < charInfo.length; i++) {
			var row = document.createElement("tr");
			for (var j = 0; j < charInfo[i].length; j++) {
				var data = document.createElement("td");

				if (j === charIDRow) {
					data.setAttribute("data-charID", charInfo[i][j]);
					data.textContent = "Delete";
					data.addEventListener("click", characterPage.deleteCharacter);
					row.appendChild(data);
					continue;
				}


				data.textContent = charInfo[i][j];
				row.appendChild(data);

			}
			table.appendChild(row);
		}
	};


	characterPage.clearTable = function (table) {
		while (table.firstChild) {
			table.removeChild(table.firstChild);
		}
	};


	characterPage.createHeaders = function (table) {
		var row = document.createElement("tr");
		var name = document.createElement("th");
		var server = document.createElement("th");
		var game = document.createElement("th");
		var empty = document.createElement("th");

		name.textContent = "Character Name";
		server.textContent = "Server";
		game.textContent = "Game";

		row.appendChild(name);
		row.appendChild(server);
		row.appendChild(game);
		row.appendChild(empty)
		table.appendChild(row);
	};


	characterPage.getGameNames = function () {
		var callback = function (response) {
			var gameNames = JSON.parse(response);
			characterPage.populateGameList(gameNames);
		};

		ajax.sendRequest("phpScripts/get_game_names.php", callback);
	};


	characterPage.getServerNames = function () {
		var game = document.querySelector("#addGameName").value;
		var data = "game=" + game;

		var callback = function (response) {
			var serverNames = JSON.parse(response);
			characterPage.populateServerList(serverNames);
		};

		ajax.sendRequest("phpScripts/find_servers.php", callback, data);
	};


	characterPage.populateGameList = function (gameNames) {
		var list = document.querySelector("#addGameName");
		searchPage.clearList(list);

		var option = document.createElement('option');
		option.value = "default";
		option.textContent = "Select a game";
		option.setAttribute("disabled", "true");
		list.appendChild(option);

		for (var i = 0; i < gameNames.length; i++) {
			option = document.createElement('option');
			option.value = gameNames[i];
			option.textContent = gameNames[i];
			list.appendChild(option);
		}

		list.value = "default";
	};


	characterPage.populateServerList = function (serverNames) {
		var list = document.querySelector("#addServerName");
		searchPage.clearList(list);

		var option = document.createElement('option');
		option.value = "default";
		option.textContent = "Select a server";
		option.setAttribute("disabled", "true");
		list.appendChild(option);

		for (var i = 0; i < serverNames.length; i++) {
			option = document.createElement('option');
			option.value = serverNames[i];
			option.textContent = serverNames[i];
			list.appendChild(option);
		}

		list.value = "default";
	};


	characterPage.addCharacter = function () {
		var name = document.querySelector("#addCharName").value;
		var game = document.querySelector("#addGameName").value;
		var server = document.querySelector("#addServerName").value;

		if (game === "default" || server === "default" || server === "" || name === "") {
			view.showError("character", "Must specify game, server and charcter name");
			return;
		}

		var data = "name=" + name + "&game=" + game + "&server=" + server;

		var callback = function (response) {
			var results = JSON.parse(response);
			characterPage.getUserCharacters();
			document.getElementById("addCharName").value = "";
			view.showError("character", "Character added");
		};

		ajax.sendRequest("phpScripts/add_character.php", callback, data);


	};


	characterPage.deleteCharacter = function () {
		var charID = this.getAttribute("data-charID");
		var data = "charID=" + charID;

		var callback = function (response) {
			characterPage.getUserCharacters();
			view.showError("character", "Character deleted");
		};

		ajax.sendRequest("phpScripts/delete_character.php", callback, data);
	};

	document.querySelector("#addButton").addEventListener("click", characterPage.addCharacter);
	document.querySelector("#addGameName").addEventListener("change", characterPage.getServerNames);
	characterPage.getGameNames();
}