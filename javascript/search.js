	//contains all methods for the character search functionality
	var searchPage;

	function searchInit() {

		searchPage = {

			//contains all methods for sending/retrieving information to/from server
			connect: {
				getGameNames: function () {
					var callback = function (response) {
						var gameNames = JSON.parse(response);
						searchPage.output.populateGameList(gameNames);
					};

					ajax.sendRequest("phpScripts/get_game_names.php", callback);
				},

				getServerNames: function () {
					var game = document.querySelector("#gameName").value;
					var data = "game=" + game;

					var callback = function (response) {
						var serverNames = JSON.parse(response);
						searchPage.output.populateServerList(serverNames);
					};

					ajax.sendRequest("phpScripts/find_servers.php", callback, data);
				},

				getCharacters: function () {
					var name = document.querySelector("#charName").value;
					var game = document.querySelector("#gameName").value;
					var server = document.querySelector("#serverName").value;


					if (game === "default") {
						view.showError("search", "Must select a game");
						return;
					}

					var data = "name=" + name + "&game=" + game + "&server=" + server;

					var callback = function (response) {
						var results = JSON.parse(response);
						searchPage.output.populateCharacterTable(results);
					};

					ajax.sendRequest("phpScripts/find_characters.php", callback, data);
				}
			},

			//contains all methods for formatting and outputting server repsonse to screen
			output: {
				populateGameList: function (gameNames) {
					var list = document.querySelector("#gameName");
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
				},

				populateServerList: function (serverNames) {
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

					for (var i = 0; i < serverNames.length; i++) {
						option = document.createElement('option');
						option.value = serverNames[i];
						option.textContent = serverNames[i];
						list.appendChild(option);
					}

					list.value = "default";
				},

				populateCharacterTable: function (results) {
					var table = document.querySelector("#characterTable");
					searchPage.clearTable(table);
					view.clearErrors("search");

					if (results.length === 0) {
						view.showError("search", "No results");
						return;
					}

					searchPage.createHeaders(table);

					//row containting the user_id, do not display, add as row property
					var userIdRow = 4;
					for (var i = 0; i < results.length; i++) {
						var row = document.createElement("tr");
						for (var j = 0; j < results[i].length; j++) {

							if (j === userIdRow) {
								continue;
							}

							var data = document.createElement("td");
							data.textContent = results[i][j];
							row.appendChild(data);
						}

						let username = results[i][3];
						
						row.addEventListener("click", function () {
							view.openMessagePrompt(username);
						});
						
						table.appendChild(row);
					}
				}
			},

			//misc methods and helpers
			clearList: function (list) {
				while (list.options.length > 0) {
					list.remove(0);
				}
			},

			clearTable: function (table) {
				while (table.firstChild) {
					table.removeChild(table.firstChild);
				}
			},

			createHeaders: function (table) {
				var row = document.createElement("tr");
				var name = document.createElement("th");
				var server = document.createElement("th");
				var game = document.createElement("th");
				var username = document.createElement("th");

				name.textContent = "Character Name";
				server.textContent = "Server";
				game.textContent = "Game";
				username.textContent = "Username";

				row.appendChild(name);
				row.appendChild(server);
				row.appendChild(game);
				row.appendChild(username);
				table.appendChild(row);
			}
		};
		
		document.querySelector("#searchButton").addEventListener("click", searchPage.connect.getCharacters);
		document.querySelector("#gameName").addEventListener("change", searchPage.connect.getServerNames);
	}