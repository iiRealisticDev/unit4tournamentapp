import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
const folderDir = __dirname + "/../../data"; // this is the data folder in relation to the current file

// export the Cache class, which will be used to store data in memory and save it to a file
// the <V> is a generic type, which means that the Cache class can store any type of data
export class Cache<V> {
  private cache: Map<string, V>; // this is the cache - it is a map (which is key-value pairs) of strings to the generic type V
  private name: string; // this is the name of the cache, which will be used to save the file to the correct location
  constructor(name: "event" | "individual" | "team") {
    this.name = name;
    // read all files in the data folder and load them into the cache
    const file = folderDir + `/${name}.json`;
    // read the file 
    if (existsSync(file)) {
      // if the file exists, read it and parse it into a map
      const jsonAsTxt = readFileSync(file, "utf-8");
      const data = JSON.parse(jsonAsTxt);
      const dataAsMap = new Map<string, V>(Object.entries(data));
      // set the cache to the data
      this.cache = new Map(dataAsMap);
    } else {
      this.cache = new Map(); // if the file does not exist, create a new map
    }
  }
  public set(key: string, value: V) {
    this.cache.set(key, value); // set a new key to the map
  }
  public get(key: string) {
    return this.cache.get(key); // get a value from the map
  }
  public has(key: string) {
    return this.cache.has(key); // check if the map has a key
  }
  public delete(key: string) {
    this.cache.delete(key); // delete a key from the map
  }
  public clear() {
    this.cache.clear(); // clear the map
  }
  public entries(): [string, V][]{
    return Array.from(this.cache.entries()); // get all the entries in the map
  }
  public forEach(callbackfn: (value: V, key: string, map: Map<string, V>) => void) {
    this.cache.forEach(callbackfn); // run a function on each entry in the map
  }
  public size() {
    return this.cache.size; // get the size of the map
  }
  public [Symbol.iterator]() {
    return this.cache[Symbol.iterator](); // get an iterator for the map
  }
  public keys(): string[] {
    return Array.from(this.cache.keys()); // get all the keys in the map
  }
  public values(): V[] {
    return Array.from(this.cache.values()); // get all the values in the map
  }
  public saveData() {
    // ensure that the directory exists
    try {
      if (!existsSync(folderDir)) {
        mkdirSync(folderDir);
      }
      // convert the map to an array, then to an object, then to a string, then save it to a file
      const cacheArray = Array.from(this.cache.entries());
      const mappedArray = cacheArray.map((x) => [x[0], x[1]]);
      // use x[0] as the key and x[1] as the value
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: Record<any, any> = {}; // using explicit anys as other methods cause breaks
      for (const [key, value] of mappedArray) {
        data[key] = value;
      }
      writeFileSync(folderDir + `/${this.name}.json`, JSON.stringify(data));
    } catch (e) {
      console.error("Could not save data to file! Please ensure that this program is in a location where it can save files, or being ran as admin.");
      console.error(e);
    }
  }
  public getKeyFromName(name: string) {
    // get the key from the name
    for (const [key, value] of this.cache.entries()) {
      
      if ((value as {name: string}).name == name) {
        return key;
      }
    }
  }
}