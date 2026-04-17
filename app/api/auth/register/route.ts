// app/api/auth/register/route.ts
// ЦЕ ВСЕ З КОНСПЕКТУ ПОТРІБНО ПЕРЕВІРИТИ

import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../api";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const apiRes = await api.post("auth/register", body);

    return NextResponse.json(apiRes.data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status },
    );
  }
}
