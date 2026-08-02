import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prismaClient';
import { signupPayloadSchema } from '../../../../lib/schema';
import { hashPassword } from '../../../../lib/password';

export async function POST(request: NextRequest) {
  const reqBody: unknown = await request.json();
  const parsedBody = signupPayloadSchema.safeParse(reqBody);

  if (parsedBody.success === false) {
    return NextResponse.json(
      {
        message: 'Invalid signup data.',
      },
      { status: 400 },
    );
  }

  try {
    const { name, email, password } = parsedBody.data;
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, email, password: passwordHash },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    return NextResponse.json(
      { message: 'Account created.', data: user },
      { status: 201 },
    );
  } catch (error) {
    const databaseError = error as { code?: string };

    if (databaseError.code === 'P2002') {
      return NextResponse.json(
        { message: 'An account with this email already exists.' },
        { status: 409 },
      );
    }

    console.error('Signup failed.', error);
    return NextResponse.json(
      { message: 'Unable to create account.' },
      { status: 500 },
    );
  }
}
