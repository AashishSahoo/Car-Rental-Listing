import { NextRequest, NextResponse } from "next/server";
import { mockUsers } from "@/utils/userData";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userData } = user;

  return NextResponse.json(userData, { status: 200 });
}
