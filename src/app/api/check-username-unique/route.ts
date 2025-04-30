import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import { z } from "zod";
import { userNameValidation } from "@/schemas/signUpSchema";
import { connect } from "http2";

const usernameQuerySchema = z.object({
  username: userNameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };
    const result = usernameQuerySchema.safeParse(queryParam);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "invalid query parameters",
        },
        { status: 400 }
      );
    }
    const { username } = result.data;
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "username already taken",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "username is available",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("error checking username", error);
    return Response.json(
      {
        success: false,
        message: "error checking username",
      },
      { status: 500 }
    );
  }
}
