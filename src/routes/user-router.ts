import { Router } from "express";
import { listUser, createUser, deleteUser, updateUser, login } from "../handlers/user.handlers";

export function mountUserRoutes(router: Router) {
    router.get('/user', listUser);
    router.post('/user', createUser);
    router.delete('/user/:id', deleteUser);
    router.put('/user', updateUser);
    router.post('/login', login)
}
