import React , { useEffect, useRef, useState } from 'react';
import '../styles/StudentDetails.css'; // Add your CSS file for styling
import Header from '../components/Header';
import Swal from 'sweetalert2'; // Import SweetAlert library
import { ProgressBar, Form } from 'react-bootstrap'; // Import Bootstrap components
import { useDispatch, useSelector } from 'react-redux';
import { getTeacher } from '../state/Teacher/TeacherAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { postIEPData } from '../state/IEPPost/IEPSlice';
import Error from '../components/Error';
import Spinner from '../components/Spinner';


const TextEditor = ({editorContent, setEditorContent }) => {
  const [text, setText] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleTextChange = (event) => {
    const newText = event.target.value;
    const newCharCount = newText.length;
    if (newCharCount <= 600) {
      setText(newText);
      setCharCount(newCharCount);
      setEditorContent(newText); // Update editorContent state here
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Limit Exceeded!',
        text: 'Maximum 600 characters allowed.',
      });
      // Truncate the text to 600 characters
      setText(newText.substring(0, 600));
      setCharCount(600);
      setEditorContent(newText.substring(0, 600)); // Update editorContent state here
    }
  };

  return (
    <div className="text-editor">
      <Form.Group controlId="textArea">
        <Form.Control
          as="textarea"
          value={editorContent}
          onChange={handleTextChange}
          placeholder="Type your text here..."
          rows={10}
          maxLength={600}
        />
      </Form.Group>
      <div className="char-count">
        <p>Characters: {charCount}/600</p>
        <ProgressBar now={(charCount / 600) * 100} />
      </div>
    </div>
  );
};



const StudentDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, studentDetails } = useSelector((state) => state.student);
  const { termId, studentId } = useParams();
  const [editorContent, setEditorContent] = useState('');
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [username , setusername] = useState("");
  const [classId, setclassID] = useState("");
  const [sessionId, setsessionid] = useState("");

 

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
      setsessionid(value.sessionID);
      console.log("pls",value.classId)
    
        }
      }
    else
    {
      console.log("bye bye")
      localStorage.removeItem("userData");
        navigate('/');
    }
   }, [])  
  useEffect(() => {
    dispatch(getTeacher({ termId: termId, studentId: studentId}));
  }, [dispatch]);
  useEffect(() => {
    console.log("Teacher")
    setIsSaveButtonDisabled(!(editorContent && studentDetails && studentDetails.studentsDetails.length > 0));
  }, [editorContent, studentDetails]);

//for updating
  useEffect(() => {

    const fetchData = async () => {
      try {
        console.log(studentId,"stud",termId,"term","sess",sessionId)
        const response = await fetch(`http://192.168.1.9:8092/api/IEP?studentid=${studentId}&termID=${termId}&sessionID=${sessionId}`);
        const data = await response.json();
        console.log("data of updayte",data.data)
         if (data.data && data.data.length > 0) {
          console.log("timesup")
           setEditorContent(data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [studentId, termId, sessionId]);
  


  if (loading) return <Spinner>Loading...</Spinner>;
  if (error) return <Error>{error}</Error>;  
console.log("studen from frontend",studentDetails )

if (!studentDetails || !studentDetails.studentsDetails) {
  return <div>No student details available</div>;
}

const firstStudent = studentDetails.studentsDetails[0];
const handlesavebutton = async() => {
  console.log()
  if(editorContent===null)
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please write remarks.',
      });
      return;
    }
  else{
  console.log("cotent", editorContent)
  const postData = {
    "studentId": firstStudent.student_Id,
    "studentName": firstStudent.studentName,
    "createdBy": username,
    createdOn: new Date(), 
    isDeleted: false, 
    
    classTeacherDeatils: [
      {
        classID: classId,
        sessionId: sessionId,
        termId: firstStudent.term,
        classTeacherRemarks: editorContent,
        completeStatus: true,
        createdBy: username,
        createdOn: new Date(), 
        isDeleted: false
      }
    ]
  };
  try {
   // console.log("json parse", JSON.parse(postData));
    console.log("postData",JSON.stringify(postData));
    await dispatch(postIEPData(JSON.stringify(postData)));
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Your IEP has been saved successfully.',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/dashboard'; // Refresh the page
      }
    });
    console.log("hogyi post api")
  } catch (error) {
    console.log("error", error);
  }}
};

