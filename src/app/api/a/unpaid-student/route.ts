import dbConnect from "@/connection/dbconnect";
import { StudentModel } from "@/models/StudentSignup.model";
import { FeeModel } from "@/models/Fee.model";// Make sure this path is correct

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    if (!month || !year) { 
      return Response.json(
        { success: false, message: "Month and Year are required" },
        { status: 400 },
      );
    }

    const existingVouchers = await FeeModel.find({
      month: month,
      year: year,
    }).select("student"); 

    console.log("ExistingVouvhers: ", existingVouchers)
    const assignedStudentIds = existingVouchers.map((v: any) => v.student);
    console.log("AssignedIDS: ", assignedStudentIds);

    const unassignedStudents = await StudentModel.find(
      {
        _id: { $nin: assignedStudentIds }, 
      }, 
      { _id: 1, student: 1, room: 1, user: 1 },
    )
      .populate("user", "fullName") 
      .populate("room", "type number");

    const dataToSend = unassignedStudents.map((e: any) => {
        return {
            _id: e._id,
            name: e.user.fullName,
            roomType: e.room.type,
            room: e.room.number
        }
    })
    return Response.json(
      {
        success: true,
        message: "Data fetched successfully",
        data: dataToSend
      },
      { status: 200 },
    );


  } catch (error) {
    console.error("Assign Voucher API Error:", error);
    return Response.json(
      { success: false, message: "Server Error while fetching students" },
      { status: 500 },
    );
  }
}
