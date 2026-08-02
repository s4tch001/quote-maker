import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prismaClient';
import { signupPayloadSchema } from '../../../../lib/schema';
import bcrypt from 'bcryptjs';

// Handle POST requests to create a new user account
export async function POST(request: NextRequest) {
  // Parse the JSON request body
  const reqBody = await request.json();

  // Validate the request body using the Zod schema
  const isDataCorrect = signupPayloadSchema.safeParse(reqBody);

  // Return a 400 response if validation fails
  if (isDataCorrect.success === false) {
    return NextResponse.json(
      { message: 'UI Data not correct' },
      { status: 400 },
    );
  }

  // Hash the user's password before storing it in the database
  const hashedPassword = await bcrypt.hash(isDataCorrect.data.password, 12);

  // Create a new user record in the database
  const user = await prisma.user.create({
    data: {
      name: isDataCorrect.data.name,
      email: isDataCorrect.data.email,
      password: hashedPassword,
    },
  });

  // Remove the password field before using or returning the user object
  // const { password, ...safeUser } = user;

  // Log the user information without the password
  console.log(user);

  // Debug: Log the raw request body
  // console.log('Request Body', reqBody);

  // Return a success response
  return NextResponse.json({
    message: 'Backend: Received Data',
    data: reqBody,
  });
}
