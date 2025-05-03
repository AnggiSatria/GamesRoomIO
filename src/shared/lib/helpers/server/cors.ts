// app/lib/api/cors.ts (atau anywhere kamu simpan helper)
import { NextRequest, NextResponse } from "next/server";

export function withCORS(response: NextResponse, origin?: string) {
  const allowedOrigin = origin || "*";
  response.headers.set("Access-Control-Allow-Origin", allowedOrigin); // Allows all origins
  response.headers.set("Vary", "Origin");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  return response;
}

export function handleOptions(req: NextRequest) {
  const origin = req.headers.get("origin") ?? "*";
  const res = new NextResponse(null, { status: 204 }); // kosong, tanpa body
  return withCORS(res, origin);
}
