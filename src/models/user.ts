import * as mongoose from 'mongoose';
import { Repository } from './repository';
var mongooseUniqueValidator = require('mongoose-unique-validator');

export interface IUserModel extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  firstName: string;
  creationDate: Date;
}

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
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
  },
  creationDate: {
    type: Date,
    required: true
  }
});
schema.plugin(mongooseUniqueValidator);

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

  public findUsersByIds(ids: string[], callback: (err: any, res: any) => void) {
    return this.find({ _id: { $in: ids } }, null, null, callback);
  }

}
