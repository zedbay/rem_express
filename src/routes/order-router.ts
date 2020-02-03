import { checkJwt } from "../security/login";
import { Router } from "express";
import { createOrder } from "../handlers/order.handlers";

export function mountGroupRoutes(router: Router) {
  router.post('/order', checkJwt, createOrder);
  // POST : create
  // DELETE : create
  // ORDER FOR USER
}