import { db } from "@/utils";
import { ATTENDANCE, STUDENT } from "@/utils/schema";
import { and, eq, isNull, or } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const grade = searchParams.get('grade');
    const month = searchParams.get('month');

    console.log("Grade:", grade, "Month:", month); // Add logging to see the received parameters

    if (!grade || !month) {
        return NextResponse.json({ error: "Missing grade or month parameter" }, { status: 400 });
    }

    // Extract the month from the date field if ATTENDANCE.date is a full date (e.g., '2025-04-01')
    const result = await db.select({
        name: STUDENT.name,
        present: ATTENDANCE.present,
        day: ATTENDANCE.day,
        date: ATTENDANCE.date,
        grade: STUDENT.year,
        studentId: STUDENT.prn,
        attendanceId: ATTENDANCE.studentId,
    }).from(STUDENT)
    .leftJoin(ATTENDANCE,and( eq(STUDENT.prn, ATTENDANCE.studentId),eq(ATTENDANCE.date, month)))
    .where(eq(STUDENT.year, grade))
    
    // Add logging to see the query result
    

    return NextResponse.json(result);
}
export async function POST(req,res){
    const data = await req.json();
    const result = await db.insert(ATTENDANCE)
    .values({
        studentId:data.studentId,
        present:data.present,
        day:data.day,
        date:data.date
    })
    return NextResponse.json(result);
}

export async function DELETE(req) {
    const searchParams=req.nextUrl.searchParams;
    const studentId = searchParams.get('studentId');
    const date = searchParams.get('date');
    const day = searchParams.get('day');


    const result = await db.delete(ATTENDANCE)
    .where(eq(ATTENDANCE.studentId,studentId))
    .where(eq(ATTENDANCE.date,date))
    .where(eq(ATTENDANCE.day,day))
    return NextResponse.json(result);    
}
