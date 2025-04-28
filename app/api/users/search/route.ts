import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const text = req.nextUrl.searchParams.get("text") || "";
  const matches = await prisma.user.findMany({
    where: { email: { contains: text } },
    take: 10,
  });
  return NextResponse.json(matches.map((u) => u.email));
}
