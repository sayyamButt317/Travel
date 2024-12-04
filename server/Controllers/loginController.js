import User from "@/models/userModel";
import { connect } from "@/lib/database_config";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;

        const user = await User.findOne({email});

        if(!user) {
            return NextResponse.json({error: "This email address is not registered."}, {status: 400});
        }

        if(password != user.password) {
            return NextResponse.json({error: "Incorret password"}, {status: 400});
        }

        const tokenData = {
            id: user._id,
            email: user.email,
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
            expiresIn: '1d',
        });

        const response = NextResponse.json({
            message: "Logged in successfully",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error) {
        return Response.NextResponse.json({error: error.message}, {status: 500});
    }
}