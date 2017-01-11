			(function() {
				var getNode = function(s) {
				return document.querySelector(s);
				},

				// Get Nodes
						
				status = getNode(".chat-status span"),
				textarea = getNode(".chat textarea"),
				chatName = getNode(".chat-name"),
				messages = getNode(".chat-messages"),
				roomName = getNode(".room-name");

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

				
				// Listen for status

				socket.on("status", function(data){



					setStatus((typeof data === "object") ? data.message : data);

					if(data.clear === true){

					textarea.value = "";
					}
				});
				// Event listener
				textarea.addEventListener("keydown", function(event){
					var self = this, 
						name = chatName.value;
						room = roomName.value;


					if(event.which === 13 && event.shiftKey === false){

						socket.emit("input", {
							name: name,
							message: self.value,
							room: room
							
						});
						}
					});
				}
		})();
