import { Router } from "express";
import { checkJwt } from "../security/login";
import { createProduct, listProduct, deleteProduct } from '../handlers/product.handler';

export function mountProductRoutes(router: Router) {
  router.post('/product', checkJwt, createProduct);
  router.get('/product', checkJwt, listProduct);
  router.delete('/product/:id', checkJwt, deleteProduct);
}