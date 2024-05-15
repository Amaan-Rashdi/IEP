import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
const TeacherRecommendation = ({ onInputChange }) => {
    const [textLines, setTextLines] = useState(["", ""]);
    const { counselor_updateInfo } = useSelector(state => state.counselor_update); // State to hold lines separately

    useEffect(() => {
        // Check if counselor_updateInfo is available and contains teacher recommendations
        if (counselor_updateInfo && counselor_updateInfo[0] && counselor_updateInfo[0]?.ieP_DETAILs) {
            const {
                teaherRecommendation_1, 
                teaherRecommendation_2
            } = counselor_updateInfo[0].ieP_DETAILs;

            // Update textLines state with the teacher recommendations
            setTextLines([teaherRecommendation_1 || "", teaherRecommendation_2 || ""]);
        }
    }, [counselor_updateInfo]);
    // Function to handle change in the textarea input
    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length > 200) {
            // Display an alert when the character limit is exceeded
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You can only type up to 200 characters!',
            });
            return; // Exit the function to prevent updating the state
        }
        // Split input value into lines
        const lines = inputValue.split("\n");

        // Update state to hold lines separately, but limit to 2 lines
        setTextLines(lines.slice(0, 2));

        // Pass the updated lines to the parent component
        onInputChange(lines.slice(0, 2));
    };

    return (
        <div className="container" style={{ display: "flex", alignItems: "flex-start" }}>
            <div style={{ marginRight: "10px", height: "70px" }}>
                <p style={{ margin: 0 }}>1</p>
                <p style={{ margin: 0 }}>2</p>
            </div>
            <textarea
                rows="2"
                style={{ height: "60px" }}
                className="form-control"
                value={textLines.join("\n")} // Join lines with "\n" when displaying
                onChange={handleChange}
            />
        </div>
    );
};

export default TeacherRecommendation;
