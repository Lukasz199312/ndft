export class MongooseModel {
    public Model: any;

    public remove(ob) {
        this.Model.remove(ob, function (err) {
            if (err) return new Error(err);
        });
    }

    protected save(req: any) {
        req.save((err, reg) => {
            console.log('error db: ' + err);
        });
    }
}