import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Spinner from './Spinner';
import Error from './Error';
import { getCounselor_Dashboard } from '../state/dashboard-counselor/C_dashboardAction';
import { dropdown } from '../state/dropdown/dropdownAction';

const C_DataTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, counselor_dashboardInfo } = useSelector(state => state.counselor_dashboard);
  const { dropdownData } = useSelector(state => state.dropdown);

  const [selectedOption, setSelectedOption] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const counselor = JSON.parse(localStorage.getItem('counselor'));
    if (counselor && counselor[0]) {
      const { center_Id } = counselor[0];
      console.log('Dispatching getCounselor_Dashboard');
      dispatch(getCounselor_Dashboard({ username: center_Id }));
      dispatch(dropdown({ classid: 14 }));
    } else {
      localStorage.removeItem("counselor");
      navigate('/');
    }
  }, [dispatch, navigate]);

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const clickiep = (studentId, masterId) => {
    if (selectedOption) {
      navigate(`/iep/${selectedOption}/${studentId}/${masterId}`);
    } else {
      Swal.fire({
        icon: "error",
        text: "Please select term first!",
      });
    }
  };

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
      name: 'Class Name',
      selector: row => row.className,
      sortable: true,
      center: true,
      style: {
        textAlign: 'center',
        border: '0px solid black',
        color: 'black',
      }
    },
    {
      name: 'Section Name',
      selector: row => row.Section,
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
          onClick={() => clickiep(row.studentId, row.masterId)}
        >
          <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
          {row.text} IEP
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

  const transformedData = counselor_dashboardInfo.data?.map((student, index) => ({
    sno: index + 1,
    studentId: student.student_Id,
    studentName: student.first_Name,
    className: student.class_Name,
    Section: student.sectionName,
    classId: student.grade_Id,
    masterId: student.ieP_Master_ID,
    text: student.ieP_Master_ID === 0 ? "Fill" : "Update"
  })) || [];

  const filteredData = transformedData.filter(item => {
    return item.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
           item.studentId.toString().toLowerCase().includes(searchText.toLowerCase()) ||
           item.className.toLowerCase().includes(searchText.toLowerCase()) ||
           item.Section.toLowerCase().includes(searchText.toLowerCase());
  });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error message={error} />;
  }
 
  return (
    <div className="col-md-8 mx-auto" style={{ width: '100%' }}>
      <div>
      <div className='row'>
        <div className='col-md-12 text-center'><h3>IEP (Individual Education Program)</h3></div>
        <div className='col-md-12'>
            <h4 className='text-center'><strong>School: {counselor_dashboardInfo && counselor_dashboardInfo.data && counselor_dashboardInfo.data[0].center_Name ? counselor_dashboardInfo.data[0].center_Name : 'Not available'}</strong></h4>
            </div>
            </div>
        <div className="mb-3" style={{ display: 'flex',  alignItems: 'center' }}>
          <label style={{ marginRight: '10px' }}>Select Terms:</label>
          <select className="form-control" value={selectedOption} onChange={handleDropdownChange} style={{ width: '200px' }}>
            <option value="">Select Option</option>
            {/* {dropdownData.data.map(option => (
              <option key={option.termGroup_Id} value={option.termGroup_Id}>{option.type}</option>
            ))} */}
            {Array.isArray(dropdownData.data) && dropdownData.data.length > 0 ? (
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
            onChange={e => setSearchText(e.target.value)}
            className="form-control"
            style={{ width: '300px', margin: '0 auto' }}
          />
        </div>
        <DataTable
          columns={columns}
          data={filteredData}
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
            padding: '0px',
            width: '100%'
          }}
        />
      </div>
    </div>
  );
};

export default C_DataTable;
