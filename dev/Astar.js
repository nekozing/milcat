var Astar = (function(global){
	var PriorityQueue = global.Lib.PriorityQueue;
	var _q = new PriorityQueue();
	_q.setCmp(function(x, y){
		if (x.d + x.h > y.d + y.h) {
			return 1;
		} else if (x.d + x.h < y.d + y.h) {
			return -1;
		} else {
			return 0;
		}
	});
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
	function _createNode(x, y) {
		var node = {};
		node.x = x;
		node.y = y;
		node.d = abs(x - _start.x) + abs(y - _start.y);
		mode.h = abs(x - _goal.x) + abs(y - _goal.y);
		return node;
	}
	function _expand(x, y) {
		
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
		_q.enqueue(_createNode(x, y));
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
	o.search = function () {
		var node = {};


		// setTimeout(o.search, 500);
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
})(this);