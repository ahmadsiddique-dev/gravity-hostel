import dbConnect from "@/connection/dbconnect";
import { RoomModel } from "@/models/Room.model";
import { StudentModel } from "@/models/StudentSignup.model";

export async function executionHandler({
  id,
  qfor,
}: {
  id: string;
  qfor: string;
}) {
  await dbConnect();
  console.log("ID: ", id);
  try {
    if (!id) {
      return "Id is not defined";
    }

    console.log("id: ", id, "Qfor: ", qfor)

    const studentId = await StudentModel.findOne({ user: id }, { _id: 1 }).lean();

    console.log("StudentId: ", studentId)

    if (!studentId) {
      return "Student not found";
    }

    const query = { occupants: { $in: [studentId] } };

    const response = await RoomModel.find(query); 

    if (!response.length) {
      return "Noting found";
    }

    console.log("BResponse: ", response);
    return response;
  } catch (error) {
    return "something went wrong.";
  }
}


// this works fine data is beint return 