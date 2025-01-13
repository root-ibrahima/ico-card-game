import { NextRequest, NextResponse } from 'next/server';

interface Game {
  id: string;
  players: string[];
  status: 'waiting' | 'in-progress' | 'finished';
}

const games: Game[] = [];

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newGame: Game = {
    id: Date.now().toString(),
    players: body.players || [],
    status: 'waiting',
  };
  games.push(newGame);
  return NextResponse.json(newGame);
}

export async function GET() {
  return NextResponse.json(games);
}
