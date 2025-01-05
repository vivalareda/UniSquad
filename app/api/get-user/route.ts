import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
      include: {
        posts: true,
        diplomas: true,
      },
    });

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error("Error details:", error);

    return NextResponse.json(
      { error: "Failed to fetch posts", details: error.message },
      { status: 500 },
    );
  }
}
