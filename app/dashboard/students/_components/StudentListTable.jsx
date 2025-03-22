import React, { useEffect, useState } from "react";
import { AllCommunityModule, ModuleRegistry, Theme, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@/components/ui/button";
import { Search, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";


// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const pagination = true;

// sets 10 rows per page (default is 100)
const paginationPageSize = 10;

// allows the user to select the page size from a predefined list of page sizes
const paginationPageSizeSelector = [20, 50, 100];


const myTheme = themeQuartz.withParams({
  backgroundColor: "rgb(0,0,0)",
  foregroundColor: "rgb(255,255,255)",
  headerTextColor: "rgb(255,255,255)",
  headerBackgroundColor: "rgb(72,69,210)",
  oddRowBackgroundColor: "rgb(0, 0, 0, 0.03)",
  headerColumnResizeHandleColor: "rgb(126, 46, 132)",
});

function StudentListTable({ studentList, refreshData }) {
  const CustomButtons = (props) => {
    return (

      (<AlertDialog>
        <AlertDialogTrigger asChild><Button variant="destructive" size="icon" className="bg-red-900 hover:bg-primary">
          <Trash />
        </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete students data
              and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick ={()=>DeleteRecord(props?.data.id)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>)


    );
  };

  const [colDefs, setColDefs] = useState([
    { field: "id", filter: true, flex: 1 },
    { field: "name", filter: true, flex: 1 },
    { field: "prn", filter: true, flex: 1 },
    { field: "contact", filter: true, flex: 1 },
    { field: "year", filter: true, flex: 1 },
    { field: "action", cellRenderer: CustomButtons, flex: 1 },
  ]);


  // Memoized Row Data
  const [rowData, setRowData] = useState();
  const [searchInput, setsearchInput] = useState();
  useEffect(() => {
    if (studentList) {
      console.log("Student List Data:", studentList);
      setRowData(studentList);
    }
  }, [studentList]);

  const DeleteRecord=(id)=>{
    GlobalApi.DeleteStudentRecord(id).then(resp=>{
      if(resp)
      {
        toast('Record Deleted Succesfully !')
        refreshData()
      }
    })
  }
  return (

    <div className="my-7" style={{ height: 500, width: "100%" }}>

      <div className="p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm">
        <Search />
        <input className=' rounded-lg bg-black text-white font-bold outline-none w-full ' type='text' placeholder="Search it"
          onChange={() => setsearchInput(event.target.value)} />
      </div>
      <AgGridReact key={rowData ? JSON.stringify(rowData) : "empty"}
        rowData={rowData}
        columnDefs={colDefs}
        quickFilterText={searchInput}
        theme={myTheme}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector} />
    </div>
  );
}

export default StudentListTable;
