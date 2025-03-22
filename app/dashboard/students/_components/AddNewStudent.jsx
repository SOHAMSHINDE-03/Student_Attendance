"use client"
import { Button } from "@/components/ui/button"; // Ensure this import is correct
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import GlobalApi from "@/app/_services/GlobalApi"; 
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";


function AddNewStudent({refreshData}) {
  const [open, setOpen] = useState(false);
  const [grades, setGrades] = useState([]);
  const [Loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()
  
  useEffect(() => {
    GetallGradesList();
  }, [])
  const GetallGradesList = () => {
    GlobalApi.GetallGrades().then(resp => {
      setGrades(resp.data);
    })
  }
  const onSubmit = (data) => {
    setLoading(true)
    GlobalApi.CreateNewStudent(data).then(resp => {
      console.log("--", resp);
      if(resp.data){
        reset();
        refreshData();
        setOpen(false);
        toast('New Student Added !')
      }
      setLoading(false)
    })

  }

  return (
    <div >
      <Button className="bg-red-900 text-white px-4 py-2 rounded-md"
        onClick={() => setOpen(true)}
      >
        + ADD New Student
      </Button>
      <Dialog open={open}>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-2">
                  <label>Full Name</label>
                  <Input placeholder='Ex. Soham Shinde'
                    {...register('name', { required: true })}
                  />
                </div>
                <div className="flex flex-col py-2 ">
                  <label>Select Year</label>
                  <select className="p-3 border rounded-lg"
                    {...register('year', { required: true })}>
                    {grades.map((item, index) => (
                      <option key={index} value={item.grade}>{item.grade}</option>

                    ))}
                  </select>
                </div>
                <div className="py-2">
                  <label>PRN</label>
                  <Input type="number" placeholder='Ex. 20xxxxx2xxx'
                    {...register('prn', { required: true })} />
                </div>
                <div className="py-2">
                  <label>Contact number</label>
                  <Input type="number" placeholder='Ex. 91xxxxxxxx'
                    {...register('contact', { required: true })} />
                </div>
                <div className="flex gap-3 items-center justify-end my-5">
                  <Button type= "button"onClick={() => setOpen(false)} varient='ghost'>Cancel</Button>
                  <Button
                    type="submit"
                    disable = {Loading}
                    className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                      {Loading? <LoaderIcon className="animate-spin"/>:
                      'Save'}</Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewStudent;
