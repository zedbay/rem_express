import * as mongoose from 'mongoose';
import { Repository } from './repository';

export interface IUserModel extends mongoose.Document {
    email: string;
    password: string;
}

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export const UserSchema = mongoose.model<IUserModel>('user', schema, 'user', true);

export class UserModel {

    private _userModel: IUserModel;

    constructor(userModel: IUserModel) {
        this._userModel = userModel;
    }

    public getEmail(): string {
        return this._userModel.email;
    }

    public static createUser(email: string, password: string): Promise<IUserModel> {
        const p = new Promise<IUserModel>((resolve, reject) => {
            const repo = new UserRepository();
            const user = <IUserModel>{ email, password };
            repo.create(user, (err, res) => {
                if (err) { reject(); }
                else { resolve(res); }
            });
        });
        return p;
    }
}

export class UserRepository extends Repository<IUserModel> {

    constructor() {
        super(UserSchema);
    }
} 
