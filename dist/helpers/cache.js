"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
const fs_1 = require("fs");
const folderDir = __dirname + "../data";
class Cache {
    constructor(name) {
        this.cache = new Map();
        this.name = name;
    }
    set(key, value) {
        this.cache.set(key, value);
    }
    get(key) {
        return this.cache.get(key);
    }
    has(key) {
        return this.cache.has(key);
    }
    delete(key) {
        this.cache.delete(key);
    }
    clear() {
        this.cache.clear();
    }
    entries() {
        return this.cache.entries();
    }
    keys() {
        return this.cache.keys().next().value;
    }
    values() {
        return this.cache.values().next().value;
    }
    forEach(callbackfn) {
        this.cache.forEach(callbackfn);
    }
    size() {
        return this.cache.size;
    }
    [Symbol.iterator]() {
        return this.cache[Symbol.iterator]();
    }
    saveData() {
        (0, fs_1.writeFileSync)(folderDir + `/${this.name}.json`, JSON.stringify([...this.cache]));
    }
}
exports.Cache = Cache;
