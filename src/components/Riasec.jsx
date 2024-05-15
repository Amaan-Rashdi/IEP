import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Spinner from './Spinner';
import Error from './Error';

const Riasec = ({ onSelectionChange }) => {
  const { loading, error, counselorDetails } = useSelector(state => state.counselor);
  const {counselor_updateInfo} = useSelector(state => state.counselor_update);
  const [RiaseccheckedCount, setRiaseccheckedCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});

  useEffect(() => {
    if (!counselor_updateInfo || counselor_updateInfo.length === 0) return;

    const initialCheckboxes = {};
    const initialSelectedIds = [];
    if(counselor_updateInfo && counselor_updateInfo[0])
      {
    const { ieP_DETAILs } = counselor_updateInfo[0];
    const updateIds = [ieP_DETAILs.riasecId_1, ieP_DETAILs.riasecId_2, ieP_DETAILs.riasecId_3].filter(id => id !== 0);

    counselorDetails.dataRiasec.forEach(item => {
      const isChecked = updateIds.includes(item.id);
      initialCheckboxes[item.name] = isChecked;
      if (isChecked) {
        initialSelectedIds.push(item.id.toString());
      }
    });

    setCheckboxes(initialCheckboxes);
    setSelectedIds(initialSelectedIds);
    setRiaseccheckedCount(initialSelectedIds.length);
    onSelectionChange(initialSelectedIds);}

  }, [counselorDetails.dataRiasec, counselor_updateInfo]);

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    const newCheckboxes = { ...checkboxes, [name]: checked };
    setCheckboxes(newCheckboxes);

    const updatedSelectedIds = checked
      ? [...selectedIds, value]
      : selectedIds.filter(id => id !== value);
    
    setSelectedIds(updatedSelectedIds);
    setRiaseccheckedCount(updatedSelectedIds.length);
    onSelectionChange(updatedSelectedIds);
  };

  if (loading) return <Spinner>Loading...</Spinner>;
  if (error) return <Error>{error}</Error>; 

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th colSpan={3} className="text-center">
              Highest Interest Codes from the RIASEC Aptitude Test (Select 3)
            </th>
          </tr>
        </thead>
        <tbody>
          {counselorDetails.dataRiasec.map((item, index) => (
            index % 3 === 0 && (
              <tr key={index}>
                {[index, index + 1, index + 2].map(subIndex => (
                  subIndex < counselorDetails.dataRiasec.length && (
                    <td key={counselorDetails.dataRiasec[subIndex].id} className="checkbox-cell">
                      <input
                        type="checkbox"
                        style={{ marginLeft: '10px' }}
                        value={counselorDetails.dataRiasec[subIndex].id}
                        name={counselorDetails.dataRiasec[subIndex].name}
                        checked={checkboxes[counselorDetails.dataRiasec[subIndex].name]}
                        onChange={handleCheckboxChange}
                        disabled={RiaseccheckedCount === 3 && !checkboxes[counselorDetails.dataRiasec[subIndex].name]}
                      />
                      <span style={{ marginLeft: '10px' }}>{counselorDetails.dataRiasec[subIndex].name}</span>
                    </td>
                  )
                ))}
              </tr>
            )
          ))}
        </tbody>  
      </table>
      <p>{`Selected ${RiaseccheckedCount} out of 3 checkboxes`}</p>
    </div>
  );
};

export default Riasec;
