import { eq } from "drizzle-orm";
import { db } from "@/utils";
import { STUDENT } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function POST(req,res){
    const data = await req.json();

    const result = await db.insert(STUDENT)
    .values({
        name:data?.name,
        year:data?.year,
        prn:data?.prn,
        contact:data?.contact
    })

    return NextResponse.json(result);
}

export async function GET(req){
    const result = await db.select().from(STUDENT);
    return NextResponse.json(result);
}

export async function DELETE(req) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');

    const result = await db.delete(STUDENT).where(eq(STUDENT.id,id));

    return NextResponse.json(result);
    
}