export class AuthDatabaseConfig {
    private static user: '';
    private static password: '';
    public static db_name:string =  'ndft';
    private static addres:string = 'mongodb://localhost/';

    public static getNoAuthorizationAdress():string {
        return AuthDatabaseConfig.addres + AuthDatabaseConfig.db_name;
    }

    public static getAuthorizationAdress() {
        throw new Error("NotImplementException");
    }
}