import { Router } from "express";
import { checkJwt, isAdmin } from "../security/login";

export abstract class RemRouter {

  protected router: Router;

  constructor() {
    this.router = Router();
    this.mountPublicRoutes();
    this.router.use(checkJwt);
    this.mountPrivateRoutes();
    this.router.use(isAdmin);
    this.mountAdministratorRoutes();
  }

  abstract mountPublicRoutes(): void;
  abstract mountPrivateRoutes(): void;
  abstract mountAdministratorRoutes(): void;

  public getRouter(): Router {
    return this.router;
  }

}