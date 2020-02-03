import { UserRepository, IUserModel } from "../models/user";
import { NextFunction } from "connect";
import * as jwt from 'jsonwebtoken';

const secretKey = "helloworld";

export function login(req: any, res: any) {
  const userRepository = new UserRepository();
  userRepository
    .find({ email: req.body.email, password: req.body.password })
    .exec((err, result: IUserModel[]) => {
      if (result.length) {
        const token = jwt.sign(
          {
            email: result[0].email,
            id: result[0].id
          },
          secretKey,
          {
            expiresIn: "1h"
          }
        )
        res.status(200).json({ token });
      } else {
        res.status(401).send();
      }
    });
}

export function getIdentity(req: any): Map<string, any> {
  const token = <string>req.headers["authorization"];
  const tokenDecode = jwt.decode(token);
  let identity = new Map();
  identity.set('id', tokenDecode['id']);
  identity.set('email', tokenDecode['email']);
  return identity;
}

export function checkJwt(req: any, res: any, next: NextFunction) {
  const token = <string>req.headers["authorization"];
  try {
    <any>jwt.verify(token, secretKey);
  } catch (err) {
    res.status(401).send();
    return;
  }
  next();
}