import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';

const HonrsAndAward = ({ onAwardsChange }) => {
  const [awards, setAwards] = useState([]);
  const { counselor_updateInfo } = useSelector(state => state.counselor_update);

  useEffect(() => {
    // Initialize awards from API response, including the 'id' from the detail
  
    const initialAwards = counselor_updateInfo && counselor_updateInfo[0] && counselor_updateInfo[0].ieP_DETAILs ? counselor_updateInfo[0].ieP_DETAILs.neW_IEP_HonorAwardsDetails.map(detail => ({
      id: detail.id || 0, // Assuming 'id' is a valid property and defaulting to 0 if not present
      name: detail.award_Honor_Name,
      body: detail.awarding_Body,
      year: detail.year.toString() // Ensure year is converted to string
    })) : [];
    setAwards(initialAwards);
  }, []);

  const handleAddRow = () => {
    setAwards([...awards, { id: 0, name: "", body: "", year: "" }]);
  };

  const handleRemoveRow = (index) => {
    if (awards.length === 1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Cannot delete the last row!',
      });
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const newAwards = [...awards];
        newAwards.splice(index, 1);
        setAwards(newAwards);
        onAwardsChange(newAwards);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newAwards = [...awards];
    newAwards[index][name] = value;
    setAwards(newAwards);
    console.log("awards", awards)
    onAwardsChange(newAwards);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th colSpan={3} className="text-center" style={{ background: "#f2f2f2" }}>Details of Honors and Awards</th>
              </tr>
              <tr>
                <th>Award/Honors</th>
                <th>Awarding Body</th>
                <th>Year</th>
                <th></th> {/* Empty header column for Remove button */}
              </tr>
            </thead>
            <tbody>
              {awards.map((award, index) => (
                <tr key={index}>
                  {/* ID column not rendered here */}
                  <td><textarea cols={22} rows={3} name="name" value={award.name} onChange={(e) => handleInputChange(index, e)} placeholder="Award/Honor" className="form-control" style={{ resize: 'none' }} maxLength={100}></textarea></td>
                  <td><textarea cols={22} rows={3} name="body" value={award.body} onChange={(e) => handleInputChange(index, e)} placeholder="Award Body" className="form-control" style={{ resize: 'none' }} maxLength={100}></textarea></td>
                  <td><input
                        type="text"
                        name="year"
                        value={award.year}
                        onChange={(e) => handleInputChange(index, e)}
                        placeholder="Year"
                        className="form-control"
                        maxLength="4"
                        onInput={(e) => e.target.value = e.target.value.slice(0, 4)}
                    /></td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => handleRemoveRow(index)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary btn-sm" onClick={handleAddRow}>Add Award</button>
        </div>
      </div>
    </div>
  );
};

export default HonrsAndAward;
