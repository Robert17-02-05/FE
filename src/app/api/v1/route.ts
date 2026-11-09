// ============================================================
// api/v1/route.ts — Next.js API Route Handler mẫu
// Tất cả API logic xử lý phía server
// ============================================================
import { NextRequest, NextResponse } from 'next/server';

// ── GET /api/v1 ───────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page  = Number(searchParams.get('page'))  || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  return NextResponse.json({
    success: true,
    message: 'API v1 đang hoạt động',
    data: { page, limit },
  });
}

// ── POST /api/v1 ──────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate → xử lý → trả về
    return NextResponse.json(
      { success: true, message: 'Tạo thành công', data: body },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Dữ liệu không hợp lệ' },
      { status: 400 }
    );
  }
}
