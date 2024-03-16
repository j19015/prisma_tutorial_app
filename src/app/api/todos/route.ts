import { NextRequest,NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(){
    const todos = await getAllTodos();
    return NextResponse.json(todos);
}

export async function POST(request: NextRequest){
    const { title,body } = await request.json();

    await prisma.todos.create({
        data:{
            title: title,
            body: body
        }
    })

    const todos = await getAllTodos();
    return NextResponse.json(todos);
}

export async function DELETE(request: NextRequest){
    const id = parseInt(request.nextUrl.searchParams.get('id')!);

    await prisma.todos.delete({
        where:{
            id: id,
        }
    });

    const todos = await getAllTodos();
    return NextResponse.json(todos);
}

export async function PUT(request: NextRequest){
    const { id,is_deleted } = await request.json();

    console.log(id,is_deleted);

    await prisma.todos.update({
        where:{
            id: id,
        },
        data:{
            is_deleted: is_deleted,
        }
    });

    const todos = await getAllTodos();
    return NextResponse.json(todos);
}


async function getAllTodos(){
    const todos = await prisma.todos.findMany();
    return todos;
}