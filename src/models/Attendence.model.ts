import mongoose, { Schema, model, Document, Types } from "mongoose";

export interface Attendence extends Document {
  student: Types.ObjectId;
  room: string;
  date: string;
  name: string;
  status: boolean;
}

const AttendenceSchema: Schema<Attendence> = new Schema(
  {
    student: {
      type: Types.ObjectId,
      ref: "Student",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
);

export const AttendenceModel =
  mongoose.models.Attendence ||
  model<Attendence>("Attendence", AttendenceSchema);
