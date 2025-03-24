"use client";
import React, { useEffect, useState } from "react";
import { AllCommunityModule, ModuleRegistry, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react"; 
import moment from "moment";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";
import { getUniqueRecord } from "@/app/_services/service";

// Register Ag-Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

const myTheme = themeQuartz.withParams({
  backgroundColor: "rgb(0,0,0)",
  foregroundColor: "rgb(255,255,255)",
  headerTextColor: "rgb(255,255,255)",
  headerBackgroundColor: "rgb(72,69,210)",
  oddRowBackgroundColor: "rgb(0, 0, 0, 0.03)",
  headerColumnResizeHandleColor: "rgb(126, 46, 132)",
});

const pagination = true;
const paginationPageSize = 100;
const paginationPageSizeSelector = [20, 50, 100];

function AttendanceGrid({ attendanceList, selectedMonth }) {
  const [rowData, setRowData] = useState([]);
  const [colDef, setColDef] = useState([
    { field: "studentId", filter: true },
    { field: "name", filter: true },
  ]);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const numberofDays = daysInMonth(moment(selectedMonth).format("YYYY"), moment(selectedMonth).format("MM") - 1);
  const daysArrays = Array.from({ length: numberofDays }, (_, i) => i + 1);

  useEffect(() => {
    if (attendanceList?.length > 0) {
      const uniqueUserList = getUniqueRecord(attendanceList);
      setRowData(uniqueUserList); // Ensures unique students
  
      // Generate days dynamically only once
      const updatedDaysArray = Array.from({ length: numberofDays }, (_, i) => i + 1);
      setColDef([
        { field: "studentId", filter: true },
        { field: "name", filter: true },
        ...updatedDaysArray.map((date) => ({
          field: date.toString(),
          width: 50,
          editable: true,
        })),
      ]);
  
      // Update attendance status
      setRowData(
        uniqueUserList.map((student) => ({
          ...student,
          ...Object.fromEntries(updatedDaysArray.map((day) => [day, isPresent(student.studentId, day)])),
        }))
      );
    }
  }, [attendanceList, selectedMonth]); // <-- Ensures reloading when month or list updates

  const isPresent = (studentId, day) => {
    return attendanceList.some((item) => item.day == day && item.studentId == studentId);
  };

  
  return (
    <div>
      <div style={{ height: 800 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDef}
          theme={myTheme}
          onCellValueChanged={(e) => onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue)}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
}

export default AttendanceGrid;
