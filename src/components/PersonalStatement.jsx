import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
const PersonalStatement = ({ onInputChange }) => {

     const { counselor_updateInfo } = useSelector(state => state.counselor_update);
  
    const initialText = counselor_updateInfo && counselor_updateInfo[0] ? counselor_updateInfo[0].ieP_DETAILs?.personalStatement || "" : "";
    const [statement, setStatement] = useState(initialText);
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
    
        setStatement(value);
        // Pass the updated statement to the parent component
        onInputChange(value);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <label>Personal Statement</label>
                    <textarea 
                        className="form-control" 
                        cols={5} 
                        rows={5} 
                        placeholder="Personal Statement" 
                        style={{resize:'none'}}
                        value={statement}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
            </div>
        </div>
    );
}

export default PersonalStatement;
