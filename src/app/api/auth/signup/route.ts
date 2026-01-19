import dbConnect from "@/connection/dbconnect";
import UserModel from '@/models/Signup.model'
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(request:Request) {
    const {fullName, email, password} = await request.json();

    console.log("Received signup data:", {fullName, email, password});
    if (!fullName || !email || !password) return NextResponse.json({success: false, message: "Credientials are missing"}, {status: 400})

    try {
        await dbConnect();

        const user = await UserModel.findOne({email});

        if (user) return NextResponse.json({success: false, message: "User already exists please Login"}, {status: 400})

        const response = await UserModel.create({fullName, email, password});

        if (!response) return NextResponse.json({success: false, message: "Unable to create user"}, {status: 500})

        const res = NextResponse.json({success: true, message: "User created Successfully"}, {status: 200})

        const token = jwt.sign({_id: response._id}, `${process.env.TOKEN_SECRET}`, {
            expiresIn: 1000 * 60 * 60 * 24 * 30
        })

        res.cookies.set('token', token, {
            httpOnly: true,
            secure: 'production' === process.env.ENV,
        })

        return res;
    } catch (error) {
        return NextResponse.json({success: false, message: "Unexpected error occured"}, {status: 500})
    }

}