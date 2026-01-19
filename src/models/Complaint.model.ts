import mongoose, { Schema, model, Document, Types } from 'mongoose';

export interface Complaint extends Document {
    student: Types.ObjectId;
    title: string;
    description: string;
    category: 'maintenance' | 'academic' | 'other';
    status: 'pending' | 'in-progress' | 'resolved';
    resolvedAt?: Date;
}

const ComplaintSchema: Schema<Complaint> = new Schema({
    student: {
        type: Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['maintenance', 'academic', 'other'],
        default: 'other',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'resolved'],
        default: 'pending',
    },
    resolvedAt: {
        type: Date,
        required: false,
    },
}, { timestamps: true });

export const ComplaintModel = (mongoose.models.Complaint) || model<Complaint>('Complaint', ComplaintSchema);