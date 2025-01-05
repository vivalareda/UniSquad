import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    const posts = await db.post.findMany({
      where: {
        title: {
          contains: query || "",
        },
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
