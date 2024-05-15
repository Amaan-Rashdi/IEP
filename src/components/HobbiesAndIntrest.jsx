import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import Error from "./Error";

const HobbiesAndInterest = ({onSelectionChange}) => {
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const { loading, error, counselorDetails } = useSelector((state) => state.counselor);
  const { counselor_updateInfo } = useSelector(state => state.counselor_update);
  
  const handleCheckboxChange = (hobbyId) => {
    if (selectedHobbies.includes(hobbyId)) {
      setSelectedHobbies(selectedHobbies.filter((h) => h !== hobbyId));
    } else if (selectedHobbies.length < 2) {
      setSelectedHobbies([...selectedHobbies, hobbyId]);
    }
  };

  const isCheckboxDisabled = (hobbyId) => {
    return selectedHobbies.length === 2 && !selectedHobbies.includes(hobbyId);
  };

  useEffect(() => {
    // Initialize selected hobbies from counselor_updateInfo
    if   (counselor_updateInfo && counselor_updateInfo[0] && counselor_updateInfo[0].ieP_DETAILs) {
      const hobbies = [];
      if (counselor_updateInfo[0].ieP_DETAILs.hobbies_1) {
        hobbies.push(counselor_updateInfo[0].ieP_DETAILs.hobbies_1);
      }
      if (counselor_updateInfo[0].ieP_DETAILs.hobbies_2) {
        hobbies.push(counselor_updateInfo[0].ieP_DETAILs.hobbies_2);
      }
      setSelectedHobbies(hobbies);
    }
  }, [counselor_updateInfo]);

  useEffect(() => {
    // Call the callback function to pass selected hobby IDs to the parent component
    onSelectionChange(selectedHobbies);
  }, [selectedHobbies, onSelectionChange]);

  if (loading) return <Spinner>Loading...</Spinner>;
  if (error) return <Error>{error}</Error>; 

  return (
    <div className="container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th style={{ background: "#f2f2f2" }} className="text-center" colSpan={3}>
              Hobbies / Interests (Maximum 2)*
            </th>
          </tr>
        </thead>
        <tbody>
          {counselorDetails.dataHobbies.map((item, index) => (
            index % 3 === 0 && (
              <tr key={index}>
                {counselorDetails.dataHobbies.slice(index, index + 3).map((subItem, subIndex) => (
                  <td key={subItem.id} style={{ width: "150px" }} className="checkbox-cell">
                    <input
                      type="checkbox"
                      name={subItem.name}
                      style={{ marginLeft: '10px' }}
                      checked={selectedHobbies.includes(subItem.id)}
                      onChange={() => handleCheckboxChange(subItem.id)}
                      disabled={isCheckboxDisabled(subItem.id)}
                    />
                    <label style={{ marginLeft: '10px' }}>{subItem.name}</label>
                  </td>
                ))}
              </tr>
            )
          ))}
        </tbody>
      </table>
      {/* <button onClick={handleNext}>Next Step</button> */}
    </div>
  );
};

export default HobbiesAndInterest;
