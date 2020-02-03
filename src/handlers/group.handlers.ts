import { GroupRepository, IGroupModel } from "../models/group";
import { UserRepository, IUserModel } from "../models/user";

export function createGroup(req: any, res: any) {
  const groupRepository = new GroupRepository();
  groupRepository.create(<IGroupModel>req.body, (err, group) => {
    if (err) {
      res.status(500).send({ err });
    } else {
      res.status(201).json({ group });
    }
  })
}

export function getGroupById(req: any, res: any) {
  const groupRepository = new GroupRepository();
  groupRepository.findById(req.params.id, (err, group) => {
    if (err) {
      res.status(500).send({ err });
    } else {
      res.status(200).json({ group });
    }
  });
}

export function addMember(req: any, res: any) {
  const groupRepository = new GroupRepository();
  groupRepository.addMember(req.params.groupId, req.params.userId, (err) => {
    if (err) {
      res.status(500).send({ err });
    } else {
      res.status(200).json();
    }
  });
}

export function deleteUserInGroup(req: any, res: any) {
  const groupRepository = new GroupRepository();
  groupRepository.removeMember(req.params.groupId, req.params.userId, (err) => {
    if (err) {
      res.status(500).send({ err });
    } else {
      res.status(200).json();
    }
  });
}

export function getMemberDetails(req: any, res: any) {
  const groupRepository = new GroupRepository();
  groupRepository.findById(req.params.id, (err, group: IGroupModel) => {
    if (err) {
      res.status(500).send({ err });
    } else {
      const userRepository = new UserRepository();
      userRepository.findUsersByIds(group.userIds, (err, users: IUserModel[]) => {
        if (err) {
          res.status(500).send({ err });
        } else {
          res.status(200).json({ users });
        }
      });
    }
  });
}

export function updateGroup(req: any, res: any) {
  const groupRepository = new GroupRepository();
  groupRepository.update(req.params.id, <IGroupModel>req.body, (err, result) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).send();
    }
  });
}

export function deleteGroup(req: any, res: any) {
  const groupRepository = new GroupRepository();
  groupRepository.delete(req.params.id, (err, result) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(204).send();
    }
  })
}

export function listGroup(req: any, res: any) {
  const groupRepository = new GroupRepository();
  groupRepository.retrieve((err, groups) => {
    if (err) {
      res.status(500).send({ err });
    } else {
      res.status(201).json({ groups });
    }
  })
}