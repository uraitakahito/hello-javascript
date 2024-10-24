// https://note.shiftinc.jp/n/nfb09d6efa4d8
/* eslint-disable no-unused-vars */
import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  format: format.simple(),
  transports: [new transports.File({ filename: 'signal_example.log' })],
});
const sleep = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

let receivedSignal = null;

const main = async () => {
  const hrstart = process.hrtime();
  for (let i = 0; i < 100; i += 1) {
    logger.info(i);
    await sleep(500);

    if (receivedSignal) {
      break;
    }
  }

  const hrend = process.hrtime(hrstart);
  console.info(`Execution time : ${hrend} sec`);
};
(async () => {
  await main();
})();

console.log('process ID: ', process.pid);

const exit = (signal) => {
  receivedSignal = signal;
  console.log(`signal ${signal} received`);
  console.log('now shut donw ... please wait');
};

process.on('SIGHUP', () => {
  exit('SIGHUP');
});

process.on('SIGINT', () => {
  exit('SIGINT');
});

process.on('SIGTERM', () => {
  exit('SIGTERM');
});