const handleupdate = () => {}

console.log("firstStudent",firstStudent)
return (
  <div className="container">
    <Header />
    <table>
      <thead>
        <tr>
          <th colSpan="4" className="text-center">
            STUDENT DETAIL
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>{firstStudent?.studentName}</td>

          <td>ERP</td>
          <td>{firstStudent?.student_Id}</td>
        </tr>
        <tr>
          <td>Class</td>
          <td>{firstStudent?.class_Name}</td>

          <td>Subject Group</td>
          <td>{firstStudent?.class_Name}</td>
        </tr>
      </tbody>
    </table>
  <hr></hr>

    <table className='table table-bordered'>
      <thead>
        <tr>
      <th colSpan="6" style={{width:'200px',padding:'2px',border:'solid black 1px',background:'#f2f2f2'}} className='text-center'>Results of 9th Term First</th></tr>
      <tr>
          <th style={{width:'200px',padding:'2px',border:'solid black 1px'}}>Subject</th>
          <th style={{width:'200px',padding:'2px',border:'solid black 1px'}}>Grade</th>
          <th style={{width:'200px',padding:'2px',border:'solid black 1px'}}>Subject</th>
          <th style={{width:'200px',padding:'2px',border:'solid black 1px'}}>Grade</th> 
          <th style={{width:'200px',padding:'2px',border:'solid black 1px'}}>Subject</th>
          <th style={{width:'200px',padding:'2px',border:'solid black 1px'}}>Grade</th>
        </tr>
      </thead>
      <tbody>
    {studentDetails.studentsDetails.reduce((rows, subject, index) => {
        if (index % 3 === 0) rows.push([]);
        rows[rows.length - 1].push(
            <React.Fragment key={subject.subject_Id}>
                <td style={{ width: '200px', border: 'solid 1px black', padding: '3px' }}>{subject.subject_Name}</td>
                <td style={{ width: '200px', border: 'solid 1px black', padding: '3px' }}>{subject.grade}</td>
            </React.Fragment>
        );
        return rows;
    }, []).map((row, index) => (
        <tr key={index}>
            {row}
        </tr>
    ))}
</tbody>
                       
    </table>
    <hr></hr>
    <table className='table table-bordered'>
      <thead>
      <tr>
      <th colSpan='2' style={{width:'200px',padding:'2px',border:'solid black 1px',background:'#f2f2f2'}} className='text-center'>CAIE Results</th>
    </tr>
        <tr>
          <th style={{width:'200px',padding:'2px',border:'solid black 1px'}}>Subject</th>
          <th style={{width:'200px',padding:'2px',border:'solid black 1px'}}>Grade</th>
        </tr>
      </thead>
      <tbody>
        
      {studentDetails.caieResult.length > 0 ? (
    studentDetails.caieResult.map((subject) => (
      <tr key={subject.subject_Id}>
        <td style={{width:'200px',padding:'2px',border:'solid black 1px'}}>{subject.subject_Name}</td>
        <td style={{width:'200px',padding:'2px',border:'solid black 1px'}}>{subject.grade}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="2" style={{width:'200px',padding:'2px',border:'solid black 1px',background:'#f2f2f2'}} className="text-center">No data available</td>
    </tr>
  )}
      </tbody>
    </table>

    <div className="remarks">
      <h5 className="text-center"><strong>Class Teacher remarks</strong></h5>

    </div>

    <TextEditor editorContent={editorContent} setEditorContent={setEditorContent} />


    <button className='btn btn-primary btn-sm mt-2' style={{float:'right'}} onClick={handlesavebutton}  disabled={isSaveButtonDisabled}>

      <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
          <span style={{marginLeft:'5px'}}>SAVE RECORD</span>
    </button>
  </div>
);
};

export default StudentDetails;

