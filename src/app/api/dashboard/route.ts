'use client";';
import { NextResponse, NextRequest } from "next/server";

import { data } from "@/utils/mockData";
let listings = [...data];

export async function GET() {
  const responseData = data;
  return NextResponse.json(responseData);
}

export async function PUT(req: NextRequest) {
  const { id, updatedData } = await req.json();
  listings = listings.map((item) =>
    item.id === id ? { ...item, ...updatedData } : item
  );
  return NextResponse.json({ message: "Listing updated" });
}
