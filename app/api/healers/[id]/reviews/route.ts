import { NextResponse } from "next/server";

import {
  CURRENT_REVIEW_USER,
  addHealerReview,
} from "@/lib/mock/healer-reviews";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json().catch(() => null);

  const result = addHealerReview({
    healerId: id,
    userId: CURRENT_REVIEW_USER.id,
    userName: CURRENT_REVIEW_USER.name,
    rating: Number(body?.rating),
    comment: typeof body?.comment === "string" ? body.comment : "",
  });

  if (!result.ok) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status },
    );
  }

  return NextResponse.json(result, { status: 201 });
}
