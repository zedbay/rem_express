import { listUser, createUser, deleteUser, updateUser, getUserById, getGroupForUser } from "../handlers/user.handlers";
import { login } from "../security/login";
import { RemRouter } from "./router";

class UserRouter extends RemRouter {

  public mountPublicRoutes() {
    this.router.post('/login', login);
    this.router.post('/user', createUser);
  }

  public mountPrivateRoutes() {

  }

  public mountAdministratorRoutes() {
    this.router.get('/user', listUser);
    this.router.get('/user/:id', getUserById);
    this.router.delete('/user/:id', deleteUser);
    this.router.put('/user/:id', updateUser);
    this.router.get('/user/:id/group', getGroupForUser);
  }

}

export default new UserRouter().getRouter();


