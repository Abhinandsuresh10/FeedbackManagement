import { Request, Response } from 'express';
import { IService } from '../../services/interface/IService';
import { IUser } from '../../config/prismaClient';
import { hashPassword } from '../../utils/bcrypt.utils';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt.util';
import { AuthRequest } from '../../types/jwt.types';

export class Controller {
  private service: IService;

  constructor(service: IService) {
    this.service = service;
  }

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = req.body as IUser;
      user.password = await hashPassword(user.password);
      await this.service.register(user);
      res.status(201).json({ message: 'User registered successfully' });
      return;
    } catch (error) {
      console.log(error)
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const user = await this.service.login(email, password);
      if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }
      const payload = { name:user.name, email:user.email, id:user.id };
      const jwtoken = generateAccessToken(payload);
      const refershToken = generateRefreshToken(payload);

      res.cookie('refreshtoken', refershToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false
      })

      res.status(200).json({ message: 'Login successful', user , jwtoken});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  feedback = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { feedback } = req.body;
      if(!req.user) {
        throw new Error('User not found');
      }
      const userId = req.user.id;

      await this.service.feedback(userId, feedback);
      res.status(200).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  getFeedbacks = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if(!req.user) {
        throw new Error('User not found');
      }
      const userId = req.user.id;
      const feedbacks = await this.service.getFeedbacks(userId);
      res.status(200).json(feedbacks);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  getAllusers = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if(!req.user) {
        throw new Error('User not found');
      }
      const users = await this.service.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  getAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
    try {

    
      if(!req.user) {
        throw new Error('User not found');
      }
      const analytics = await this.service.getAnalytics();
      res.status(200).json(analytics);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}