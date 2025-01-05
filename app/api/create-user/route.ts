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
    const { name, discordHandle, diplomas } = body;

    const user = await db.user.upsert({
      where: {
        clerkId: userId,
      },
      create: {
        clerkId: userId,
        name,
        discordHandle,
        diplomas: {
          create: diplomas.map((diploma: { name: string; school: string }) => ({
            name: diploma.name,
            school: diploma.school,
          })),
        },
      },
      update: {
        name,
        discordHandle,
        diplomas: {
          deleteMany: {},
          create: diplomas.map((diploma: { name: string; school: string }) => ({
            name: diploma.name,
            school: diploma.school,
          })),
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[USER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
