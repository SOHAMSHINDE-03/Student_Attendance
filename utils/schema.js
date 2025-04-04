import { int, mysqlTable, varchar, year,boolean } from "drizzle-orm/mysql-core"; 

export const GRADES = mysqlTable('grades', {
    id: int('int', { length: 11 }).primaryKey(),
    grade: varchar('grade', { length: 10 }).notNull()
});

export const STUDENT = mysqlTable('students', {
    id: int('id', { length: 11 }).autoincrement().primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
    year: varchar('year', { length: 10 }).notNull(),
    prn: varchar('prn', { length: 20 }),
    contact: varchar('contact', { length: 11 }),
});

export const ATTENDANCE = mysqlTable('attendance', {
    id: int('id', { length: 11 }).autoincrement().primaryKey(),
    studentId: varchar('studentid', { length: 20 }).notNull(),
    present: boolean('present').default(false),  
    day: int('day', { length: 11 }).notNull(),
    date: varchar('date', { length: 20 }).notNull()
});
