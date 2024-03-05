import { existsSync, readFileSync, writeFileSync } from "fs";
const folderDir = __dirname + "../data";

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
      this.cache = new Map(data);
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
  public entries() {
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
  public keys() {
    return Array.from(this.cache.keys());
  }
  public values() {
    return Array.from(this.cache.values());
  }
  public saveData() {
    writeFileSync(folderDir + `/${this.name}.json`, JSON.stringify([...this.cache]));
  }
}