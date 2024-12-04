import User from "@/models/userModel";
import { connect } from "@/lib/database_config";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const {firstName, lastName, email, password} = reqBody;

        const user = await User.findOne({email});

        if(user) {
            return NextResponse.json({error: "Given email already linked with another account. Please try another email."}, {status: 400});
        }

        const newUser = new User ({
            firstName,
            lastName,
            email,
            password,
        });
        
        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser,
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}