import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const calendars = await getAllCalendars();
  return NextResponse.json(calendars);
}

export async function POST(request: NextRequest) {
  const { title, start, end, backgroundColor, borderColor } = await request.json();

  await prisma.calendars.create({
    data: {
      title,
      start,
      end,
      backgroundColor,
      borderColor,
    },
  });

  const calendars = await getAllCalendars();
  return NextResponse.json(calendars);
}

export async function DELETE(request: NextRequest) {
  const id = parseInt(request.nextUrl.searchParams.get('id')!);

  await prisma.calendars.delete({
    where: {
      id: id,
    },
  });

  const calendars = await getAllCalendars();
  return NextResponse.json(calendars);
}

async function getAllCalendars() {
  const calendars = await prisma.calendars.findMany();
  return calendars;
}
