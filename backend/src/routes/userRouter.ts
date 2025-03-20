import express,{ Request, Response}  from "express";
const userRouter = express.Router();
import { Controller } from "../controllers/implimentation/controller";
import { Repository } from "../repositories/implimentation/repository";
import { service } from "../services/implimentation/Service";
import { verifyJWT } from "../middlewares/verifyMiddleware";


const repository = new Repository();
const services = new service(repository);
const controller = new Controller(services);

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with name, email, password, and role.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: "JohnDoe"
 *                 description: Must contain only letters, no spaces or numbers.
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: "!Pass123!"
 *                 description: Must start and end with a special character, contain one capital letter and one number.
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 example: "user"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error (invalid name, email, or password)
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
userRouter.post('/register', controller.register)

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User Login
 *     description: Authenticates a user and returns a JWT token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: "!Pass123!"
 *                 description: User's password.
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsIn..."
 *       400:
 *         description: Missing email or password
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
userRouter.post('/login', controller.login)

/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Submit user feedback
 *     description: Allows users to submit feedback, which is stored in MongoDB. Requires authentication via a bearer token.
 *     tags:
 *       - Feedback
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - feedback
 *             properties:
 *               feedback:
 *                 type: string
 *                 minLength: 10
 *                 example: "I love this platform! It's very user-friendly."
 *     responses:
 *       201:
 *         description: Feedback submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Feedback submitted successfully"
 *       400:
 *         description: Invalid feedback input (e.g., too short)
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       500:
 *         description: Internal server error
 */
userRouter.post('/feedback',verifyJWT, controller.feedback);

/**
 * @swagger
 * /api/getFeedbacks:
 *   get:
 *     summary: Retrieve user feedbacks
 *     description: Fetches feedbacks submitted by the authenticated user. Requires authentication via a bearer token.
 *     tags:
 *       - Feedback
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved feedbacks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "67dad3f55859c3b9aab6d156"
 *                   userId:
 *                     type: string
 *                     example: "12"
 *                   message:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Great experience!", "Could be improved in UI."]
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-03-19T14:25:57.475Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-03-19T14:26:23.076Z"
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       500:
 *         description: Internal server error
 */
userRouter.get('/getFeedbacks',verifyJWT, controller.getFeedbacks);

/**
 * @swagger
 * /api/getUsers:
 *   get:
 *     summary: Retrieve all users with feedback messages
 *     description: Fetches all users excluding those with the role of "admin" and their associated feedback messages. Requires authentication via a bearer token.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved users with feedback messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: number
 *                     example: 1
 *                   userName:
 *                     type: string
 *                     example: "JohnDoe"
 *                   message:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Great experience!", "Could be improved in UI."]
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       500:
 *         description: Internal server error
 */
userRouter.get('/getUsers',verifyJWT, controller.getAllusers);

userRouter.get('/getAnalytics',verifyJWT, controller.getAnalytics);



export default userRouter;