var Astar = (function(){
	var o = {};
	var STATEMASK = 0xff000000;
	var BLOCK     = 0x01000000;
	var EMPTY     = 0x02ffffff;
	var ROUTE     = 0x0400cc00;
	var SEARCHED  = 0x08cc0000;
	var EXPAND    = 0x0f0000cc;
	var START     = 0x10cccc00;
	var GOAL      = 0x2000cccc;

	var _grid = null;
	var _start = null;
	var _goal = null;
	function _p(x, y) {
		return {"x": x, "y": y};
	}
	o.init = function (m, n) {
		_grid = new Array(m);
		for (i = 0; i < m; i++) {
			_grid[i] = new Array(n);
			for (j = 0; j < n; j++){
				_grid[i][j] = EMPTY;
			}
		}
	};
	o.setStart = function (x, y) {
		if (_grid[x][y] != EMPTY) {
			return;
		}
		_start = _p(x, y);
		_grid[x][y] = START;
	};
	o.setGoal = function (x, y) {
		if (_grid[x][y] != EMPTY) {
			return;
		}
		_goal = _p(x, y);
		_grid[x][y] = GOAL;
	};
	o.setBlock = function (x, y) {
		if (_grid[x][y] != EMPTY) {
			return;
		}
		_grid[x][y] = BLOCK;
	};
	o.getGrid = function () {
		return _grid;
	};
	o.getStatus = function() {
		if (!_start) {
			return 0;
		} else if (!_goal) {
			return 1;
		} else {
			return 2;
		}
	};
	o.printThis = function () {
		console.log(this);
	};
	return o;
})();