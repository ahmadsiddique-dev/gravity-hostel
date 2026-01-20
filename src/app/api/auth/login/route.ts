import dbConnect from "@/connection/dbconnect";
import UserModel from "@/models/Signup.model";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password)
    return Response.json(
      { success: false, message: "Credientials are missing" },
      { status: 400 },
    );

  try {
    await dbConnect();

    const user = await UserModel.findOne({ email }, { _id: 1, fullName: 1, email: 1, isAdmin: 1});

    if (!user)
      return Response.json(
        { success: false, message: "User already exists please Signup" },
        { status: 400 },
      );

    

    return Response.json(
      { success: true, message: "Login successfully", data: user },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Unexpected error occured" },
      { status: 500 },
    );
  }
}
