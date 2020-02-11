import { createProduct, listProduct, deleteProduct } from '../handlers/product.handler';
import { RemRouter } from "./router";

class ProductRouter extends RemRouter {

  public mountPublicRoutes() {
    this.router.get('/product', listProduct);
  }

  public mountPrivateRoutes() {

  }

  public mountAdministratorRoutes() {
    this.router.post('/product', createProduct);
    this.router.delete('/product/:id', deleteProduct);
  }

}

export default new ProductRouter().getRouter();