import * as mongoose from 'mongoose';
import { Repository } from './repository';

export interface IOrderModel extends mongoose.Document {
  ownerID: string;
  creationDate: string;
  status: number;
  products: { productId: string, quantity: number, price: number }[];
  amount: number;
}

const schema = new mongoose.Schema({
  ownerID: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    required: true
  },
  status: {
    type: Number,
    required: false,
    default: 0
  },
  amount: {
    type: Number,
    required: true
  },
  products: {
    type: [{
      productId: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }],
    required: true
  }
});

export const OrderSchema = mongoose.model<IOrderModel>('order', schema, 'order', true);

export class OrderRepository extends Repository<IOrderModel> {

  constructor() {
    super(OrderSchema);
  }

}