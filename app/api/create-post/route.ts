import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      course,
      class: className,
      numOfTeammates,
      description,
    } = body;

    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User account not found" },
        { status: 404 },
      );
    }

    console.log("User found:", user);

    console.log("Creating post for user:", user);
    const postData = {
      title,
      course,
      class: className,
      numOfTeammates: Number(numOfTeammates),
      description: description || "",
      User: {
        connect: { id: user.id },
      },
    };

    const post = await db.post.create({
      data: postData,
    });
    console.log("Post created:", post);

    return NextResponse.json(post);
  } catch (error: any) {
    console.error("Error creating post:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    return NextResponse.json(
      {
        error: "Failed to create post",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
