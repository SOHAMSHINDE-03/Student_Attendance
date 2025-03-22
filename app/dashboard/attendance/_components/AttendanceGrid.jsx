"use client"
import React, { useEffect, useState } from 'react'
import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { date, year } from 'drizzle-orm/mysql-core';
import moment from 'moment';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import { getUniqueRecord } from '@/app/_services/service';

// Register all Community features
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

// sets 10 rows per page (default is 100)
const paginationPageSize = 10;

// allows the user to select the page size from a predefined list of page sizes
const paginationPageSizeSelector = [20, 50, 100];

function AttendanceGrid({ attendanceList, selectedMonth }) {

  const [rowData, setRowData] = useState();
  const [colDef, setColDef] = useState([
    { field: 'studentId', filter: true },
    { field: 'name', filter: true },

  ]);
  const daysInMonth = (years, month) => new Date(years, month + 1, 0).getDate()
  const numberofDays = daysInMonth(moment(selectedMonth).format('yyyy'), moment(selectedMonth).format('MM'))
  console.log(numberofDays)
  const daysArrays = Array.from({ length: numberofDays }, (_, i) => i + 1)

  const isPresent = (studentId, day) => {
    const result = attendanceList.find(item => item.day == day && item.studentId == studentId)
    return result ? true : false
  }

  useEffect(() => {
    if (attendanceList) {
      const userList = getUniqueRecord(attendanceList);
      setRowData(userList);
      daysArrays.forEach((date) => {
        setColDef(prevData => [...prevData, {
          field: date.toString(), width: 50, editable: true,
        }])
        userList.forEach(obj => {
          obj[date] = false
        })
      })





    }
  }, [attendanceList]);


  





  const onMarkAttendence = (day, studentId, presentStatus) => {

    const date = moment(selectedMonth).format('MM/YYYY')
    if (presentStatus) {
      const data = {
        day: day,
        studentId: studentId,
        present: presentStatus,
        date: date
      }
      GlobalApi.MarkAttendence(data).then(resp => {
        console.log(resp);
        toast("StudentID:" + studentId + " Marked as present")
      })
    }
    else {
      GlobalApi.MarkAbsent(studentId, day, date)
        .then(resp => {
          toast("StudentID:" + studentId + " Marked as absent")
        })
    }

  }


  return (
    <div>
      <div style={{ height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDef}
          theme={myTheme}
          onCellValueChanged={(e) => onMarkAttendence(e.colDef.field, e.data.studentId, e.newValue)}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  )
}

export default AttendanceGrid