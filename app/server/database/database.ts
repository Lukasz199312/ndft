import { Mongoose } from "mongoose";
import { AuthDatabaseConfig } from './auth-database.config';
//import { MongoosePromise<T> } from "mongoose-promise";

     
export class Database {
    public static mongoose: Mongoose;
    public static connection;

    public static Bootstrap(callback?) {
        console.log("*****************************_*************************");
        console.log(Database.mongoose);
        Database.mongoose = new Mongoose();
        Database.mongoose.connect(AuthDatabaseConfig.getNoAuthorizationAdress());

        Database.connection = Database.mongoose.connection;
        Database.mongoose.Promise = global.Promise;
        
        Database.connection.on('error', console.error.bind(console, 'connection error: '));
        Database.connection.once('open', () => {
         if(callback === undefined) return;
         callback();
        });
    }

    public registerUser(regUser) {
        // var registermodel = new UserModel().get();
        // console.log("userName " + regUser.name);
        // var reg = new registermodel({
        //     name: regUser.name,
        //     date: new Date().toLocaleDateString(),
        // });

        // reg.save((err, reg) => {
        //     console.log('error db: ' + err);
        // });
        
 
    }


}