var Lib = (function(){
	var o = {};
	// min priority queue
	o.PriorityQueue = function () {
		this.maxLength = 4;
		this.length = 0;
		this.array = new Array(this.maxLength);
		this.cmp = function(x, y) {
			if (x > y) {
				return 1;
			} else if (x < y) {
				return -1;
			} else if (x == y) {
				return 0;
			} else {
				throw ["cannot compare x to y in compare function", x, y];
			}
		};
	};
	o.PriorityQueue.prototype.setCmp = function(lambda) {
		this.cmp = lambda;
	};
	o.PriorityQueue.prototype.expand = function () {
		this.maxLength *= 2;
		var eArray = new Array(this.maxLength);
		for (var i = 0; i < this.length; i++) {
			eArray[i] = this.array[i];
		}
		this.array = eArray;
	};
	o.PriorityQueue.prototype.enqueue = function (x) {
		var i = this.length;
		var cmp = this.cmp;
		if (i == this.maxLength) {
			this.expand();
		}
		var arr = this.array;
		arr[i] = x;
		while(i > 0) {
			if (cmp(arr[i], arr[parseInt(i/2)]) < 0) {
				var tmp = arr[i];
				arr[i] = arr[parseInt(i/2)];
				arr[parseInt(i/2)] = tmp;
			}
			i = parseInt(i/2);
		}
		this.length += 1;
	};
	o.PriorityQueue.prototype.dequeue = function () {
		var arr = this.array;
		var ret = arr[0];
		var cmp = this.cmp;
		arr[0] = arr[this.length - 1];
		arr[this.length - 1] = undefined;
		var i = 0;
		while (i < this.length) {
			if (arr[i*2 + 2] && cmp(arr[i], arr[i*2 + 2]) > 0 && cmp(arr[i*2 + 2], arr[i*2 + 1]) < 0) {
				var tmp = arr[i];
				arr[i] = arr[i*2 + 2];
				arr[i*2 + 2] = tmp;
				i = i*2 + 2;
			} else if (arr[i*2 +1] && cmp(arr[i], arr[i*2 + 1]) > 0) {
				var tmp = arr[i];
				arr[i] = arr[i*2 + 1];
				arr[i*2 + 1] = tmp;
				i = i * 2 + 1;
			} else {
				break;
			}
		}
		this.length -= 1;
		return ret;
	};
	o.PriorityQueue.prototype.isEmpty = function () {
		return this.length == 0;
	};
	return o;
})();