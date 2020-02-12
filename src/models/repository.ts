import * as mongoose from "mongoose";

export interface IRead<T> {
  findById: (id: string, callback: (error: any, result: T) => void) => void;
  retrieve: (callback: (error: any, result: T[]) => void) => void;
  findOne(cond?: Object, callback?: (err: any, res: T) => void);
  find(cond: Object, fields: Object, options: Object, callback?: (err: any, res: T[]) => void);
}

export interface IWrite<T> {
  create: (item: T, callback: (error: any, result: any) => void) => void;
  delete: (_id: string, callback: (error: any, result: any) => void) => void;
  update: (_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) => void;
}

export class Repository<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

  public _model: mongoose.Model<mongoose.Document>;

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this._model = schemaModel;
  }

  public retrieve(callback: (error: any, result: T[]) => void) {
    this._model.find({}, callback);
  }

  public findById(_id: string, callback: (error: any, result: T) => void) {
    this._model.findById(_id, callback);
  }

  public create(item: T, callback: (error: any, result: any) => void) {
    this._model.create(item, callback);
  }

  public findOne(cond?: Object, callback?: (err: any, res: T) => void) {
    return this._model.findOne(cond, callback);
  }

  public delete(_id: string, callback: (error: any, result: any) => void) {
    this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
  }

  public find(cond?: Object, fields?: Object, options?: Object, callback?: (err: any, res: T[]) => void) {
    return this._model.find(cond, options, callback);
  }

  public update(_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
    this._model.updateOne({ _id }, item, callback);
  }

  private toObjectId(_id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId.createFromHexString(_id);
  }
}