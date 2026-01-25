import { FeeModel } from "@/models/Fee.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { voucherId } = await request.json();

    if (!voucherId) {
      return NextResponse.json(
        { success: false, message: "Voucher ID is required" },
        { status: 400 }
      );
    }

    const updatedVoucher = await FeeModel.findByIdAndUpdate(
      voucherId,
      {
        $set: {
          status: "paid",
          paidDate: new Date(),
        },
      },
      { new: true } 
    );

    if (!updatedVoucher) {
      return NextResponse.json(
        { success: false, message: "Voucher not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Payment processed successfully",
      data: updatedVoucher,
    });
  } catch (error) {
    console.error("Payment Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}