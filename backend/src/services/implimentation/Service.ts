import { IUser } from "../../config/prismaClient";
import { IRepository } from "../../repositories/interface/IRepository";
import { IService } from "../interface/IService";
import { comparePassword } from "../../utils/bcrypt.utils";
import { IFeedback } from "../../models/feedback";

export class service implements IService {
    constructor(private baseRepository: IRepository) { }
   async register(userData: IUser): Promise<void> {
        const findEmail = await this.baseRepository.findByEmail(userData.email);
        if(findEmail) {
            console.log('user already exists')
            return;
        }
        this.baseRepository.register(userData);
    }

    async login(email: string, password: string): Promise<IUser | null> {
        const user = await this.baseRepository.findByEmail(email);
      
        if (!user) {
          console.log("User not found");
          return null;
        }
      
        const isPasswordValid = await comparePassword(password, user.password);
      
        if (!isPasswordValid) {
          console.log("Password incorrect");
          return null;
        }
        console.log("Login successful");
        return user;
      }

      async feedback(userId: string, message: string): Promise<void> {
        try {
          await this.baseRepository.feedback(userId, message);
          console.log("Feedback submitted successfully");
        } catch (error) {
          console.error("Error submitting feedback:", error);
          throw error;
        }
      }

      async getFeedbacks(userId: string): Promise<IFeedback | null> {
        try {
          const feedbacks = await this.baseRepository.getFeedbacks(userId);
          return feedbacks 
        }
        catch (error) {
          console.error("Error getting feedbacks:", error);
          throw error;
        }
      }

      async getAllUsers(): Promise<{ userId: number, userName: string, message: string[] }[]> {
        try {
            const users = await this.baseRepository.getAllUsers();
            const feedbacks = await this.baseRepository.getAllFeedbacks();

            const feedbackMap = new Map<number, string[]>();

            for (const feedback of feedbacks) {
                if (feedbackMap.has(feedback.userId)) {
                    feedbackMap.get(feedback.userId)?.push(...feedback.message);
                } else {
                    feedbackMap.set(feedback.userId, feedback.message);
                }
            }
            const nonAdminUsers = users.filter(user => user.role !== 'admin');
            const mergedUsers = nonAdminUsers.map((user) => ({
                userId: user.id!, 
                userName: user.name,
                message: feedbackMap.get(user.id!) || [] 
            }));

            return mergedUsers;
        } catch (error) {
            console.error("Error getting users:", error);
            throw error;
        }
    }

    getAnalytics = async (): Promise<{ totalMessages: number, users: string[] }> => {
        try {
            const totalMessages = await this.baseRepository.getTotalMessages();
            const users = await this.baseRepository.getUsersWithFeedbackCount();
            return { totalMessages, users };
        } catch (error) {
            console.error("Error getting analytics:", error);
            throw error;
        }
    }

  }
    

