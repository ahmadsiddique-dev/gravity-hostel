import dbConnect from "@/connection/dbconnect";
import { AttendenceModel } from "@/models/Attendence.model";
import { StudentModel } from "@/models/StudentSignup.model";
import "@/models/Signup.model";
import "@/models/Room.model";

import { Student } from "@/app/dashboard/a/attendence/page";
import { isValidObjectId } from "mongoose";
import { NextRequest } from "next/server";
import { success } from "zod";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('date')

  console.log("Query : ", query)
  await dbConnect();

  try {
    const record = await StudentModel.find({}, { _id: 1, user: 1, room: 1 }) // New Student Issue so query change
      .populate("user", "fullName -_id")
      .populate("room", "number -_id")
      .lean();

    if (!record || record.length === 0) {
      return Response.json(
        { success: false, message: "No records found" },
        { status: 404 },
      );
    }

    const studentId = record.map((record) => record._id);
    console.log("IDs", studentId);

    // TODO: Handle Cases here: Done
    const attenedence = await AttendenceModel.find({
      student: { $in: studentId }, date: query
    }).lean();

    const mergedData = record.map((student) => {
      const statusRecord = attenedence.find(
        (att) => att.student.toString() === student._id.toString(),
      );

      return {
        ...student,
        attendance: statusRecord ? statusRecord.status : null,
      };
    });

    return Response.json(
      {
        success: true,
        message: "Hello from Attendence API",
        data: mergedData,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Internal Server Error", error: error },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body: Student[] = await request.json();
    console.log("Data: ", body);

    const dataToInsert = body.map((record: any) => ({
      student: record._id,
      date: record.date,
      room: record.room.number,
      name: record.user.fullName,
      status: record.present,
    }));

    console.log("Data to Insert: ", dataToInsert);
    const response = await AttendenceModel.insertMany(dataToInsert);
    
    console.log("3.Response: ", response)
    if (!response)
      return Response.json(
        { success: false, message: "Unable to Insert Documents" },
        { status: 500 },
      );

    return Response.json(
      { success: true, message: "Document inserted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
