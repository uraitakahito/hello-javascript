// https://github.com/apify/crawlee/blob/fb2c5cdaa47e2d3a91ade726cfba3091917a0137/packages/utils/src/internals/memory-info.ts#L53
import util from 'node:util';
import psTree from '@apify/ps-tree';

const psTreePromised = util.promisify(psTree);
const processes = await psTreePromised(process.pid, true);

console.log(processes);
