import routeModel = require('../database/models/route-model');

export class QueueSync<T>{
    public array: T[];
    public index: number;
    private func: (param: T, next: QueueSync<T>) => void;

    constructor(func: (param: T, next: QueueSync<T>) => void) {
        this.func = func;
    }

    public set(array: T[]) {
        this.array = array;
        this.index = -1;
    }

    public next() {
        this.index++;
        this.func(this.array[this.index], this);
    }

    public hasNext(): boolean {
        if (this.index < this.array.length) return true;
        return false;
    }

}

interface I_RegRoutes {
    id: string,
    route: string,
    regRoute: RegExp,
    method: string
}

export class RouteDispatcher {
    private post: I_RegRoutes[] = [];
    private get: I_RegRoutes[] = [];
    private delete: I_RegRoutes[] = [];
    private put: I_RegRoutes[] = [];

    public static routes: I_RegRoutes[] = [];

    /**
     * get request path and parse it for server path example:
     * /api/user/1/john
     * /api/user/:id
     * @param path 
     */
    public parse(path: string, method: string): string {
        switch (method) {
            case 'post':
                for (let el of this.post) {
                    if (el.regRoute.test(path)) return el.route;
                }
                break;

            case 'get':
                for (let el of this.get) {
                    if (el.regRoute.test(path)) return el.route;
                }
                break;

            case 'delete':
                for (let el of this.delete) {
                    if (el.regRoute.test(path)) return el.route;
                }
                break;

            case 'put':
                for (let el of this.put) {
                    if (el.regRoute.test(path)) return el.route;
                }
                break;
        }

        return null;
    }

    /**
     * register specified method routes
     */

    public register(method: string): Promise<I_RegRoutes[]> {
        switch (method) {
            case 'post':
                return new Promise(resolve => {
                    var queue = this.getQueueSync(resolve);
                    queue.set(this.post);
                    queue.next();
                });


            case 'get':
                return new Promise(resolve => {
                    var queue = this.getQueueSync(resolve);
                    queue.set(this.get);
                    queue.next();
                });


            case 'delete':
                return new Promise(resolve => {
                    var queue = this.getQueueSync(resolve);
                    queue.set(this.delete);
                    queue.next();
                });

            case 'put':
                return new Promise(resolve => {
                    var queue = this.getQueueSync(resolve);
                    queue.set(this.put);
                    queue.next();
                });
        }
    }

    /**
     * create and return QueueSync Object
     * @param resolve 
     */

    private getQueueSync(resolve: any): QueueSync<I_RegRoutes> {
        var queue = new QueueSync<I_RegRoutes>((data, iter) => {
            if (iter.hasNext()) {
                this.isExist(data.route, data.method).then(result => {
                    if (result == null) this.addToDatabase(data.route, data.method).then((resultData) => {
                        data.id = resultData._id;
                        RouteDispatcher.routes.push(data);
                        iter.next();
                    });
                    else {
                        data.id = result._id;
                        RouteDispatcher.routes.push(data);
                        iter.next();
                    }

                });
            } else {
                resolve(queue.array);
            }
        });
        return queue;
    }

    /**
     * Resolve all methods
     */
    public registerAll(): Promise<any> {
        return new Promise(resolve => {
            this.register('get').then((getResult) => {
                this.register('post').then(() => {
                    this.register('delete').then(() => {
                        this.register('put').then(() => {
                            resolve('');
                        })
                    })
                })
            })
        });
    }

    /**
     * check is routes exist in database when is exist return it otherwise return null
     * @param path 
     */

    private isExist(path: string, method: string): Promise<routeModel.I_RouteModel> {
        return new Promise(resolve => {
            routeModel.model.findOne({ path: path, method: method }, (err, doc) => {
                if (err) throw new Error(err);
                resolve(doc);
            })
        })
    }

    /**
     * add route to database and return product or null
     * @param path 
     */

    private addToDatabase(path: string, method: string): Promise<routeModel.I_RouteModel> {
        return new Promise(resolve => {
            var model = new routeModel.model({ path: path, method: method });

            model.save((err, product) => {
                if (err) throw err;
                resolve(product);
            });
        });
    }

    /**
     * add route string as RegExp
     * @param routes 
     */

    public add(route: string, regExp: RegExp, method: string) {
        switch (method) {
            case 'post':
                this.post.push(this.createrRegRoutes(route, regExp, method));
                break;

            case 'get':
                this.get.push(this.createrRegRoutes(route, regExp, method));
                break;

            case 'delete':
                this.delete.push(this.createrRegRoutes(route, regExp, method));
                break;

            case 'put':
                this.put.push(this.createrRegRoutes(route, regExp, method));
                break;
        }
    }
    /**
     * create I_RegRoutes object
     * @param route 
     * @param regRoute 
     * @param method 
     */
    private createrRegRoutes(route: string, regRoute: RegExp, method: string, id?: string): I_RegRoutes {
        return { id: id, route: route, regRoute: regRoute, method: method };
    }

    /**
     * get all routes from database
     */
    private getAll(): Promise<I_RegRoutes[]> {
        return new Promise(resolve => {
            routeModel.model.find({}, (err, doc) => {
                if (err) throw err;
                resolve(doc);
            });
        });
    }

    public static routePathToID(path: string, method: string): string {
        return RouteDispatcher.routes.find(el => el.route == path && el.method == method).id;
    }

}
