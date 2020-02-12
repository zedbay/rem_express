import { createOrder, listOrder, deleteOrder } from "../handlers/order.handlers";
import { RemRouter } from "./router";

class OrderRouter extends RemRouter {

  public mountPublicRoutes() {

  }

  public mountPrivateRoutes() {
    this.router.post('/order', createOrder);
  }

  public mountAdministratorRoutes() {
    this.router.get('/order', listOrder);
    this.router.delete('/order/:id', deleteOrder);
  }

}

export default new OrderRouter().getRouter();