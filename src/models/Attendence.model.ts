import mongoose, { Schema, model, Document, Types } from 'mongoose';

export interface Attendence extends Document {
    student: Types.ObjectId;
    date: Date;
    status: 'present' | 'absent' | 'late';
}

const AttendenceSchema: Schema<Attendence> = new Schema({
    student: {
        type: Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['present', 'absent', 'leave'],
        required: true,
    },
}, { timestamps: true });

export const AttendenceModel = (mongoose.models.Attendence) || model<Attendence>('Attendence', AttendenceSchema);