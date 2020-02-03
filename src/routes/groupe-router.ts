import { checkJwt } from "../security/login";
import { Router } from "express";
import { createGroup, listGroup, deleteGroup, getMemberDetails, updateGroup, addMember, deleteUserInGroup, getGroupById } from "../handlers/group.handlers";

export function mountGroupRoutes(router: Router) {
  router.post('/group', checkJwt, createGroup);
  router.get('/group', checkJwt, listGroup);
  router.delete('/group/:id', checkJwt, deleteGroup);
  router.get('/group/:id/members', checkJwt, getMemberDetails);
  router.put('/group/:id', checkJwt, updateGroup);
  router.put('/group/:groupId/member/:userId', checkJwt, addMember);
  router.delete('/group/:groupId/member/:userId', checkJwt, deleteUserInGroup);
  router.get('/group/:id', checkJwt, getGroupById);
}