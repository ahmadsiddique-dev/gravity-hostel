import dbConnect from "@/connection/dbconnect";
import { StudentModel } from "@/models/StudentSignup.model";
import { StudentSignupSchema } from "@/schemas/StudentSignupSchema";
import { NextResponse } from "next/server";
import UserModel from '@/models/Signup.model'

export async function POST(request:Request) {
    const body = await request.json();

    const validating = StudentSignupSchema.safeParse(body);

    if (!validating.success) return NextResponse.json(
        { 
          success: false,
          message: "Validation failed", 
          errors: validating.error.format()
        }, 
        { status: 400 }
      );
    
    await dbConnect();

    const { studentDetail, guardianDetail, confirmPassword, loginCredientials } = validating.data;

    const userExit = await UserModel.findOne({email: studentDetail.studentEmail});

        if (userExit) return NextResponse.json({success: false, message: "User already exists please Login"}, {status: 400})

    const user = await UserModel.create({
      fullName: studentDetail.studentName,
      email: studentDetail.studentEmail,
      password: loginCredientials.password
    })

    if (!user) 
    const student = await StudentModel.create({

    })

}