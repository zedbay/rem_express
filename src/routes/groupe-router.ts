import { createGroup, listGroup, deleteGroup, getMemberDetails, updateGroup, addMember, deleteUserInGroup, getGroupById } from "../handlers/group.handlers";
import { RemRouter } from "./router";

class GroupRouter extends RemRouter {

  public mountPublicRoutes() {

  }

  public mountPrivateRoutes() {

  }

  public mountAdministratorRoutes() {
    this.router.post('/group', createGroup);
    this.router.get('/group', listGroup);
    this.router.delete('/group/:id', deleteGroup);
    this.router.get('/group/:id/members', getMemberDetails);
    this.router.put('/group/:id', updateGroup);
    this.router.put('/group/:groupId/member/:userId', addMember);
    this.router.delete('/group/:groupId/member/:userId', deleteUserInGroup);
    this.router.get('/group/:id', getGroupById);
  }

}

export default new GroupRouter().getRouter();

