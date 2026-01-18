import { StudentSignupSchema } from "@/schemas/StudentSignupSchema";
import mongoose, { Schema, model, Document } from "mongoose";
import z from "zod";

export type StudentSignup = z.infer<typeof StudentSignupSchema> & Document

const StudentSchema: Schema<StudentSignup> = new Schema({
  studentDetail: {
    studentName: { type: String, required: true },
    studentcnic: { type: String, required: true, unique: true },
    studentPhoneNO: { type: String, required: true },
    studentEmail: { type: String, required: true, unique: true },
  },
  guardianDetail: {
    guardianName: { type: String, required: true },
    guardianPhoneNO: { type: String, required: true },
    address: { type: String, required: true },
  },
  loginCredientials: {
    password: { type: String, required: true },
    capacity: { type: Number, required: true },
    type: { type: String, required: true },
    roomNumber: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
  },
}, { timestamps: true });


export const StudentModel = (mongoose.models.Student ) || model('Student', StudentSchema)