import * as mongoose from 'mongoose';
import { Repository } from './repository';

export interface IUserModel extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  firstName: string;
}

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  firstName: {
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

}

export class UserRepository extends Repository<IUserModel> {

  constructor() {
    super(UserSchema);
  }

  public findUserByEmail(email: string) {
    return this.findOne({ email });
  }

}
