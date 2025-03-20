import mongoose, { Types } from "mongoose";

export interface IFeedback extends mongoose.Document {
    _id:Types.ObjectId;
    userId: number;
    message: string[];
}

const FeedbackSchema = new mongoose.Schema(
    {
        userId: { type: Number, required: true },
        message: [{ type: String, required: true }],
    },
    { timestamps: true }
);

export const Feedback = mongoose.model('Feedback', FeedbackSchema);