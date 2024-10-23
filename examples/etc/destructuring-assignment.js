var a = 1;
var b = 2;
var c = { d: 3 };
var d = 3;

console.log(a, b, c, d); // => 1 2 {d: 3} 3

function fullName({ first, last }) {
	return first + last;
}

console.log(fullName({ first: "John", last: "Doe" })); // => JohnDoe
