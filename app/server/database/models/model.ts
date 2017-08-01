import {MongooseModel} from './mongoose-model';

export class Model extends MongooseModel {

    public add(ob: any) {
        throw new Error('Method not implemented.');
    }


    public getTxt(): string {
        return "from Model";
    }

    public Create() {
       
    }





}


// import { Database } from "../database";

// export class UserModel {
//     public static Model;

//     private constructor() {}

//     public static add(ob : any)
//     {
//         if( UserModel.Model == null )
//             UserModel.Model = UserModel.Create();

//         var req = new UserModel.Model(ob);
//         UserModel.save(req);
//     }

//     private static Create() {
//         var schema = Database.mongoose.Schema({
//             id: Database.mongoose.Schema.Types.ObjectId,
//             RegisterDate: Date,
//             name: String,
//             password: String,
//             email: String
//         });
//         return Database.mongoose.model("Users", schema, "users");
//     }


//     private static save(req : any)
//     {
//         req.save((err, reg) => {
//             console.log('error db: ' + err);
//         });
//     }
//}