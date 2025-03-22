"use client"
import GradeSelect from '@/app/_components/GradeSelect'
import MonthSelection from '@/app/_components/MonthSelection'
import GlobalApi from '@/app/_services/GlobalApi'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import React, { useState } from 'react'
import AttendanceGrid from './_components/AttendanceGrid'

function Attendance() {
  const [selectedMonth,setselectedMonth] = useState();

  const[selectedGrade,setselectedGrade] = useState();
  const[attendanceList,setAttendanceList] = useState();

  const onSearchHandler = ()=>{
    console.log(selectedMonth,selectedGrade)
    const month=moment(selectedMonth).format('MM/YYYY');
    console.log(month);
    GlobalApi.GetAttendanceList(selectedGrade,month).then(resp=>{
      console.log("API RESPONSE",resp.data);
      setAttendanceList(resp.data);
    })
  }
  return (
    <div className='p-10 '>
      <h2 className='text-2xl font-bold'>Attendance</h2>
      {/* Search Option */}

      <div className='flex gap-5 my-5 p-5 border-x-red-900 border rounded-lg'>
        <div className='flex gap-2 items-center'>
          <label>Select Month:</label>
          <MonthSelection selectedMonth={(value)=>setselectedMonth(value)} />
        </div>
        <div className='flex gap-2 items-center'>
          <label>Select Grade:</label>
          <GradeSelect selectedGrade={(v)=>setselectedGrade(v)} />
        </div>
        <Button 
        onClick={()=>onSearchHandler()}
        className="text-white bg-red-900">Search</Button>
      </div>

      {/*Student Attendence Grid*/}
      <AttendanceGrid attendanceList={attendanceList}
      selectedMonth={selectedMonth}/>

    </div>
  )
}

export default Attendance