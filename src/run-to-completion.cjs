// https://meetup-jp.nhncloud.com/896
function delay() {
	for (var i = 0; i < 100000; i++);
}
function foo() {
	delay();
	bar();
	console.log("foo!"); // (3)
}
function bar() {
	delay();
	console.log("bar!"); // (2)
}
function baz() {
	console.log("baz!"); // (4)
}
setTimeout(baz, 10); // (1)
foo();
