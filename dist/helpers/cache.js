"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
const fs_1 = require("fs");
const folderDir = __dirname + "/../../data"; // this is the data folder in relation to the current file
// export the Cache class, which will be used to store data in memory and save it to a file
// the <V> is a generic type, which means that the Cache class can store any type of data
class Cache {
    constructor(name) {
        this.name = name;
        // read all files in the data folder and load them into the cache
        const file = folderDir + `/${name}.json`;
        // read the file 
        if ((0, fs_1.existsSync)(file)) {
            // if the file exists, read it and parse it into a map
            const jsonAsTxt = (0, fs_1.readFileSync)(file, "utf-8");
            const data = JSON.parse(jsonAsTxt);
            const dataAsMap = new Map(Object.entries(data));
            // set the cache to the data
            this.cache = new Map(dataAsMap);
        }
        else {
            this.cache = new Map(); // if the file does not exist, create a new map
        }
    }
    set(key, value) {
        this.cache.set(key, value); // set a new key to the map
    }
    get(key) {
        return this.cache.get(key); // get a value from the map
    }
    has(key) {
        return this.cache.has(key); // check if the map has a key
    }
    delete(key) {
        this.cache.delete(key); // delete a key from the map
    }
    clear() {
        this.cache.clear(); // clear the map
    }
    entries() {
        return Array.from(this.cache.entries()); // get all the entries in the map
    }
    forEach(callbackfn) {
        this.cache.forEach(callbackfn); // run a function on each entry in the map
    }
    size() {
        return this.cache.size; // get the size of the map
    }
    [Symbol.iterator]() {
        return this.cache[Symbol.iterator](); // get an iterator for the map
    }
    keys() {
        return Array.from(this.cache.keys()); // get all the keys in the map
    }
    values() {
        return Array.from(this.cache.values()); // get all the values in the map
    }
    saveData() {
        // ensure that the directory exists
        try {
            if (!(0, fs_1.existsSync)(folderDir)) {
                (0, fs_1.mkdirSync)(folderDir);
            }
            // convert the map to an array, then to an object, then to a string, then save it to a file
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
        // get the key from the name
        for (const [key, value] of this.cache.entries()) {
            if (value.name == name) {
                return key;
            }
        }
    }
}
exports.Cache = Cache;
