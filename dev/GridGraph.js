var GridGraph = (function(){
	var o = {};
	var COLORMASK = 0x00ffffff;
	var DEFAULTWIDTH = 40;
	var DEFAULTHEIGHT = 40;
	var _cellWidth = 0;
	var _cellHeight = 0;
	var _canvasWidth = 0;
	var _canvasHeight = 0;
	var _canvas;
	var _ctx;
	var _grid;
	var _highLight = null;
	function _line(x1, y1, x2, y2) {
		_ctx.beginPath();
		_ctx.moveTo(x1 + 0.5, y1 + 0.5);
		_ctx.lineTo(x2 + 0.5, y2 + 0.5);
		_ctx.strokeStyle = "#000000";
		_ctx.lineWidth = 1;
		_ctx.stroke();
	}
	function _colorCell(x, y, color) {
		var strColor = "#" + ("000000" + (color & COLORMASK).toString(16)).slice(-6);
		_ctx.beginPath();
		_ctx.rect(_cellWidth * x, _cellHeight * y, _cellWidth, _cellHeight);
		_ctx.fillStyle = strColor;
		_ctx.fill();
	}
	function _p(x, y) {
		return {"x": x, "y": y};
	}
	o.mapGridToCanvas = function (grid, canvas, cellw, cellh) {
		_canvas = canvas;
		_grid = grid;
		_cellWidth = DEFAULTWIDTH;
		_cellHeight = DEFAULTHEIGHT;
		if (cellw && cellh) {
			_cellWidth = cellw;
			_cellHeight = cellh;
		}
		_canvasHeight = _cellHeight * grid[0].length;
		_canvasWidth = _cellWidth * grid.length;
		canvas.height = _canvasHeight + 1;
		canvas.width = _canvasWidth + 1;
		_ctx = canvas.getContext("2d");
	};
	o.render = function() {
		this.renderCells();
		this.renderHighLight();
		this.renderGrid();
	};
	o.renderGrid = function () {
		for (i = 0; i <= _canvasHeight / _cellHeight; i++) {
			_line(0, i * _cellHeight, _canvasWidth, i * _cellWidth);
		}
		for (i = 0; i <= _canvasWidth / _cellWidth; i++) {
			_line(i * _cellWidth, 0, i * _cellWidth, _canvasHeight);
		}
	};
	o.renderCells = function () {
		for (i = 0; i < _canvasHeight / _cellHeight; i++) {
			for (j = 0; j < _canvasWidth / _cellWidth; j++) {
				_colorCell(i, j, _grid[i][j]);
			}
		}
	};
	o.renderHighLight = function () {
		if (_highLight) {
			_colorCell(_highLight.x, _highLight.y, 0x999999);
		}
	};
	o.setHighLight = function (x, y) {
		_highLight = _p(x, y);
	}
	o.addController = function (eventName, lambda) {
		_canvas.addEventListener(eventName, function(e) {
			var x = parseInt(e.offsetX / _cellWidth);
			var y = parseInt(e.offsetY / _cellHeight);
			lambda(x, y);
		});
	}
	o.viewDimension = function() {
		return _p(_canvasWidth, _canvasHeight);
	}
	return o;
})();