import jwt from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";
import { HttpStatusCode } from "../../helper/contants/enums";
import { StatusMessage } from "../../helper/contants/statusMessages";
 

interface DecodedUser {
  _id: string;
  name: string; 
}

const verifyToken = (req: any, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: StatusMessage[HttpStatusCode.UNAUTHORIZED],
    });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as DecodedUser;
    
    req.user = { id: decoded._id, name: decoded.name };
    
    return next();  
  } catch (error) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: error,
    });
    return; 
  }
};


export { verifyToken };