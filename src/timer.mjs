var timer = (name) => {
	var start = performance.now();
	return {
		stop: () => {
			var end = performance.now();
			var time = end - start;
			console.log("Timer:", name, "finished in", time, "ms");
		},
	};
};

var t = timer("Some label");

for (let i = 0; i < 1000000; i++) {
	//
}

t.stop(); // prints the time elapsed to the js console
