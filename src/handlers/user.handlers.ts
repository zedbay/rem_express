import { UserRepository, IUserModel } from "../models/user";
import { GroupRepository, IGroupModel } from "../models/group";

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
  req.body.creationDate = new Date();
  userRepository.create(<IUserModel>req.body, (err, user) => {
    if (err) {
      res.status(500).send();
    } else {
      const groupRepository = new GroupRepository();
      groupRepository.addUserInMemberGroup(user._id.toString());
      res.status(200).json({ user });
    }
  });
}

export function getGroupForUser(req: any, res: any) {
  const groupRepository = new GroupRepository();
  groupRepository.findUserGroup(req.params.id, (err, groups: IGroupModel[]) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).json({ groups });
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
      res.status(500).send();
    } else {
      res.status(204).send();
    }
  });
}