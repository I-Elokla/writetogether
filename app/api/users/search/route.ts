import { NextRequest, NextResponse } from "next/server";
import { getAllUsers } from "../../database";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text") as string;

  const filteredUserIds = getAllUsers()
    .filter((user) => {
      return user.info.name.toLowerCase().includes(text.toLowerCase());
    })
    .map((user) => user.id);

  return NextResponse.json(filteredUserIds);
}
