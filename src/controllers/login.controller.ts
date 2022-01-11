import { compare } from "bcryptjs";
import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { createAccessToken } from "../auth";
import { User } from "../entity/User";
import { UserRequest } from "../types";
import { getSafeUserObject } from "../utils";

export const LoginController = {
  login: (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;
    User.findOne({email}, { relations: ['role'] }).then(async (user: User|undefined) => {
      if (!user) {
        return next(new Error('El usuario Y/O contraseña son incorrectos'));
      }
      const isValid = await compare(password, user.password)
      if (!isValid) {
        return next(new Error('El usuario Y/O contraseña son incorrectos'));
      } else {
        // TODO: Add last connection to the user
        const accessToken = createAccessToken(user);
        res.cookie('lbId', accessToken, { httpOnly: true });
        return res.status(200).json(getSafeUserObject(user));
      }
    });
  },
  async loggedUser(req: UserRequest, res: Response, next: NextFunction) {
    const {lbId: token} = req.cookies;
    try {
      if (!token) {
        throw new Error('Not Authorized');
      }
      const { userId } = verify(token, process.env.ACCESS_TOKEN_SECRET!) as { userId: number };
      const user = await User.findOne({id: userId}, {relations: ['role']});
      if (!user) {
        throw new Error('Not Authorized');
      }
      return res.status(200).json(getSafeUserObject(user));
    } catch(err) {
      return next(err);
    }
  },
  logout: (_: Request, res: Response) => {
    res.clearCookie("lbId");
    res.status(200).json({logout: true});
  },
};
