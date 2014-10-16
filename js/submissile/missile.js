function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
};
var now, dt, last = timestamp();
function frame() {
	now = timestamp();
	dt = (now - last) / 1000;
	update(dt);
	render(dt);
	last = now;
	requestAnimationFrame(frame);
}