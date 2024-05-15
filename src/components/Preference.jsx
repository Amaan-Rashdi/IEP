import { useState , useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import Error from "./Error";
const Prefrence =({onSelectionChange})=>{
    const [selectedOption, setSelectedOption] = useState("");
    const {counselor_updateInfo} = useSelector(state => state.counselor_update);

       // Initialize the component with data from counselor_updateInfo
       useEffect(() => {
        if (counselor_updateInfo && counselor_updateInfo.length > 0) {
            const furtherStudiesValue = counselor_updateInfo[0].ieP_DETAILs.continueAtCity ? "YES" : "NO";
            setSelectedOption(furtherStudiesValue);
        }
    }, [counselor_updateInfo]);
   // Call the callback function to pass selected option to the parent component
   useEffect(() => {
    onSelectionChange(selectedOption);
  }, [selectedOption, onSelectionChange]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
    return (
        <div className="container">
            <table>
                <thead style={{background:'#f2f2f2'}}>
                    <tr>
                    <th colSpan={2} style={{textAlign:'center'}}>Will you be continuing at The City School for your A-Level/HSSC?*</th>
                    </tr>
                </thead>
                <tbody>
          <tr>
            <td style={{ width: "250px" }}>
              <input
                style={{ marginLeft: "20px" }}
                value={"YES"}
                type="radio"
                name="row2"
                checked={selectedOption === "YES"}
                onChange={handleOptionChange}
              />{" "}
              YES
            </td>
            <td style={{ width: "250px" }}>
              <input
                value={"NO"}
                style={{ marginLeft: "20px" }}
                type="radio"
                name="row2"
                checked={selectedOption === "NO"}
                onChange={handleOptionChange}
              />{" "}
              NO
            </td>
          </tr>
        </tbody>

                </table>
        </div>
    )
}
export default Prefrence