// /**Register-module */
// import { RegisterModule } from '../auth-module/register-module/register.module';
// /**Auth-components */
// import { EmailSyntaxVerificationComponent } from '../auth-module/components/email-syntax-verification.component';
// import { PasswordSyntaxVerification } from '../auth-module/components/password-syntax-verification.component';
// import { PassMD5Component } from '../auth-module/components/pass-md5.component';
// import { NameSyntaxVerification } from '../auth-module/components/name-syntax-verification.component';
// import { GenerateSecretCodeComponent } from '../auth-module/components/generate-secret-code.component';
// //**Verification-mail-module */
// import { VerificationMailModule } from '../auth-module/verification-mail-module/verification-mail.module';
// //**basic-module */
// import { ActionModule } from './action.module';
// import { Component } from '../basic-module/component';
// import { Module } from '../basic-module/module';
// import { ActionPermissionModule } from "./action-permission.module";
// /**database-module */
// import { DatabaseQueryComponent } from '../database/components/database.query.component';
// //**Other */
// import { Salt } from '../salt';
// import { User } from "../user/user";


// export class FactoryModules {
//     private user: User;
//     private permissionDenied: (user: User) => void;

//     public get(name: String, callback: (data) => void = null): Component<Module> {

//         switch (name) {
//             case "Register":
//                 return this.MakeRegisterModule(callback);
//             case "VerificationCode":
//                 return this.MakeVerificationCodeModule(callback);
//             case "Login":
//                 return this.MakeLoginModule(callback);
//         }

//         return null;
//     }

//     /**
//      * set callback call when refusing access
//      */

//     public whenFail(permissionDenied: (user: User) => void) {
//         this.permissionDenied = permissionDenied;
//     }

//     /**
//      * set current user
//      */

//     public setUser(user: User): FactoryModules {
//         console.log('USER: ' +  user);
//         this.user = user;
//         return this;
//     }

//     /**
//      *  Register new User
//      */
//     public MakeRegisterModule(callback): Component<Module> {
//         var reg = new RegisterModule();

//         reg.name = "RegisterModule";
//         if (reg.checkPermission(this.user) == false) {
//             this.permissionDenied(this.user);
//             return;
//         }

//         if (callback != null)
//             reg.applyCallback(callback);

//         var Query = new DatabaseQueryComponent(reg).addModel(UserModel.get().Model);
//         Query.addCallback(function (data, executeNext, model: any) {
//             model.find({ name: data.name, email: data.email }, function (err, doc) {

//                 if (doc.length > 0) data.databaseQuery = false;
//                 else data.databaseQuery = true;

//                 executeNext.execute(data);
//             }).limit(1);
//         });

//         var Hash = new PassMD5Component(Query);
//         Hash.addCallback(function (data, executeNext, md5) {
//             md5.Hash(data, "password", Salt.password);
//             executeNext.execute(data);
//         });

//         var component: any = new EmailSyntaxVerificationComponent(Hash);
//         component = new GenerateSecretCodeComponent(component);
//         component = new PasswordSyntaxVerification(component);
//         component = new NameSyntaxVerification(component);

//         return component;
//     }

//     /**
//      * verifies email send to registered user
//      */

//     public MakeVerificationCodeModule(callback): Component<Module> {
//         var verification = new ActionPermissionModule();

//         console.log(this.user);
//         verification.name = "VerificationCode";

//         if (verification.checkPermission(this.user) == false) {
//             this.permissionDenied(this.user);
//             return;
//         }

//         if (callback != null)
//             verification.applyCallback(callback);

//         var Query = new DatabaseQueryComponent(verification);
//         Query.addCallback(function (data, executeNext) {
//             var model = UserModel.get().Model;
//             model.update({ name: data.name, VerificationCode: data.verificationCode }, { $set: { isActive: true }, $unset: { expires: "" } }, function (err, raw) {
//                 if (raw.nModified <= 0) data.queryResult = false;

//                 executeNext.execute(data);
//             });
//         });

//         var component = new NameSyntaxVerification(Query);
//         return component;

//     }

//     /**
//      * Log in user
//      */

//     public MakeLoginModule(callback): Component<Module> {
//         var action = new ActionPermissionModule();
//         action.name = "LoginModule";
//         var document:any;

//         if (action.checkPermission(this.user) == false) {
//             this.permissionDenied(this.user);
//             return;
//         }

//         if (callback != null)
//             action.applyCallback(callback);

//         var queue = new DatabaseQueryComponent(action);

//         queue.addCallback((data, executeNext) => {
//             var model = UserModel.get().Model;
//             model.findOne({ $or: [{ name: data.name }, { email: data.email }, { displayName: data.displayName }], password: data.password }, (err, doc) => {
//                 console.log(doc);
//                 if (doc == null) return;
//                 data.userDocument = doc;
//                 console.log(data);
//             });

//             executeNext.execute(data);

//         });

//         var Hash = new PassMD5Component(queue);
//         Hash.addCallback(function (data, executeNext, md5) {
//             md5.Hash(data, "password", Salt.password);
//             executeNext.execute(data);
//         });

//         var component = new NameSyntaxVerification(Hash);
//         var pass_component = new PasswordSyntaxVerification(component);
//         var email_compponent = new EmailSyntaxVerificationComponent(pass_component);


//         return email_compponent;

//     }
// }