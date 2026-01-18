import mongoose, { Schema, model, Document, Types } from 'mongoose';

export interface Notification extends Document {
    title: string;
    message: string;
    target: 'all' | 'specific';
    priority: 'normal' | 'high';
    readBy: Types.ObjectId[];
}

const NotificationSchema: Schema<Notification> = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100,
    },
    message: {
        type: String,
        required: true,
        maxlength: 1000,
    },
    target: {
        type: String,
        enum: ['all', 'specific'],
        required: true
    },
    priority: {
        type: String,
        enum: ['normal', 'high'],
        required: true
    },
    readBy: [{
        type: Types.ObjectId,
        ref: 'Student'
    }],
}, { timestamps: true });

export const NotificationModel = (mongoose.models.Notification) || model<Notification>('Notification', NotificationSchema);