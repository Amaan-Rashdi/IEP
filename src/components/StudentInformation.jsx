import {  useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import Error from './Error';

const StudentInformation = () =>{
    //{ studentName, erpNo, className, subjectGroup }
    const navigate = useNavigate();
    const { loading, error, counselorDetails } = useSelector((state) => state.counselor);
    //checking logging
useEffect(() => {
    const counselor = localStorage.getItem('counselor')
  ? JSON.parse(localStorage.getItem('counselor'))
  : null
  
  if (counselor)
    {
  const value = counselor[0] ? counselor[0] : null;
  
  
  
    if (value) {
     //
        }
      }
    else
    {
      console.log("bye bye")
      localStorage.removeItem("userData");
        navigate('/');
    }
   }, [navigate])  
  
   if (loading) return <Spinner>Loading...</Spinner>;
   if (error) return <Error>{error}</Error>; 
   
   const firstStudent = counselorDetails.studentDetails[0] ?counselorDetails.studentDetails[0] : null;
   console.log("pakarna", firstStudent)
return (
    <div className="container">
        <table className='table table-hover text-center'>
            <thead>
                <tr>
                    <th colSpan={4} className='text-center bg-default' >Student Detail</th>
                </tr>
                <tr>
                    <td>Name:</td>
                    <td>{firstStudent.fullname ? firstStudent.fullname : "Ali"}</td>

                    <td>ClassName:</td>
                    <td>{firstStudent.student_Id ? firstStudent.student_Id : "00000"}</td>
                </tr>
                <tr>
                    <td>ERP No:</td>
                    <td>{firstStudent.class_Name ? firstStudent.class_Name : "9 Class(N)"}</td>

                    <td>Subject Group:</td>
                    <td>{firstStudent.class_Name ? firstStudent.class_Name : "Class 10(O Level)"}</td>
                </tr>
            </thead>
        </table>
    </div>
);    
}
export default StudentInformation;

