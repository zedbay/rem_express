import { UserRepository, IUserModel } from "../models/user";

export function listUser(req: any, res: any) {
  const userRepository = new UserRepository();
  userRepository.retrieve((err, users) => {
    res.status(200).json({ users });
  });
}

export function getUserById(req: any, res: any) {
  const userRepository = new UserRepository();
  userRepository.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).json({ user });
    }
  });
}

export async function createUser(req: any, res: any) {
  const userRepository = new UserRepository();
  userRepository.findUserByEmail(req.body.email).then((user) => {
    if (user) {
      res.status(500).json({ error: 'Email is already taken by user' });
    } else {
      userRepository.create(<IUserModel>req.body, (err, user) => {
        if (err) {
          res.status(500).send();
        } else {
          res.status(201).json({ user });
        }
      });
    }
  })

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
      res.status(500).send();
    } else {
      res.status(204).send();
    }
  });
}