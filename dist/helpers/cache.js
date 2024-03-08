"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
const fs_1 = require("fs");
const folderDir = __dirname + "/../../data";
class Cache {
    constructor(name) {
        this.name = name;
        // read all files in the data folder and load them into the cache
        const file = folderDir + `/${name}.json`;
        // read the file 
        if ((0, fs_1.existsSync)(file)) {
            const jsonAsTxt = (0, fs_1.readFileSync)(file, "utf-8");
            const data = JSON.parse(jsonAsTxt);
            const dataAsMap = new Map(Object.entries(data));
            this.cache = new Map(dataAsMap);
            console.log(this.cache);
        }
        else {
            this.cache = new Map();
        }
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
        return Array.from(this.cache.entries());
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
    keys() {
        return Array.from(this.cache.keys());
    }
    values() {
        return Array.from(this.cache.values());
    }
    saveData() {
        // ensure that the directory exists
        try {
            if (!(0, fs_1.existsSync)(folderDir)) {
                (0, fs_1.mkdirSync)(folderDir);
            }
            console.log(this.cache.entries());
            console.log(JSON.stringify(this.cache.entries()));
            const cacheArray = Array.from(this.cache.entries());
            const mappedArray = cacheArray.map((x) => [x[0], x[1]]);
            // use x[0] as the key and x[1] as the value
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data = {}; // using explicit anys as other methods cause breaks
            for (const [key, value] of mappedArray) {
                data[key] = value;
            }
            (0, fs_1.writeFileSync)(folderDir + `/${this.name}.json`, JSON.stringify(data));
        }
        catch (e) {
            console.error("Could not save data to file! Please ensure that this program is in a location where it can save files, or being ran as admin.");
            console.error(e);
        }
    }
    getKeyFromName(name) {
        for (const [key, value] of this.cache.entries()) {
            // @ts-ignore
            if (value.name == name) {
                return key;
            }
        }
    }
}
exports.Cache = Cache;
