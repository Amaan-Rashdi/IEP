import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Error from "../components/Error";

const PersonalStrengths = ({ onStrengthSelectionChange, onDevelopmentSelectionChange }) => {
    const { loading, error, counselorDetails } = useSelector((state) => state.counselor);
    const { counselor_updateInfo } = useSelector(state => state.counselor_update);
    const [selectedStrengths, setSelectedStrengths] = useState({ strength: [], development: [] });

    // Function to handle checkbox changes
    const handleCheckboxChange = (e, value, columnName) => {
        console.log("hi",value,columnName)
        const selectedColumn = selectedStrengths[columnName];
        const otherColumn = columnName === 'strength' ? 'development' : 'strength';

        if (e.target.checked) {
            if (selectedColumn.length >= 2 || selectedColumn.includes(value) || selectedStrengths[otherColumn].includes(value)) {
                // Do not allow checking if already selected 2 or present in other column
                return;
            }
            setSelectedStrengths(prevState => ({
                ...prevState,
                [columnName]: [...prevState[columnName], value]
            }));
                
        } else {
            setSelectedStrengths(prevState => ({
                ...prevState,
                [columnName]: prevState[columnName].filter(item => item !== value)
            }));
        }
    };

    // Function to determine if a checkbox should be checked based on selected strengths
    const isCheckboxChecked = (value, columnName) => {
        console.log(value,columnName)
        return selectedStrengths[columnName].includes(value);
    };

    useEffect(() => {
        
        if (counselor_updateInfo && counselor_updateInfo[0] && counselor_updateInfo[0].ieP_DETAILs) {
            const {
                personalStrenghth_1,
                personalStrenghth_2,
                qualitiesToDevelop_1,
                qualitiesToDevelop_2
            } = counselor_updateInfo[0].ieP_DETAILs;
            setSelectedStrengths({
                strength: [personalStrenghth_1, personalStrenghth_2],
                development: [qualitiesToDevelop_1, qualitiesToDevelop_2]
            });
        }
    }, [counselor_updateInfo]);

    useEffect(() => {
        onStrengthSelectionChange(selectedStrengths.strength);
    }, [selectedStrengths.strength, onStrengthSelectionChange]);
    
    useEffect(() => {
        onDevelopmentSelectionChange(selectedStrengths.development);
    }, [selectedStrengths.development, onDevelopmentSelectionChange]);

    if (loading) return <Spinner>Loading...</Spinner>;
    if (error) return <Error>{error}</Error>; 

    return (
        <div className="container">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center', background: '#f2f2f2' }} colSpan={3}>Add Personal Strengths and qualities to develop (Two from each column)*</th>
                    </tr>
                    <tr>
                        <th style={{ width: '30%', textAlign: 'center' }}>Qualities</th>
                        <th style={{ width: '35%', textAlign: 'center' }}>My Strength</th>
                        <th style={{ width: '35%', textAlign: 'center' }}>I want to develop</th>
                    </tr>
                </thead>
                <tbody>
                    {counselorDetails.dataQulities.map((item, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: 'center' }}>{item.name}</td>
                            <td style={{ textAlign: 'center' }}>
                                <input
                                    type="checkbox"
                                    value={item.id}
                                    onChange={(e) => handleCheckboxChange(e, item.id, 'strength')}
                                    checked={isCheckboxChecked(item.id, 'strength')}
                                />
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                <input
                                    type="checkbox"
                                    value={item.id}
                                    onChange={(e) => handleCheckboxChange(e, item.id, 'development')}
                                    checked={isCheckboxChecked(item.id, 'development')}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PersonalStrengths;
