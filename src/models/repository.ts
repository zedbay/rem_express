import * as mongoose from "mongoose";

export interface IRead<T> {
    findById: (id: string, callback: (error: any, result: T) => void) => void;
}

export interface IWrite<T> {
    create: (item: T, callback: (error: any, result: any) => void) => void;
}

export class Repository<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }

    public findById(_id: string, callback: (error: any, result: T) => void) {
        this._model.findById(_id, callback);
    }

    public create(item: T, callback: (error: any, result: any) => void) {
        this._model.create(item, callback);
    }


}