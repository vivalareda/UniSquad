import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function createUser(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      console.log(userId);
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, discordHandle, diplomas } = body;

    const existingUser = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 });
    }

    const newUser = await db.user.create({
      data: {
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
      include: {
        diplomas: true,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("[USER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
