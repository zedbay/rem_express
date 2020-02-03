import { Router } from "express";
import { listUser, createUser, deleteUser, updateUser, getUserById, getGroupForUser } from "../handlers/user.handlers";
import { login, checkJwt } from "../security/login";

export function mountUserRoutes(router: Router) {
  router.get('/user', checkJwt, listUser);
  router.get('/user/:id', checkJwt, getUserById);
  router.post('/user', createUser);
  router.delete('/user/:id', checkJwt, deleteUser);
  router.put('/user/:id', checkJwt, updateUser);
  router.post('/login', login);
  router.get('/user/:id/group', checkJwt, getGroupForUser);
}
