import userModel = require('../database/models/user.model');

export class GetUser {

    /**
     * get user from database by specified 'query' for example
     * {email: sample@email.com} return I_UserModel when email is equal to sample@email.com otherwise return null
     * @param query 
     */

    public by(query: {}): Promise<userModel.I_UserModel> {
        return new Promise((resolve) => {
            userModel.model.findOne(query, (err, doc) => {
                if (err) resolve(null);
                if (doc) resolve(doc);
                resolve(null);
            });
        })
    }

}