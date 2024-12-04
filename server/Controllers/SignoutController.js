import { NextResponse } from "next/server";
import { connect } from "@/lib/database_config";

connect();

export async function GET(request) {
    try {
        const response = NextResponse.json({
            message: "Logout successfully",
            success: true,
        });

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return response;

    } catch (error) {
        return Response.NextResponse.json({error: error.message}, {status: 500});
    }
}