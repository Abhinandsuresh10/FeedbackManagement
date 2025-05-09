import { IRepository } from "../interface/IRepository";
import { IUser } from "../../config/prismaClient";
import { PrismaClient } from "@prisma/client";
import { IFeedback } from "../../models/feedback";
import { Feedback } from "../../models/feedback";

const prisma = new PrismaClient();

export class Repository implements IRepository {
   async register(userData: IUser): Promise<void> {
    try {
        await prisma.user.create({
          data: userData, 
        });
        console.log("User registered successfully");
      } catch (error) {
        console.error("Error registering user:", error);
        throw error;
      }
    }
    async findByEmail(email: string): Promise<IUser | null> {
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            });
            return user;
        } catch (error) {
            console.error("Error finding user by email:", error);
            throw new Error("Failed to find user");
        }
    }

    async feedback(userId: string, message: string): Promise<IFeedback | null> {
      try {
          let feedback = await Feedback.findOne({ userId });
  
          if (feedback) {
              feedback.message.push(message);
              await feedback.save();
          } else {
              feedback = await Feedback.create({ userId, message: [message] });
          }
  
          return feedback;
      } catch (error) {
          console.error("Error submitting feedback:", error);
          return null;
      }
  }

  async getFeedbacks(userId: string): Promise<IFeedback| null> {
      try {
        const id = Number(userId);
        const data = await Feedback.findOne({userId: id});
        if(!data) {
          throw new Error('Feedback not found');
        }
        return data;
      } catch (error) {
          console.error("Error getting feedbacks:", error);
      }
      return null;
  }

  getAllUsers = async (): Promise<IUser[]> => {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      console.error("Error getting users:", error);
      throw new Error("Error getting users");
    }
  }

  getAllFeedbacks = async (): Promise<IFeedback[]> => {
      try {
        return await Feedback.find();
      } catch (error) {
        throw new Error("Error getting feedbacks");
      }
  }

  getTotalMessages = async (): Promise<number> => {
      try {
        const feedbacks = await Feedback.find();
        let totalMessages = 0;
        feedbacks.forEach(feedback => {
            totalMessages += feedback.message.length;
        });
        return totalMessages;
      } catch (error) {
          console.error("Error getting total messages:", error);
          throw new Error("Error getting total messages");
      }
  }

  getUsersWithFeedbackCount = async (): Promise<string[]> => {
    try {
        const feedbacks = await Feedback.aggregate([
            { $unwind: "$message" },
            { $group: { _id: "$userId", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 3 }
        ]);

        const userIds = feedbacks.map(fb => fb._id);
        const users = await prisma.user.findMany({
            where: { 
                id: { in: userIds },
                role: { not: 'admin' } 
            },
            select: { name: true } 
        });

        return users.map(user => user.name);
    } catch (error) {
        console.error("Error getting analytics:", error);
        throw new Error("Error getting analytics");
    }
  }
}