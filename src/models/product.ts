import * as mongoose from 'mongoose';
import { Repository } from './repository';
var mongooseUniqueValidator = require('mongoose-unique-validator');

export interface IProductModel extends mongoose.Document {
  name: string;
  price: number;
}

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  }
});
schema.plugin(mongooseUniqueValidator);

export const ProductSchema = mongoose.model<IProductModel>('product', schema, 'product', true);

export class ProductRepository extends Repository<IProductModel> {

  constructor() {
    super(ProductSchema);
  }

}