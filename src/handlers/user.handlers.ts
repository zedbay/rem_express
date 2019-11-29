import { UserRepository, IUserModel, UserModel } from "../models/user";

export function listUser(req: any, res: any)  {
    const userRepository = new UserRepository();
    userRepository.retrieve((err, users) => {
        res.status(200).json({ users });
    });
}

export async function createUser(req: any, res: any) {
    const user: IUserModel = await UserModel.createUser(req.body.email, req.body.password);
    res.status(201).json({ user });
}

export function updateUser(req: any, res: any) {
    res.status(200);
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