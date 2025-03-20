import { IUser } from "../../config/prismaClient";
import { IFeedback } from "../../models/feedback";

export interface IRepository  {
    register(userData:Object):Promise<void>;
    findByEmail(email:string):Promise<IUser | null>;
    feedback(userId:string, message:string):Promise<IFeedback | null>;
    getFeedbacks(userId:string):Promise<IFeedback|null>
    getAllUsers():Promise<IUser[]>
    getAllFeedbacks():Promise<IFeedback[]>
}