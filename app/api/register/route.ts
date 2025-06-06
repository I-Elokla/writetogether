import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json(
      { error: "Email, name, and password are required" },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashed = await hash(password, 10);
  const user = await prisma.user.create({
    data: { email, name, password: hashed },
  });

  return NextResponse.json({
    message: "User registered",
    user: { id: user.id, email: user.email, name: user.name },
  });
}
