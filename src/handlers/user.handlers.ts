import { UserRepository, IUserModel, UserModel } from "../models/user";
import { getIdentity } from "../security/login";

export function listUser(req: any, res: any)  {
    const userRepository = new UserRepository();
    userRepository.retrieve((err, users) => {
        res.status(200).json({ users });
    });
}

export async function createUser(req: any, res: any) {
    const userRepository = new UserRepository();
    userRepository.create(<IUserModel>req.body, (err, user) => {
        if (err) {
            res.status(500).send();
        } else {
            res.status(201).json({ user });
        }
    });
}

export function updateUser(req: any, res: any) {
    const userRepository = new UserRepository();
    userRepository.update(req.params.id, <IUserModel>req.body, (err, user) => {
        if (err) {
            res.status(500).send();
        } else {
            res.status(200).send();
        }
    });
}

export function deleteUser(req: any, res: any) {
    const userRepository = new UserRepository();
    userRepository.delete(req.params.id, (err, result) => {
        if (err) { 
            res.status(500); 
        } else {
            res.status(204);
        }
    });
}