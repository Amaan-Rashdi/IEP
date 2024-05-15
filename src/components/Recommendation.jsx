import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
const Recommendation = ({ onInputChange }) => {
   
    const { counselor_updateInfo } = useSelector(state => state.counselor_update);
    const initialText = counselor_updateInfo && counselor_updateInfo[0] ? counselor_updateInfo[0].ieP_DETAILs?.recommendationStudent || "" : "";
    const [recommendation, setRecommendation] = useState(initialText);
    // Function to handle change in the textarea input
    const handleInputChange = (event) => {
        const value = event.target.value;
        if (value.length > 500) {
            // Display an alert when the character limit is exceeded
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You can only type up to 500 characters!',
            });
            return; // Exit the function to prevent updating the state
        }
        setRecommendation(value);
        // Pass the updated recommendation to the parent component
        onInputChange(value);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <label>The person writing a recommendation for the student, should know * </label>
                    <textarea 
                        className="form-control" 
                        cols={5} 
                        rows={5} 
                        placeholder="Write Recommendation here" 
                        style={{resize:'none'}}
                        value={recommendation}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
            </div>
        </div>
    );
}

export default Recommendation;
