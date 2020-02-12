import { OrderRepository, IOrderModel } from "../models/order";
import { getIdentity } from "../security/login";

export function listOrder(req: any, res: any) {
  const orderRepository = new OrderRepository();
  orderRepository.retrieve((err, orders) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).json({ orders });
    }
  })
}

export function deleteOrder(req: any, res: any) {
  const orderRepository = new OrderRepository();
  orderRepository.delete(req.params.id, (err) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).json({});
    }
  });
}

export function createOrder(req: any, res: any) {
  const orderRepository = new OrderRepository();
  const userClaims = getIdentity(req);
  req.body.creationDate = new Date();
  req.body.ownerID = userClaims.get('id');
  orderRepository.create(<IOrderModel>req.body, (err, order) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(201).json({ order });
    }
  })
}