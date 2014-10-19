var Astar = (function(global){
	var PriorityQueue = global.Lib.PriorityQueue;
	var abs = Math.abs;
	var sqrt = Math.sqrt;
	var _q = new PriorityQueue();
	_q.setCmp(function(x, y){
		if (x.d + x.h >= y.d + y.h) {
			return 1;
		} else if (x.d + x.h < y.d + y.h) {
			return -1;
		} else {
			return 0;
		}
	});
	var o = {};
	var BLOCK     = 0x01;
	var EMPTY     = 0x02;
	var ROUTE     = 0x04;
	var SEARCHED  = 0x08;
	var MARK      = 0x10;
	var START     = 0x20;
	var GOAL      = 0x40;

	var _grid = null;
	var _start = null;
	var _goal = null;
	var _x = 0;
	var _y = 0;

	function _p(x, y) {
		return {"x": x, "y": y};
	}
	function _createNode(x, y, state, d) {
		var node = {};
		node.x = x;
		node.y = y;
		node.state = state;
		node.d = d;
		if ((state & (START | BLOCK)) != 0) {
			node.h = 999999;
		} else {
			// node.h = sqrt(Math.pow(x - _goal.x, 2) + Math.pow(y - _goal.y, 2));
			node.h = abs(x - _goal.x) + abs(y - _goal.y)
		}
		return node;
	}
	function _tryInsert(x, y, node, dist, returnNodes) {
		if (x < 0 || y < 0){
			return;
		}
		if (!(x < _x || y < _y)) {
			return;
		}
		if ((_grid[x][y] & SEARCHED) != 0) {
			return;
		}
		_grid[x][y] |= MARK;
		var childNode = _createNode(x, y, _grid[x][y], node.d + dist);
		childNode.parent = node;
		returnNodes.push(childNode);
	}
	function _expand(node) {
		var x = node.x;
		var y = node.y;
		console.log(["expanding", x, y, node]);
		_grid[x][y] |= SEARCHED;
		var returnNodes = [];
		_tryInsert(x, y-1, node, 1, returnNodes);
		_tryInsert(x, y+1, node, 1,returnNodes);
		_tryInsert(x-1, y, node, 1, returnNodes);
		_tryInsert(x+1, y, node, 1,returnNodes);
		_tryInsert(x-1, y-1, node, 1.4, returnNodes);
		_tryInsert(x+1, y+1, node, 1.4, returnNodes);
		_tryInsert(x+1, y-1, node, 1.4, returnNodes);
		_tryInsert(x-1, y+1, node, 1.4, returnNodes);
		return returnNodes;
	}
	o.init = function (m, n) {
		_x = n;
		_y = m;
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
		_grid[x][y] = START | MARK;
		var startnode = _createNode(x, y, _grid[x][y], 0);
		startnode.type = START;
		_q.enqueue(startnode);
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
		if (_q.isEmpty()) {
			alert("error");
			return;
		}
		var node = _q.dequeue();
		// mark as visited
		_grid[node.x][node.y] |= SEARCHED;

		// found
		if (node.h == 0) {
			while(node.parent) {
				_grid[node.x][node.y] |= ROUTE;
				node = node.parent;
			}
			alert("found");
			return;
		}

		var list = _expand(node);
		for (var i = 0; i < list.length; i++) {
			if ((list[i].state & BLOCK) == 0) {
				_q.enqueue(list[i]);
			}
		}

		var debug = [];
		for (var i = 0; i < _q.length; i++){
			debug.push(_q.array[i]);
		}
		// console.log(debug);
		setTimeout(o.search, 10);
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
	o.readQueue = function () {
		return _q;
	};
	return o;
})(this);