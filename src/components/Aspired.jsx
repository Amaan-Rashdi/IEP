import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import Error from "./Error";

const Aspired = ({ onSelectionChange }) => {
  const { loading, error, counselorDetails } = useSelector((state) => state.counselor);
  const {counselor_updateInfo} = useSelector(state => state.counselor_update);
  const [AspiredcheckedCount, setAspiredcheckedCount] = useState(0);
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  const [otherText, setOtherText] = useState("");
  useEffect(() => {
    const initialCheckboxes = {};
    const initialSelectedIds = [];
    let otherCareerChoices = "";
  
    if (counselor_updateInfo && counselor_updateInfo.length > 0 && counselor_updateInfo[0].ieP_DETAILs) {
      const { careerChoices_1, careerChoices_2, otherCareerChoices: otherCareerChoicesFromData } = counselor_updateInfo[0].ieP_DETAILs;
  
      counselorDetails.dataCareerChoice.forEach(item => {
        const isChecked = [careerChoices_1, careerChoices_2].includes(item.id);
        initialCheckboxes[item.name] = isChecked;
        if (isChecked) {
          initialSelectedIds.push(item.id.toString());
        }
      });
  
      otherCareerChoices = otherCareerChoicesFromData || "";
    }
  
    setCheckboxes(initialCheckboxes);
    setSelectedIds(initialSelectedIds);
    setOtherText(otherCareerChoices);
    setAspiredcheckedCount(initialSelectedIds.length);
  
    // Assuming onSelectionChange is a function that takes an object argument
    onSelectionChange({
      selectedIds: initialSelectedIds,
      othersText: otherCareerChoices
    });
  }, [counselor_updateInfo, counselorDetails.dataCareerChoice]); // Add counselor_updateInfo and counselorDetails.dataCareerChoice to the dependency array
  




  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    const newCheckboxes = { ...checkboxes, [name]: checked };

    setCheckboxes(newCheckboxes);

    const count = Object.values(newCheckboxes).filter((value) => value).length;
    setAspiredcheckedCount(count);

    const updatedSelectedIds = checked ? [...selectedIds, value] : selectedIds.filter(id => id !== value);
    setSelectedIds(updatedSelectedIds);

    if (count <= 2) {
      onSelectionChange({
        selectedIds: updatedSelectedIds.filter(id => id !== "Others"),
        othersText: checkboxes.Others ? otherText : ''
      });
    }
  };

  const handleOtherCheckboxChange = (event) => {
    const { checked } = event.target;
    setCheckboxes(prev => ({ ...prev, Others: checked }));

    const count = Object.values({ ...checkboxes, Others: checked }).filter((value) => value).length;
    setAspiredcheckedCount(count);

    if (count <= 2) {
      onSelectionChange({
        selectedIds: selectedIds.filter(id => id !== "Others"),
        othersText: checked ? otherText : ''
      });
    }
  };

  const handleOtherTextChange = (event) => {
    const text = event.target.value;
    setOtherText(text);

    if (checkboxes.Others) {
      onSelectionChange({
        selectedIds: selectedIds.filter(id => id !== "Others"),
        othersText: text
      });
    }
  };

  if (loading) return <Spinner>Loading...</Spinner>;
  if (error) return <Error>{error}</Error>;

  return (
    <div className="container">
      <table className="table table-hover text-center">
        <thead>
          <tr>
            <th colSpan={3} className="text-center">
              Aspired career choices (Minimum 1, Maximum 2)*
            </th>
          </tr>
        </thead>
        <tbody>
          {counselorDetails.dataCareerChoice.map((item, index) => (
            index % 3 === 0 && (
              <tr key={index}>
                {counselorDetails.dataCareerChoice.slice(index, index + 3).map((subItem, subIndex) => (
                  <td key={subItem.id} style={{ width: "150px" }} className="checkbox-cell">
                    <input
                      type="checkbox"
                      name={subItem.name}
                      value={subItem.id}
                      style={{ marginLeft: '10px' }}
                      checked={checkboxes[subItem.name]}
                      onChange={handleCheckboxChange}
                      disabled={AspiredcheckedCount === 2 && !checkboxes[subItem.name]}
                    />
                    <label style={{ marginLeft: '10px' }}>{subItem.name}</label>
                  </td>
                ))}
              </tr>
            )
          ))}
          <tr>
            <td colSpan={3}>
              <div style={{ display: "flex" }}>

                <input
                  type="text"
                  style={{ marginLeft: '10px', border: "2px solid black", width: "300px", height: "30px" }}
                  className="form-control col-md-4"
                  hidden={!checkboxes.Others}
                  value={otherText}
                  onChange={handleOtherTextChange}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p>{`Selected ${AspiredcheckedCount} out of 2 career choices`}</p>
    </div>
  );
};

export default Aspired;
