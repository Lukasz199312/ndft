interface I_Dictionary<T> {
    [index: string]: T;
}

export class Dictionary<T> {
    private array: I_Dictionary<T> = {};
    private keys: string[] = [];
    private _count: number = 0;

    /**
     *  add element to list
     */
    public add(name: string, value: T) {
        if (this.get(name) == null) {
            this.array[name] = value;
            this.keys.push(name);
            this._count++;
        }
        else
            this.array[name] = value;
    }

    /**
    *  get element from collection
    */

    public get(name: string): T {
        var res = this.array[name];
        if (res === undefined) res = null;

        return res;
    }

    /**
     *  Number of element in collection 
     */

    public count(): number {
        return this._count;
    }

    /**
     *  return all keys list from collection
     */
    public keysList(): string[] {
        return this.keys;
    }

    /**
     * remove all items from collection
     */

    public empty() {
        this.keys = new Array<string>(0);
        this._count = 0;
        this.array = {};
    }
}