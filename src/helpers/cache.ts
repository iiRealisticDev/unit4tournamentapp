import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
const folderDir = __dirname + "/../../data";

export class Cache<V> {
  private cache: Map<string, V>;
  private name: string;
  constructor(name: "event" | "individual" | "team") {
    this.name = name;
    // read all files in the data folder and load them into the cache
    const file = folderDir + `/${name}.json`;
    // read the file 
    if (existsSync(file)) {
      const jsonAsTxt = readFileSync(file, "utf-8");
      const data = JSON.parse(jsonAsTxt);
      const dataAsMap = new Map<string, V>(Object.entries(data));
      this.cache = new Map(dataAsMap);
      console.log(this.cache);
    } else {
      this.cache = new Map();
    }
  }
  public set(key: string, value: V) {
    this.cache.set(key, value);
  }
  public get(key: string) {
    return this.cache.get(key);
  }
  public has(key: string) {
    return this.cache.has(key);
  }
  public delete(key: string) {
    this.cache.delete(key);
  }
  public clear() {
    this.cache.clear();
  }
  public entries(): [string, V][]{
    return Array.from(this.cache.entries());
  }
  public forEach(callbackfn: (value: V, key: string, map: Map<string, V>) => void) {
    this.cache.forEach(callbackfn);
  }
  public size() {
    return this.cache.size;
  }
  public [Symbol.iterator]() {
    return this.cache[Symbol.iterator]();
  }
  public keys(): string[] {
    return Array.from(this.cache.keys());
  }
  public values(): V[] {
    return Array.from(this.cache.values());
  }
  public saveData() {
    // ensure that the directory exists
    try {
      if (!existsSync(folderDir)) {
        mkdirSync(folderDir);
      }

      console.log(this.cache.entries());
      console.log(JSON.stringify(this.cache.entries()));
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
    for (const [key, value] of this.cache.entries()) {
      console.log(key, value);
      
      if ((value as {name: string}).name == name) {
        return key;
      }
    }
  }
}