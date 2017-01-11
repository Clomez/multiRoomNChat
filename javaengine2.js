			(function() {
				var getNode = function(s) {
				return document.querySelector(s);
				},

				// Get Nodes
				
				roomName = getNode(".room-name")		
				status = getNode(".chat-status span"),
				textarea = getNode(".chat textarea"),
				chatName = getNode(".chat-name"),
				messages = getNode(".chat-messages"),
				roomn2 = getNode(".roomn2");

				statusDefault = status.textContent,
				setStatus = function(s) {
				
					status.textContent =s;
					if(s !== statusDefault){
						var delay = setTimeout(function() {
						setStatus(statusDefault);
						clearInterval(delay)
					}, 3000);
					}
				};


				try {
					var socket = io.connect("http://88.192.20.97:6060");
				} catch(e) {
				// Set status to not connected


				}
				if(socket !== undefined) {

				// Listen for output

				socket.on("output", function(data) {
					if(data.length){
				


					for( x = 0; x < data.length; x++){
						if(data[x].room === roomName.value){
							var message = document.createElement("div");  
							message.setAttribute("class", "chat-message");
							message.textContent = data[x].name + ": " + data[x].message;

							messages.appendChild(message);
							messages.insertBefore(message, messages.firstChild);
						} }
					}
				});

				// Listen for status

				socket.on("status", function(data){

					setStatus((typeof data === "object") ? data.message : data);

					if(data.clear === true){

					textarea.value = "";
					}
				});
				// Event listener
				
				roomName.addEventListener("keydown", function(event){


	

					var self = this, 
						name = chatName.value,
						room = roomName.value;
		 
	

					if(event.which === 13 && event.shiftKey === false){
				var roomn = document.createElement("div");
				roomn.setAttribute("class", "roomn2");
				roomn.textContent = roomName.value;

				roomn2.appendChild(roomn);

				$("textarea").show();
				$(".chat-messages").show();
				$(".roomn2").show();
				$(".room-name").hide();
				$(".chat-name").hide();
				$(".roomn-nope").hide();

						socket.emit("input", {
							name: name,
							room: room,
							message: "has joined to " + roomName.value
						});
						}
					});
				}
		})();
