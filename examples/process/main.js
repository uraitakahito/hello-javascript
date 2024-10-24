console.log(process.argv);
const watchMode = process.argv.slice(2).includes('--watch');
console.log(watchMode);
