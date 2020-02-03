import { OrderRepository, IOrderModel } from "../models/order";

export function createOrder(req: any, res: any) {
  const orderRepository = new OrderRepository();
  req.body.creationDate = new Date();
  orderRepository.create(<IOrderModel>req.body, (err, order) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(201).json({ order });
    }
  })
}