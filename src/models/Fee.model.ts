import mongoose, { Schema, model, Document, Types } from "mongoose";


export interface Fee extends Document {
    student: Types.ObjectId;
    month: number;
    year: number;
    amount: number;
    roomRent: number;
    messFee: number;
    status: 'paid' | 'unpaid';
    paidAmount: number;
    paidDate?: Date;
    dueDate: Date;
}

const FeeSchema: Schema<Fee> = new Schema({
    student: {
        type: Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    roomRent: {
        type: Number,
        required: true,
    },
    messFee: {
        type: Number,
        required: true,
        default: 5000,
    },
    status: {
        type: String,
        enum: ['paid', 'unpaid'],
        required: true,
    },
    paidAmount: {
        type: Number,
        required: true,
    },
    paidDate: {
        type: Date,
        required: false,
        default: Date.now,
    },
    dueDate: {
        type: Date,
        required: true,
    },
}, { timestamps: true });


export const FeeModel = (mongoose.models.Fee) || model<Fee>('Fee', FeeSchema);