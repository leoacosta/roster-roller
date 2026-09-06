import { type NextRequest } from "next/server";
import { generateNames, type Sport, type Vibe } from "@/lib/names";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const sport: Sport = body.sport ?? "soccer";
  const vibe: Vibe = body.vibe ?? "random";

  const names = generateNames(sport, vibe);
  return Response.json({ names });
}
