import * as mongoose from 'mongoose';
import { Repository } from './repository';
var mongooseUniqueValidator = require('mongoose-unique-validator');

export interface IGroupModel extends mongoose.Document {
  name: string;
  userIds: string[]
}

const schema = new mongoose.Schema({
  userIds: {
    type: Array,
    required: false,
    default: []
  },
  name: {
    type: String,
    required: true,
    unique: true
  }
});
schema.plugin(mongooseUniqueValidator);

export const GroupSchema = mongoose.model<IGroupModel>('group', schema, 'group', true);

export class UserModel {

  private _groupModel: IGroupModel;

  constructor(groupModel: IGroupModel) {
    this._groupModel = groupModel;
  }

}

export class GroupRepository extends Repository<IGroupModel> {

  constructor() {
    super(GroupSchema);
  }

  public addMember(_id: string, userId: string, callBack: (err: any, res: any) => void) {
    this._model.updateOne({ _id }, { $addToSet: { userIds: userId } }, callBack);
  }

  public removeMember(_id: string, userId: string, callBack: (err: any, res: any) => void) {
    this._model.updateOne({ _id }, { $pull: { userIds: userId } }, callBack);
  }

  public findUserGroup(userId: string, callBack: (err: any, res: any) => void) {
    this.find({ userIds: userId }, null, null, callBack);
  }

  public addUserInMemberGroup(userId: string) {
    this.findOne({ name: 'User' }, (err, group) => {
      this.addMember(group._id, userId, () => { console.log('Amazing: new user') });
    });
  }

}