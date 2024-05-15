import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import Error from "./Error";

const PreferredSubjects = ({ onSelectionChange }) => {
    const { loading, error, counselorDetails } = useSelector((state) => state.counselor);
    const { counselor_updateInfo } = useSelector(state => state.counselor_update);
    const [checkedSubjects, setCheckedSubjects] = useState([]);

    useEffect(() => {
        if (counselor_updateInfo && counselor_updateInfo.length > 0 && counselor_updateInfo[0].ieP_DETAILs) {
            // Assume the property names for subjects are stored in a consistent manner like subject1_Id, subject2_Id, etc.
            const subjectsFromUpdateInfo = [];
            if (counselor_updateInfo[0].ieP_DETAILs.subjectForFurtherStudies_1) subjectsFromUpdateInfo.push(counselor_updateInfo[0].ieP_DETAILs.subjectForFurtherStudies_1);
            if (counselor_updateInfo[0].ieP_DETAILs.subjectForFurtherStudies_2) subjectsFromUpdateInfo.push(counselor_updateInfo[0].ieP_DETAILs.subjectForFurtherStudies_2);
            if (counselor_updateInfo[0].ieP_DETAILs.subjectForFurtherStudies_3) subjectsFromUpdateInfo.push(counselor_updateInfo[0].ieP_DETAILs.subjectForFurtherStudies_3);
            if (counselor_updateInfo[0].ieP_DETAILs.subjectForFurtherStudies_4) subjectsFromUpdateInfo.push(counselor_updateInfo[0].ieP_DETAILs.subjectForFurtherStudies_4);

            const matchedSubjectIds = counselorDetails.dataSubject_A1
                .filter(subject => subjectsFromUpdateInfo.includes(subject.subject_Id))
                .map(subject => subject.subject_Id);
            setCheckedSubjects(matchedSubjectIds);
        }
    }, [counselorDetails, counselor_updateInfo]);

    useEffect(() => {
        // Update the parent component whenever checkedSubjects changes
        onSelectionChange(checkedSubjects);
    }, [checkedSubjects, onSelectionChange]);

    const handleCheckboxChange = (subjectId) => {
        const isChecked = checkedSubjects.includes(subjectId);
        const selectedCount = checkedSubjects.length;
    
        if (!isChecked && selectedCount >= 4) {
            // If trying to check a subject and already 4 subjects are selected, return
            return;
        }
    
        setCheckedSubjects(prevCheckedSubjects =>
            isChecked ? prevCheckedSubjects.filter(id => id !== subjectId) : [...prevCheckedSubjects, subjectId]
        );
    };
    

    if (loading) return <Spinner />;
    if (error) return <Error />;

    return (
        <div className="container">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th style={{ background: 'rgb(242, 242, 242)' }} colSpan={3} className="text-center">Preferred subjects for further studies (Minimum 2, Maximum 4)*</th>
                    </tr>
                </thead>
                <tbody>
                    {counselorDetails.dataSubject_A1.map((subject, index) => (
                        index % 3 === 0 && (
                            <tr key={index}>
                                {counselorDetails.dataSubject_A1.slice(index, index + 3).map((subSubject) => (
                                    <td key={subSubject.subject_Id}>
                                        <input
                                            type="checkbox"
                                            checked={checkedSubjects.includes(subSubject.subject_Id)}
                                            onChange={() => handleCheckboxChange(subSubject.subject_Id)}
                                            style={{ marginLeft: '10px' }}
                                        />
                                        <label style={{ marginLeft: '10px' }}>{subSubject.subject_Name}</label>
                                    </td>
                                ))}
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PreferredSubjects;
