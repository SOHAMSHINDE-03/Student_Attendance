import { db } from "@/utils";
import { ATTENDANCE, STUDENT } from "@/utils/schema";
import { and, desc, eq, sql } from "drizzle-orm";  // ✅ Import sql from drizzle-orm
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const date = searchParams.get("date");
        const year = searchParams.get("year");

        const result = await db
            .select({
                day: ATTENDANCE.day,
                presentCount: sql`COUNT(${ATTENDANCE.day})`  // ✅ Use COUNT correctly
            })
            .from(ATTENDANCE)
            .innerJoin(STUDENT, eq(ATTENDANCE.studentId, STUDENT.id))
            .where(and(eq(ATTENDANCE.date, date),eq(STUDENT.year, year)))
            .groupBy(ATTENDANCE.day)
            .orderBy(desc(ATTENDANCE.day))
            .limit(7);
 
        return NextResponse.json(result);
    } catch (error) {
        console.error("Error fetching attendance data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
