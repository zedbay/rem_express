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

    public static findByEmail(email: string) : Promise<IUserModel> {
        const p = new Promise<IUserModel>((resolve, reject) => {
            const repo = new UserRepository();
            repo.find({ email }).exec((err, res) => {
                if (err) { reject(err); }
                else {
                    if (res.length) {
                        resolve(res[0] as IUserModel);
                    }
                    else {
                        resolve(null);
                    }
                }
            })
        });
        return p;
    }
}

export class UserRepository extends Repository<IUserModel> {

    constructor() {
        super(UserSchema);
    }
} 
