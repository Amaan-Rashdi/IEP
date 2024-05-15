import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dropdown  } from '../state/dropdown/dropdownAction';
import { getDashboard  } from '../state/dashboard/dashboardAction';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Spinner from './Spinner';
const R_DataTable = () => {
  const columns = [
    {
      name: 'SNO',
      selector: row => row.sno,
      sortable: true,
      center: true,
      style: {
        textAlign: 'center',
        border: '0px solid black',
        color: 'black',
      }
    },
    {
      name: 'Student ID',
      selector: row => row.studentId,
      sortable: true,
      center: true,
      style: {
        textAlign: 'center',
        border: '0px solid black',
        color: 'black',
      }
    },
    {
      name: 'Student Name',
      selector: row => row.studentName,
      sortable: true,
      center: true,
      style: {
        textAlign: 'center',
        border: '0px solid black',
        color: 'black',
      }
    },
    {
      name: 'Actions',
      cell: (row) => (
        <button
        className="btn btn-primary btn-sm"
        style={{ borderRadius: '5px', padding: '5px 15px' }}
        onClick={() => clickiep(row.studentId)}
      >
        <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
        FILL IEP
      </button>
      ),
      center: true,
      style: {
        padding: '10px 10px 5px 5px',
        textAlign: 'center',
        border: '0px solid black',
      }
    },
  ];
  const clickiep = (studentId) => {
    console.log("length of sele")
    if(selectedOption)
      {
       // fetchData(selectedOption,studentId)
        handleFillIEP(selectedOption, studentId)
      }
      else
      {
        Swal.fire({
          icon: "error",
          text: "Please select term first!",
          
        })
      }
  };
  const handleFillIEP = (termId, studentId) => {
    
    navigate(`/student/${termId}/${studentId}`);
  };
  const [username , setusername] = useState("");
  const [classId, setclassID] = useState("");
const navigate= useNavigate();
const dispatch = useDispatch();
const { loading, error, dropdownData } = useSelector((state) => state.dropdown);
const {  dashboardInfo } = useSelector((state) => state.dashboard);
const [isLoading, setIsLoading] = useState(false);
useEffect(() => {
  const userData = localStorage.getItem('userData')
? JSON.parse(localStorage.getItem('userData'))
: null

if (userData)
  {
const value = userData[0] ? userData[0] : null;



  if (value) {
    setusername(value.user_Name);
    setclassID(value.classId);
    console.log("pls",value.classId)
    dispatch(dropdown({classid: value.classId}))
    dispatch(getDashboard({username : value.user_Name}));
      }
    }
  else
  {
    console.log("bye bye")
    localStorage.removeItem("userData");
      navigate('/');
  }
 }, [])  

  const [students, setStudents] = useState([]);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filter , setFilter] = useState([]);
  const [selectedOption, setSelectedOption] = useState();

  const fetchStudents = async () => { 
    setIsLoading(true);
    try {
    
    if (dashboardInfo.data.length > 0) {
        setStudents(dashboardInfo.data);
        console.log("student", dashboardInfo.data); // Log the updated result directly
      }
      console.log(dashboardInfo.data.length);
    } catch (err) {
      console.log(err);
    }
    finally {
      setIsLoading(false);
    }
  };


console.log("class id", classId)
  useEffect(() => {
    fetchStudents();
    
  }, [username]);


  console.log("stu",students)

  console.log("dropdown data from redux", dropdownData.data)
  const transformData = (data) => {
    return data.map((student, index) => ({
      sno: index + 1, // Increment index by 1 to start from 1
      studentId: student.student_Id, // Assuming student_Id is unique and padded with leading zeros
      studentName: student.name,
      className : student.classSectionName
    }));
  };
  
  useEffect(() => {
    console.log("agaaain")
    const transformedData = transformData(students);
    console.log("transformedData", transformedData);
    setData(prevData => {
      // Update data based on previous state
      return transformedData;
    });
    setFilter(prevData => { 
      // Update filter based on previous state
      return transformedData;
  });
  }, [students]);
    
  useEffect(() => {
    const filtered = data.filter((item) => {
      // Ensure item.studentId is converted to a string before calling toLowerCase()
      const studentId = (item.studentId || '').toString().toLowerCase();
      const studentName = (item.studentName || '').toLowerCase();
      return studentName.includes(searchText.toLowerCase()) || studentId.includes(searchText.toLowerCase());
    });
    setFilter(filtered);
  }, [searchText, data]);

  
  

  

  const handleDropdownChange = (e) => {
    console.log("e",e.target.value)
    setSelectedOption(e.target.value);
    console.log("se",selectedOption)
    // Add logic here to handle the selected dropdown option
  };

  const className = students.length > 0 ? students[0].classSectionName : '';
  if (isLoading) {
    return <Spinner />; // Show a spinner while data is loading
  }
  return (
    <div className="col-md-8 mx-auto" style={{ width: '100%' }}>
      <div>
        <div className='row'>
          <div className='col-md-12 text-center'><h3>IEP(Individual Education Program)</h3></div>
          <div className='col-md-12'>
            <h4 className='text-center'><strong>Class Name: {className}</strong></h4>
          </div>
        </div>
        <div className="mb-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <label style={{ marginRight: '10px' }}>Select Terms:</label>
          <select className="form-control" value={selectedOption} onChange={handleDropdownChange} style={{ width: '200px' }}>
            <option value="">Select Option</option>
            {/* {Array.isArray(dropdownData.data) && dropdownData.data.length > 0 ? (
    dropdownData.data.map(option => (
      <option key={option.termGroup_Id} value={option.termGroup_Id}>{option.type}</option>
    ))
  ) : (
    <option>Loading...</option>
  )} */}{Array.isArray(dropdownData.data) && dropdownData.data.length > 0 ? (
  dropdownData.data
  .filter(option => option.termGroup_Id === 1)
  .map(option => (
    <option key={option.termGroup_Id} value={option.termGroup_Id}>{option.type}</option>
  ))
) : (
<option>Loading...</option>
)}
          </select>
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e)=>setSearchText(e.target.value)}
            className="form-control"
            style={{ width: '300px', margin: '0 auto' }}
          />
        </div>
        <DataTable
          columns={columns}
          data={filter} // Pass filtered data to the DataTable
          pagination
          responsive
          striped
          bordered
          noHeader
          style={{
            textAlign: 'center',
            borderCollapse: 'collapse',
            marginTop: '20px',
            marginBottom: '20px',
            padding : '0px',
            width: '100%' // Set width to 100%
          }}
        />
      </div>
    </div>
  );
};

export default R_DataTable;
