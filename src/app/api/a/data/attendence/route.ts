import dbConnect from "@/connection/dbconnect";
import { AttendenceModel } from "@/models/Attendence.model";
import { StudentModel } from "@/models/StudentSignup.model";
import "@/models/Signup.model";
import "@/models/Room.model";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const record = await StudentModel.find({}, { _id: 1, user: 1, room: 1 })
      .populate("user", "fullName -_id")
      .populate("room", "number -_id");

    if (!record || record.length === 0) {
      return Response.json(
        { success: false, message: "No records found" },
        { status: 404 },
      );
    }
    
    return Response.json(
      { success: true, message: "Hello from Attendence API", data: record },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Internal Server Error", error: error },
      { status: 500 },
    );
  }
}
