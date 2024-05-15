import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
const ProfileBuilding = ({ onSave }) => {
    const { counselor_updateInfo } = useSelector(state => state.counselor_update);
    const [completedActivities, setCompletedActivities] = useState([
        { activity: "", details: "", startDate: "", duration: "" },
        { activity: "", details: "", startDate: "", duration: "" }
    ]);

    const [suggestedActivities, setSuggestedActivities] = useState([
        { activity: "", details: "" },
        { activity: "", details: "" }
    ]);

    useEffect(() => {
        if (!counselor_updateInfo ||  !counselor_updateInfo[0] || !counselor_updateInfo[0].ieP_DETAILs) return; // Check if counselor_updateInfo is undefined
    
        // Initialize completed activities from API response
        const initialCompletedActivities = [
            {
                activity: counselor_updateInfo[0].ieP_DETAILs.completedActivities_1 || "",
                details: counselor_updateInfo[0].ieP_DETAILs.details_1 || "",
                startDate: counselor_updateInfo[0].ieP_DETAILs.startDate_1 ? counselor_updateInfo[0].ieP_DETAILs.startDate_1.split("T")[0] : "",
                duration: counselor_updateInfo[0].ieP_DETAILs.duration_1 ? counselor_updateInfo[0].ieP_DETAILs.duration_1.toString() : ""
            },
            {
                activity: counselor_updateInfo[0].ieP_DETAILs.completedActivities_2 || "",
                details: counselor_updateInfo[0].ieP_DETAILs.details_2 || "",
                startDate: counselor_updateInfo[0].ieP_DETAILs.startDate_2 ? counselor_updateInfo[0].ieP_DETAILs.startDate_2.split("T")[0] : "",
                duration: counselor_updateInfo[0].ieP_DETAILs.duration_2 ? counselor_updateInfo[0].ieP_DETAILs.duration_2.toString() : ""
            }
        ];
    
        setCompletedActivities(initialCompletedActivities);
    
        // Initialize suggested activities from API response
        const initialSuggestedActivities = [
            {
                activity: counselor_updateInfo[0].ieP_DETAILs.suggestedActivities_1 || "",
                details: counselor_updateInfo[0].ieP_DETAILs.suggestedActivitiesDetails_1 || ""
            },
            {
                activity: counselor_updateInfo[0].ieP_DETAILs.suggestedActivities_2 || "",
                details: counselor_updateInfo[0].ieP_DETAILs.suggestedActivitiesDetails_2 || ""
            }
        ];
    
        setSuggestedActivities(initialSuggestedActivities);
    }, [counselor_updateInfo]);
    

    const handleCompletedActivitiesChange = (index, event) => {
        const { name, value } = event.target;
        if (value.length > 50) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You can only type up to 50 characters!',
            });
            return; // Exit the function to prevent updating the state
        }
    
        const updatedActivities = [...completedActivities];
        
        updatedActivities[index][name] = value;
        setCompletedActivities(updatedActivities);
        onSave({ completedActivities: updatedActivities, suggestedActivities });
    };


    const handleDetailActivitiesChange = (index, event) => {
        const { name, value } = event.target;
        if (value.length > 100) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You can only type up to 50 characters!',
            });
            return; // Exit the function to prevent updating the state
        }
    
        // If the input value is within the character limit, update the state
        const updatedActivities = [...completedActivities];
        updatedActivities[index][name] = value;
        setCompletedActivities(updatedActivities);
        onSave({ completedActivities: updatedActivities, suggestedActivities });
    };
    
    const handleSuggestedActivitiesChange = (index, event) => {
        const { name, value } = event.target;
        if (value.length > 50) {
            // Display an alert when the character limit is exceeded
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You can only type up to 50 characters!',
            });
            return; // Exit the function to prevent updating the state
        }
        const updatedActivities = [...suggestedActivities];
        updatedActivities[index][name] = value;
        setSuggestedActivities(updatedActivities);
        onSave({ completedActivities, suggestedActivities: updatedActivities });
    };
    const handleDetailsActivitiesChange = (index, event) => {
        const { name, value } = event.target;
    
        // Check if the input value exceeds the character limit
        if (value.length > 100) {
            // Display an alert when the character limit is exceeded
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You can only type up to 100 characters!',
            });
            return; // Exit the function to prevent updating the state
        }
    
        // If the input value is within the character limit, update the state
        const updatedActivities = [...suggestedActivities];
        updatedActivities[index][name] = value;
        setSuggestedActivities(updatedActivities);
        onSave({ completedActivities, suggestedActivities: updatedActivities });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th colSpan={4} className="text-center" style={{ background: "#f2f2f2" }}>Details of Completed Activities</th>
                            </tr>
                            <tr>
                                <th>Activity</th>
                                <th>Details</th>
                                <th>Start Date</th>
                                <th>Duration (in days)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completedActivities.map((activity, index) => (
                                <tr key={index}>
                                    <td><textarea name="activity" value={activity.activity} onChange={(e) => handleCompletedActivitiesChange(index, e)} placeholder="Activity" className="form-control" style={{ resize: "none" }} /></td>
                                    <td><textarea name="details" value={activity.details} onChange={(e) => handleDetailActivitiesChange(index, e)} placeholder="Details" className="form-control" style={{ resize: "none" }} /></td>
                                    <td><input type="date" name="startDate" value={activity.startDate} onChange={(e) => handleCompletedActivitiesChange(index, e)} className="form-control" /></td>
                                    <td><input type="text" name="duration" value={activity.duration} onChange={(e) => handleCompletedActivitiesChange(index, e)} placeholder="Duration" className="form-control" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th colSpan={2} className="text-center" style={{ background: "#f2f2f2" }}>Details of Suggested Activities</th>
                            </tr>
                            <tr>
                                <th>Activity</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suggestedActivities.map((activity, index) => (
                                <tr key={index}>
                                    <td><textarea name="activity" value={activity.activity} onChange={(e) => handleSuggestedActivitiesChange(index, e)} placeholder="Activity" className="form-control" style={{ resize: "none" }} /></td>
                                    <td><textarea name="details" value={activity.details} onChange={(e) => handleDetailsActivitiesChange(index, e)} placeholder="Details" className="form-control" style={{ resize: "none" }} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProfileBuilding;
