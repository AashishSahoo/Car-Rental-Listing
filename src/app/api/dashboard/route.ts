import { NextResponse, NextRequest } from "next/server";
import { data } from "@/utils/mockData";

let listings = [...data];

export async function GET() {
  return NextResponse.json(listings);
}

export async function PUT(req: NextRequest) {
  const { id, updatedData } = await req.json();

  const listingIndex = listings.findIndex((item) => item.id === id);
  if (listingIndex === -1) {
    return NextResponse.json({ message: "Listing not found" }, { status: 404 });
  }

  const updatedItem = {
    ...listings[listingIndex],
    ...updatedData,
    updatedAt: new Date().toISOString(),
    ...(updatedData.status === "rejected" && updatedData.rejectionReason
      ? { rejectionReason: updatedData.rejectionReason }
      : {}),
    ...(updatedData.status === "approved" ? { rejectionReason: null } : {}),
  };

  listings[listingIndex] = updatedItem;

  return NextResponse.json({
    message: "Listing status updated successfully",
    updatedItem,
  });
}

export async function POST(req: NextRequest) {
  const { id, updatedData } = await req.json();

  const listingIndex = listings.findIndex((item) => item.id === id);
  if (listingIndex === -1) {
    return NextResponse.json({ message: "Listing not found" }, { status: 404 });
  }

  const updatedItem = {
    ...listings[listingIndex],
    ...updatedData,
    updatedAt: new Date().toISOString(),
  };

  listings[listingIndex] = updatedItem;

  return NextResponse.json({
    message: "Listing details updated successfully",
    updatedItem,
  });
}
