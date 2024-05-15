import { useEffect, useState } from "react";
import Header from "../components/Header";
import StudentInformation from "../components/StudentInformation";
import Risec from '../components/Riasec';
import Prefrence from "../components/Preference";
import College from "../components/College";
import PersonalStrengths from "../components/PersonalStrengths";
import HobbiesAndIntrest from "../components/HobbiesAndIntrest";
import HonorsAndAward from "../components/HonorsAndAward";
import ProfileBuilding from "../components/ProfileBuilding";
import PersonalStatement  from "../components/PersonalStatement";
import Recommendation from '../components/Recommendation';
import TeacherRecommendation from "../components/TeacherRecommendation";
const GC = () =>{

    const [step, setStep] = useState(1); // Track current step
    const [hobbiesData, setHobbiesData] = useState({});
    const [honorsAwardsData, setHonorsAwardsData] = useState({});
    const handleNextStep = (data) => {
        // Save data entered in current step and move to next step
        if (step === 1) {
          setHobbiesData(data); // Save hobbies data
        } else if (step === 2) {
          setHonorsAwardsData(data); // Save honors & awards data
        }
        setStep(step + 1); // Move to next step
      };
      const handleSubmit = () => {
        // Submit all collected data to the server using API call
        console.log('Submitted Data:', {
          hobbies: hobbiesData,
          honorsAwards: honorsAwardsData
        });
        // Make API call to submit data
      };
    return (
        <div>
            <Header></Header>
            <br></br>
            <StudentInformation></StudentInformation>
            <br></br>
            {/* {step === 1 && (
        <HobbiesAndIntrest onNextStep={handleNextStep} />
      )}
      {step === 2 && (
        <HonorsAndAward onNextStep={handleNextStep} />
      )}
      {step === 3 && (
        <ProfileBuilding onNextStep={handleSubmit} />
      )} */}
        {/* {step === 4 && (
        <SubmitButton onSubmit={handleSubmit} />
      )} */}


            <Risec></Risec>
            <br></br>
         
            <br></br>
            <Prefrence></Prefrence>
            <br></br>
            <College></College>
            <br></br>
            <PersonalStrengths></PersonalStrengths>
            <br></br>
            <HobbiesAndIntrest></HobbiesAndIntrest>
            <br></br>
            <HonorsAndAward></HonorsAndAward>
            <br></br>
            <ProfileBuilding></ProfileBuilding>

            <br></br>
            <PersonalStatement></PersonalStatement>
            <br></br>
            <Recommendation/>
            <br></br>
            <TeacherRecommendation/>
        </div>

    );
}
export default GC;