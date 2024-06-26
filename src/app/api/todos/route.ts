import prisma from "@/lib/prisma";
import { register } from "module";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("take") ?? "0");
  if (isNaN(take))
    return NextResponse.json(
      { message: "Take tiene que ser un numero" },
      { status: 400 }
    );
  if (isNaN(skip))
    return NextResponse.json(
      { message: "Skip tiene que ser un numero" },
      { status: 400 }
    );

  const todos = await prisma.todo.findMany({ take, skip });

  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const body = await postSchema.validate(await request.json());

    const todo = await prisma.todo.create({ data: body });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
  //console.log(todo);
}

export async function DELETE(request: Request) {
  try {
    await prisma.todo.deleteMany({ where: { complete: true } });

    return NextResponse.json("Borrado con éxito");
  } catch (e) {
    return NextResponse.json(e, { status: 400 });
  }
}
