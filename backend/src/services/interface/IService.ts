import { IUser } from "../../config/prismaClient";
import { IFeedback } from "../../models/feedback";

export interface IService {
    register(userData: IUser): Promise<void>;
    login(email: string, password: string): Promise<IUser | null>;
    feedback(userId: string, message: string): Promise<void>;
    getFeedbacks(userId: string): Promise<IFeedback | null>;
    getAllUsers(): Promise<{ userId: number, userName: string, message: string[] }[]>;
    getAnalytics(): Promise<{ totalMessages: number, users: string[] }>;
}
