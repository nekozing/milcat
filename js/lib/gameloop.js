(function (global) {
	var GLoop = {
		keys: new Array(128),
		update: function () {

		},
		loop: function() {
			while (running) {
				this.processInput();
				this.update();
				this.render();
			}
		}

	};
}())