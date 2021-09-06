import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";

@Service()
export class QueriesMiddleware {
  checkIfIdIsNumeric = async (
    req: Request | any,
    res: Response,
    next: NextFunction
  ) => {
    let { limit } = req.query;

    if (isNaN(limit))
      return res.status(400).send({ message: "The limit must be numeric" });
    next();
  };
}
