import { createProduct, listProduct, deleteProduct, getProduct } from '../handlers/product.handler';
import { RemRouter } from "./router";

class ProductRouter extends RemRouter {

  public mountPublicRoutes() {
    this.router.get('/product', listProduct);
    this.router.get('/product/:id', getProduct);
  }

  public mountPrivateRoutes() {

  }

  public mountAdministratorRoutes() {
    this.router.post('/product', createProduct);
    this.router.delete('/product/:id', deleteProduct);
  }

}

export default new ProductRouter().getRouter();