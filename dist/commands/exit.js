"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function default_1(caches) {
    // run the save function on all caches.
    console.log("Saving, do not close the app!");
    for (const cache of caches) {
        cache.saveData();
    }
    process.exit();
}
exports.default = default_1;
