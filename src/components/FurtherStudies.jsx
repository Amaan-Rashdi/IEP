import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import Error from "./Error";

const FurtherStudies = ({ onSelectionChange }) => {
    const {counselor_updateInfo} = useSelector(state => state.counselor_update);
    const [selectedOption, setSelectedOption] = useState("");

    // Initialize the component with data from counselor_updateInfo
    useEffect(() => {
        if (counselor_updateInfo && counselor_updateInfo.length > 0) {
            const furtherStudiesValue = counselor_updateInfo[0].ieP_DETAILs.furtherStudies ? "1" : "0";
            setSelectedOption(furtherStudiesValue);
        }
    }, [counselor_updateInfo]);

    // Call the callback function to pass selected option to the parent component
    useEffect(() => {
        onSelectionChange(selectedOption);
    }, [selectedOption, onSelectionChange]);

    const handleOptionChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
    };

    if (!counselor_updateInfo) return <Spinner />; // Show spinner while loading the initial data
    if (!counselor_updateInfo.length) return <Error message="No update information available" />; // Error if no data

    return (
        <div className="container">
            <table>
                <thead style={{background: '#f2f2f2'}}>
                    <tr>
                        <th colSpan={2} style={{textAlign: 'center'}}>Preference for further studies*</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ width: "250px" }}>
                            <label>
                                <input
                                    style={{ marginLeft: "20px" }}
                                    value={"1"}
                                    type="radio"
                                    name="furtherStudies"
                                    checked={selectedOption === "1"}
                                    onChange={handleOptionChange}
                                /> A-Level
                            </label>
                        </td>
                        <td style={{ width: "250px" }}>
                            <label>
                                <input
                                    value={"0"}
                                    style={{ marginLeft: "20px" }}
                                    type="radio"
                                    name="furtherStudies"
                                    checked={selectedOption === "0"}
                                    onChange={handleOptionChange}
                                /> HSSC
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default FurtherStudies;
