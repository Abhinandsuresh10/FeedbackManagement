import { NextFunction, Request, Response } from "express";


export interface IUsercontroller {
    register(req:Request, res:Response, next:NextFunction):void;
    login(req:Request, res:Response, next:NextFunction):void;
    feedback(req:Request, res:Response, next:NextFunction):void;
    getFeedbacks(req:Request, res:Response, next:NextFunction):void;
    getAnalytics(req:Request, res:Response, next:NextFunction):void;
}