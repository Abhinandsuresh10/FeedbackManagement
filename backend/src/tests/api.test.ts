  import request from "supertest";
  import { describe, it, expect, beforeAll, afterAll } from "vitest";
  import index from "../index"; 
  import  prisma  from "../config/prismaClient"; 
  import mongoose from "mongoose"; 
  import dotenv from "dotenv";
  dotenv.config(); 
  

  describe("User Registration API", () => {
    beforeAll(async () => {
      await mongoose.connect(process.env.MONOGO_URL as string); 
    });

    afterAll(async () => {
      await mongoose.connection.close();
    });

    let jwtToken: string;

    it("should register a new user successfully", async () => {
      const response = await request(index)
        .post("/api/register")
        .send({
          name: "Test User",
          email: "tests@example.com",
          password: "password123",
          role: "user",
        });

      expect(response.status).toBe(201);
    });

    it("should Login a user successfully", async () => {
      const response = await request(index)
        .post("/api/login")
        .send({
          email: "tests@example.com",
          password: "password123",
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('jwtoken')
      jwtToken = response.body.jwtoken;
    });
    
      it("should add a feedback in mongodb successfully", async () => {
        try {
          const response = await request(index)
            .post("/api/feedback")
            .set("Authorization", `Bearer ${jwtToken}`)
            .send({
              feedback: 'this is a good feedback from mine'
            });
    
          expect(response.status).toBe(200);
        } catch (error) {
          console.error("Error adding feedback:", error);
          throw error;
        }
      });

      it("should retrive all the user messages", async () => {
        try {
          const response = await request(index)
          .get("/api/getFeedbacks")
          .set("Authorization", `Bearer ${jwtToken}`)

          expect(response.status).toBe(200);
      
        } catch (error) {
          console.error("Error getting feedbacks:", error);
          throw error;
        }
      })

      it("should retrive the totalmessage count and top 3 active users in admin", async () => {
        try {
          const response = await request(index)
          .get("/api/getAnalytics")
          .set("Authorization", `Bearer ${jwtToken}`)

          expect(response.status).toBe(200);
          // pending - have to fix some errors here...
        } catch (error) {
          console.error("Error getting users:", error);
          throw error;
        }
      });

      it("should retrive all the users in admin", async () => {
        try {
          const response = await request(index)
          .get("/api/getUsers")
          .set("Authorization", `Bearer ${jwtToken}`)

          expect(response.status).toBe(200);
          // pending - have to fix some errors here...
        } catch (error) {
          console.error("Error getting users:", error);
          throw error;
        }
      })
  });
