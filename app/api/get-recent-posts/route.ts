import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await db.post.findMany({
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ posts });
  } catch (error: any) {
    console.error("Error details:", error);

    return NextResponse.json(
      { error: "Failed to fetch posts", details: error.message },
      { status: 500 },
    );
  }
}
