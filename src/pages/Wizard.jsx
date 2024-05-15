import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Aspired from '../components/Aspired';
import Header from '../components/Header';
import StudentInformation from '../components/StudentInformation';
import Riasec from '../components/Riasec';
import Prefrence from '../components/Preference';
import College from '../components/College';
import PersonalStatement from '../components/PersonalStatement';
import PersonalStrengths from '../components/PersonalStrengths';
import ProfileBuilding from '../components/ProfileBuilding';
import Recommendation from '../components/Recommendation';
import TeacherRecommendation from '../components/TeacherRecommendation';

import HobbiesAndInterest from '../components/HobbiesAndIntrest'
import HonrsAndAward from '../components/HonorsAndAward';
import FurtherStudies from '../components/FurtherStudies'
import PreferredSubjects from '../components/PreferredSubjects'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCounselor } from '../state/counselor/CounselorAction';
import Spinner from '../components/Spinner';
import Error from '../components/Error';
import Swal from 'sweetalert2';
import { counIEPData } from '../state/CounselorPOST/COUNSlice';
import { getCounselor_Update } from '../state/CounselorUpdate/CouncelorUpdateAction';
import { backendURL } from '../config/url';
import FormPreview from '../components/FormPreview';

  

const Wizard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { termId , studentId ,masterid } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const { loading, error, counselorDetails } = useSelector((state) => state.counselor);
  const { counselor_updateInfo } = useSelector(state => state.counselor_update);
  const [username , setusername] = useState("");
  const [centerId, setcenterId] = useState("");
  const [sessionId, setsessionid] = useState("");
  const [selectedRiasecIds, setSelectedRiasecIds] = useState([]);
  const [selectedAspiredIds, setSelectedAspiredIds] = useState([]);
  const [selectedFurtherIds, setSelectedFurtherIds] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedPrefIds, setSelectedPrefIds] = useState([]);
  const [selectedcollegetext, setSelectedcollegetext] = useState("");
  const [selectedStrengthIds, setSelectedStrengthIds] = useState([]);
  const [selectedDevelopmentIds, setSelectedDevelopmentIds] = useState([]);
  const [selectedHobbiesIds, setSelectedHobbiesIds] = useState([]);
  const [selectedHnrs, setSelectedHnrs] = useState([]);
  const [selectedProf, setSelectedProf] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedStat, setSelectedStat] = useState("");
  const [selectedRecom, setSelectedRecom] = useState("");
  const [selectedTeach, setSelectedTeach] = useState([]);
  const [initialRiasecIds, setInitialRiasecIds] = useState([]);
  const [apiid,setapiid] = useState(0);

    // Callback function to receive selected IDs from Riasec component
  const handleRiasecSelectionChange = (selectedIds) => {
    setSelectedRiasecIds(selectedIds);
  };
  // Callback function to receive selected IDs from Aspired component
  const handleAspiredSelectionChange = (selectedIds) => {
    setSelectedAspiredIds(selectedIds);
  };
   // Callback function to receive selected IDs from Further studies component
   const handleFurtherSelectionChange = (selectedIds) => {
    setSelectedFurtherIds(selectedIds);
  };
  //Callback function to receive selected IDs from subject component
  const handleSubjectsSelectionChange = (selectedIds) => {
    setSelectedSubjects(selectedIds);
  };
   // Callback function to receive selected IDs from Preference component
   const handlePreferenceSelectionChange = (selectedIds) => {
    setSelectedPrefIds(selectedIds);
  };
  // Callback function to receive selected IDs from college component
  const handleCollegeTextChange = (selectedIds) => {
    setSelectedcollegetext(selectedIds);
  };
// Callback function to receive selected IDs from qualities component
  const handleStrengthSelectionChange = (selectedIds) => {
    setSelectedStrengthIds(selectedIds);
  };

  const handleDevelopmentSelectionChange = (selectedIds) => {
    setSelectedDevelopmentIds(selectedIds);
  };
// Callback function to receive selected IDs from hobbies component
  const handleHobbySelectionChange = (selectedIds) => {
    setSelectedHobbiesIds(selectedIds);
  };
  // Callback function to receive selected IDs from Honours component
  const handleHnrsSelectionChange = (selectedIds) => {
    setSelectedHnrs(selectedIds);
  };
  // Callback function to receive selected IDs from profile component
  const handleProfSelectionChange = (selectedIds) => {
    setSelectedProf(selectedIds);
  };
    // Callback function to receive selected IDs from statement component
    const handleStatChange = (selectedIds) => {
      setSelectedStat(selectedIds);
    };
    // Callback function to receive selected IDs from Recommendation component
    const handleRecomChange = (selectedIds) => {
      setSelectedRecom(selectedIds);
    };
    // Callback function to receive selected IDs from Teacher component
    const handleTeacChange = (selectedIds) => {
      setSelectedTeach(selectedIds);
    };
    const postData = {
      // Other data
      riasecIds: selectedRiasecIds,
      aspiredIds: selectedAspiredIds,
      furtherIds: selectedFurtherIds,
      prefIds: selectedPrefIds,
      collegetext: selectedcollegetext,
      selectedStrengthIds: selectedStrengthIds,
      selectedDevelopmentIds: selectedDevelopmentIds,
      selectedHobbiesIds: selectedHobbiesIds,
      selectedHnrs: selectedHnrs,
      selectedProf: selectedProf,
      selectedActivities: selectedActivities,
      selectedStat: selectedStat,
      selectedRecom: selectedRecom,
      selectedTeach: selectedTeach,
      
    };
  
    
    console.log("post data", postData);
  const steps = [
    { label: 'RIASEC Test and Career Choices', component: (
      <>
        <Riasec onSelectionChange={handleRiasecSelectionChange}/>
        <br></br>
        <Aspired onSelectionChange={handleAspiredSelectionChange}/>
      </>
    )},
    { label: 'Further Studies Preferences', component: (
        <>
          <FurtherStudies onSelectionChange={handleFurtherSelectionChange}/>
          <br></br>
           <PreferredSubjects onSelectionChange={handleSubjectsSelectionChange}/> 
          <br></br>
          <Prefrence onSelectionChange={handlePreferenceSelectionChange}/>
          <br></br>
          <College onTextChange={handleCollegeTextChange}/>
        </>

      )},
      // { label: 'A-Level/HSSC Plans', component: (
      //   <>
          
      //   </>counselor_updateInfo[0].ieP_DETAILs.
      // )},
      { label: 'Personal Strengths and Qualities', component: (
        <>
          <PersonalStrengths onStrengthSelectionChange={handleStrengthSelectionChange}
        onDevelopmentSelectionChange={handleDevelopmentSelectionChange}/>
        </>
      )},
      { label: 'Hobbies/Interests', component: (
        <>
          <HobbiesAndInterest onSelectionChange={handleHobbySelectionChange}/>
         
        </>
      )},
      { label: 'Honors and Awards', component: (
        <>
          <HonrsAndAward onAwardsChange={handleHnrsSelectionChange}/>
        </>
      )},
      { label: 'Profile Building Activities', component: (
        <>
          <ProfileBuilding onSave={handleProfSelectionChange}/> 
         
        </>
      )},
      { label: 'Recommendation and Personal Statement', component: (
        <>
          <PersonalStatement onInputChange={handleStatChange}/>
          <br></br>
          <Recommendation onInputChange={handleRecomChange}/>
          <br></br>
          <TeacherRecommendation onInputChange={handleTeacChange}/>
        </>
     )},
     { label: 'Recommendation and Personal Statement', component: (
      <>
        <PersonalStatement onInputChange={handleStatChange}/>
        <br></br>
        <Recommendation onInputChange={handleRecomChange}/>
        <br></br>
        <TeacherRecommendation onInputChange={handleTeacChange}/>
      </>
   )},
   { label: 'Preview', component: (
    
    <FormPreview/>
 )},
 
    // Add more steps as needed
  ];

  
  

  // Include selectedRiasecIds in your post data when making the API call
  // Example:

  const counselor = localStorage.getItem('counselor')
? JSON.parse(localStorage.getItem('counselor'))
: null

//checking logging
useEffect(() => {

if (counselor)
  {
const value = counselor[0] ? counselor[0] : null;



  if (value) {
    setusername(value.user_Name);
    setsessionid(value.sessionID);
   // dispatch(getCounselor_Update({masterid,termId,value.sessionID}));
      }
    }
  else
  {
    console.log("bye bye")
    localStorage.removeItem("userData");
      navigate('/');
  }
 }, [])  

 useEffect(() => {
  if (masterid !== 0 && sessionId) { // Corrected sessionid variable name and added sessionid as a dependency
    console.log("sess", sessionId);
    //setapiid(masterid);
    dispatch(getCounselor_Update({ masterid, termId, sessionid: sessionId }));
  }
  // else{
  //   if(apiid !==0 && sessionId)
  //     {
  //       dispatch(getCounselor_Update({ masterid : apiid, termId, sessionid: sessionId }));
  //     }
  // }
}, [masterid,termId,sessionId,apiid,dispatch]);
//for updating


 useEffect(() => {
  console.log("zahra", studentId)
  dispatch(getCounselor({studentId}));

}, [dispatch ,studentId]);


// useEffect(() => {
//   if (apiid !== 0) {
//     console.log("New Master ID detected, updating component state...");
//     dispatch(getCounselor_Update({ masterid : masterid, termId, sessionid: sessionId }));
//   }
// }, [apiid]);


//handling loading nd error


if (loading) {
  return <Spinner />; // Display spinner while loading
}

if (error) {
  return <Error>{error}</Error>; // Handle errors
}

//empty page handling
console.log("here", counselorDetails)
if (!counselorDetails || !counselorDetails.studentDetails || counselorDetails.studentDetails.length === 0) {
  return <div>No student details available</div>;
}
const firstStudent = counselorDetails.studentDetails[0] ?counselorDetails.studentDetails[0] : null;
console.log("firstStudent",firstStudent)
  //menthods for handling
  const isStepOptional = (step) => {
    return true;  // Now every step can be skipped
};


  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    const postData = whichapi(activeStep);

       console.log("Submitting Data for Step", activeStep, ":", postData);
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
        throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
};
const createBaseApiObject = () => {
  return {
      "studentId": studentId,
      "termId": termId,
      "sessionId": sessionId,
      "classId": firstStudent.grade_Id,
      "createdBy": username,
  };
};

const UpdateApiObject = () => {
  console.log("lolololo0", counselor_updateInfo)
  return {
      "studentId": studentId,
      "termId": termId,
      "sessionId": sessionId,
      "classId": firstStudent.grade_Id,
      "updatedby": username,
      "ieP_MasterId": masterid,
      "id": apiid ,
  };
};
const createApiObjectForCurrentStep = (stepIndex) => {
  let api = createBaseApiObject();

  switch(stepIndex) {
      case 0:
          Object.assign(api, {
              "riasecId_1": selectedRiasecIds[0] || 0,
              "riasecId_2": selectedRiasecIds[1] || 0,
              "riasecId_3": selectedRiasecIds[2] || 0,
              "careerChoices_1": selectedAspiredIds.selectedIds ? selectedAspiredIds.selectedIds[0] : 0,
              "careerChoices_2": selectedAspiredIds.selectedIds ? selectedAspiredIds.selectedIds[1] : 0,
              "otherCareerChoices": selectedAspiredIds.othersText || ""
          });

          break;
      case 1:
          Object.assign(api, {
              "furtherStudies": selectedFurtherIds === "1" ? "A-Level" : "HSSC",
              "subjectForFurtherStudies_1": selectedSubjects[0] || 0, // Needs actual data from state
              "subjectForFurtherStudies_2": selectedSubjects[1] || 0,
              "subjectForFurtherStudies_3": selectedSubjects[2] || 0,
              "subjectForFurtherStudies_4": selectedSubjects[3] || 0,
              "continueAtCity": selectedPrefIds === "YES",
              "continueRemarks": selectedcollegetext
          });
          break;
   
      case 2:
          Object.assign(api, {
              "personalStrength_1": selectedStrengthIds[0] || 0,
              "personalStrength_2": selectedStrengthIds[1] || 0,
              "qualitiesToDevelop_1": selectedDevelopmentIds[0] || 0,
              "qualitiesToDevelop_2": selectedDevelopmentIds[1] || 0,
              "otherStrength": "", // Needs actual data from state
              "otherQualities": "" // Needs actual data from state
          });
          break;
      case 3:
          Object.assign(api, {
              "hobbies_1": selectedHobbiesIds[0] || 0,
              "hobbies_2": selectedHobbiesIds[1] || 0,
              "otherHobbies": "" // Needs actual data from state
          });
          break;
      case 4:
          api["neW_IEP_HonorAwardsDetails"] = selectedHnrs.map((honor, index) => ({
              "id": 0,  // These values need real data handling
              "ieP_DETAILId": 0,
              "award_Honor_Name": honor.name || "",
              "awarding_Body": honor.body || "",
              "year": parseInt(honor.year, 10) || 0,
              "createdBy": username
          }));
          break;
      case 5:
        Object.assign(api, {
          "completedActivities_1": selectedProf.completedActivities && selectedProf.completedActivities[0] ? selectedProf.completedActivities[0].activity || "" : "",
          "details_1": selectedProf.completedActivities && selectedProf.completedActivities[0] ? selectedProf.completedActivities[0].details || "" : "",
          "startDate_1": selectedProf.completedActivities && selectedProf.completedActivities[0] ? selectedProf.completedActivities[0].startDate || null : null,
          "duration_1": selectedProf.completedActivities && selectedProf.completedActivities[0] ? selectedProf.completedActivities[0].duration || 0 : 0,
          "completedActivities_2": selectedProf.completedActivities && selectedProf.completedActivities[1] ? selectedProf.completedActivities[1].activity || "" : "",
          "details_2": selectedProf.completedActivities && selectedProf.completedActivities[1] ? selectedProf.completedActivities[1].details || "" : "",
          "startDate_2": selectedProf.completedActivities && selectedProf.completedActivities[1] ? selectedProf.completedActivities[1].startDate || null : null,
          "duration_2": selectedProf.completedActivities && selectedProf.completedActivities[1] ? selectedProf.completedActivities[1].duration || 0 : 0,
          "suggestedActivities_1": selectedProf.suggestedActivities && selectedProf.suggestedActivities[0] ? selectedProf.suggestedActivities[0].activity || "" : "",
          "suggestedActivitiesDetails_1": selectedProf.suggestedActivities && selectedProf.suggestedActivities[0] ? selectedProf.suggestedActivities[0].details || "" : "",
          "suggestedActivities_2": selectedProf.suggestedActivities && selectedProf.suggestedActivities[1] ? selectedProf.suggestedActivities[1].activity || "" : "",
          "suggestedActivitiesDetails_2": selectedProf.suggestedActivities && selectedProf.suggestedActivities[1] ? selectedProf.suggestedActivities[1].details || "" : ""
      });
          break;
      case 6:
          Object.assign(api, {
              "personalStatement": selectedStat,
              "recommendationStudent": selectedRecom,
              "teacherRecommendation_1": selectedTeach[0] || "",
              "teacherRecommendation_2": selectedTeach[1] || ""
          });
          break;
      default:
          break;
  }

  return api;
};

const updateApiObjectForCurrentStep = (stepIndex) => {
  let api = UpdateApiObject();

  switch(stepIndex) {
      case 0:
          Object.assign(api, {
              "riasecId_1": selectedRiasecIds[0] || 0,
              "riasecId_2": selectedRiasecIds[1] || 0,
              "riasecId_3": selectedRiasecIds[2] || 0,
              "careerChoices_1": selectedAspiredIds.selectedIds ? selectedAspiredIds.selectedIds[0] : 0,
              "careerChoices_2": selectedAspiredIds.selectedIds ? selectedAspiredIds.selectedIds[1] : 0,
              "otherCareerChoices": selectedAspiredIds.othersText || ""
          });
          return postApi(api, 'IEP/Counc_IEPDetailsSTEPWISE');
      case 1:
          Object.assign(api, {
              "furtherStudies": selectedFurtherIds === "1" ? true: false,
              "subjectForFurtherStudies_1": selectedSubjects[0] || 0, // Needs actual data from state
              "subjectForFurtherStudies_2": selectedSubjects[1] || 0,
              "subjectForFurtherStudies_3": selectedSubjects[2] || 0,
              "subjectForFurtherStudies_4": selectedSubjects[3] || 0,
              "continueAtCity": selectedPrefIds === "YES",
              "continueRemarks": selectedcollegetext
          });
          return postApi(api, 'IEP/Counc_IEPDetailsSTEP_2');
   
      case 2:
          Object.assign(api, {
              "personalStrenghth_1": selectedStrengthIds[0] || 0,
              "personalStrenghth_2": selectedStrengthIds[1] || 0,
              "qualitiesToDevelop_1": selectedDevelopmentIds[0] || 0,
              "qualitiesToDevelop_2": selectedDevelopmentIds[1] || 0,
              "otherStrength": "", // Needs actual data from state
              "otherQualities": "" // Needs actual data from state
          });
          return postApi(api, 'IEP/Counc_IEPDetailsSTEP_3');
      case 3:
        console.log("dddd",selectedHobbiesIds)
          Object.assign(api, {
              "hobbies_1": selectedHobbiesIds[0] || 0,
              "hobbies_2": selectedHobbiesIds[1] || 0,
              "otherHobbies": "" // Needs actual data from state
          });
          return postApi(api, 'IEP/Counc_IEPDetailsSTEP_4');
      case 4:
          api["neW_IEP_HonorAwardsDetails"] = selectedHnrs.map((honor, index) => ({
              "id": honor.id,  // These values need real data handling
              "ieP_DETAILId": 0,
              "award_Honor_Name": honor.name || "",
              "awarding_Body": honor.body || "",
              "year": parseInt(honor.year, 10) || 0,
              "updatedBy": username
          }));
          return postApi(api, 'IEP/Counc_IEPDetailsSTEP_5');
      case 5:
        Object.assign(api, {
          "completedActivities_1": selectedProf.completedActivities && selectedProf.completedActivities[0] ? selectedProf.completedActivities[0].activity || "" : "",
          "details_1": selectedProf.completedActivities && selectedProf.completedActivities[0] ? selectedProf.completedActivities[0].details || "" : "",
          "startDate_1": selectedProf.completedActivities && selectedProf.completedActivities[0] ? selectedProf.completedActivities[0].startDate || null : null,
          "duration_1": selectedProf.completedActivities && selectedProf.completedActivities[0] ? selectedProf.completedActivities[0].duration || 0 : 0,
          "completedActivities_2": selectedProf.completedActivities && selectedProf.completedActivities[1] ? selectedProf.completedActivities[1].activity || "" : "",
          "details_2": selectedProf.completedActivities && selectedProf.completedActivities[1] ? selectedProf.completedActivities[1].details || "" : "",
          "startDate_2": selectedProf.completedActivities && selectedProf.completedActivities[1] ? selectedProf.completedActivities[1].startDate || null : null,
          "duration_2": selectedProf.completedActivities && selectedProf.completedActivities[1] ? selectedProf.completedActivities[1].duration || 0 : 0,
          "suggestedActivities_1": selectedProf.suggestedActivities && selectedProf.suggestedActivities[0] ? selectedProf.suggestedActivities[0].activity || "" : "",
          "suggestedActivitiesDetails_1": selectedProf.suggestedActivities && selectedProf.suggestedActivities[0] ? selectedProf.suggestedActivities[0].details || "" : "",
          "suggestedActivities_2": selectedProf.suggestedActivities && selectedProf.suggestedActivities[1] ? selectedProf.suggestedActivities[1].activity || "" : "",
          "suggestedActivitiesDetails_2": selectedProf.suggestedActivities && selectedProf.suggestedActivities[1] ? selectedProf.suggestedActivities[1].details || "" : ""
      });
          return postApi(api, 'IEP/Counc_IEPDetailsSTEP_6');
      case 6:
          Object.assign(api, {
              "personalStatement": selectedStat,
              "recommendationStudent": selectedRecom,
              "teaherRecommendation_1": selectedTeach[0] || "",
              "teaherRecommendation_2": selectedTeach[1] || ""
          });
          return postApi(api, 'IEP/Counc_IEPDetailsSTEP_7');
      default:
          break;
  }


//   switch(stepIndex) {
//     case 0:
       
    
//     case 1:
    
        
//         break;
 
//     case 2:
        
//         break;
//     case 3:
       
//         break;
//     case 4:
        
//         break;
//     case 5:
    
//         break;
//     case 6:
     
//         break;
//     default:
//         break;
// }
  return api;
};
const whichapi = (stepIndex) =>{
  // if (masterid === 0)
  //   {
  //     createApiObjectForCurrentStep(stepIndex);
  //   }
  //   else
  //   {
      updateApiObjectForCurrentStep(stepIndex);
    //}
}

function postApi(data, url) {
  console.log("ppp", JSON.stringify(data));
  // Assuming you are using fetch to post the API request
  return fetch( `${backendURL}/api/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add other headers if needed
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Handle response data if needed
    console.log("apiidata",data)
    console.log('API response:', typeof(data.data), masterid);
    console.log(typeof(masterid),"dddd");
    if (masterid === "0") {
      console.log("yaaaaaaahoooooooooooooooooooooooooooooooooooooooooooooo")
      setapiid(data.data); // Update masterid in state
      // Optionally update the URL or navigate to reflect the new masterid
      navigate(`/iep/${termId}/${studentId}/${data.masterid}`); // Update this line as per your URL pattern
    }
    return data; // Or return any other response data
  })
  .catch(error => {
    console.error('Error posting API:', error);
    throw error; // Throw error to handle at the caller side
  });
}

// const handleNext = async () => {
//     const postData = createApiObjectForCurrentStep(activeStep);
//     try {
//         console.log("Submitting Data for Step", activeStep, ":", postData);
//         await dispatch(counIEPData(postData)); // Adjust this call to your API needs
//         console.log("Data submitted successfully for step", activeStep);

//         let newSkipped = skipped;
//         if (isStepSkipped(activeStep)) {
//             newSkipped = new Set(newSkipped.values());
//             newSkipped.delete(activeStep);
//         }
        
//         setActiveStep(prevActiveStep => prevActiveStep + 1);
//         setSkipped(newSkipped);
//     } catch (error) {
//         console.error("Error submitting data for step", activeStep, ":", error);
//     }
// };

// create api object
const createApiObject = () => {
  const api = {
    "studentId": studentId,
    "termId": termId,
    "sessionId": sessionId,
    "classId":firstStudent.grade_Id,
    "riasecId_1": 0,
    "riasecId_2": 0,
    "riasecId_3": 0,
    "careerChoices_1": 0,
    "careerChoices_2": 0,
    "otherCareerChoices": "",
    "furtherStudies": selectedFurtherIds==="1" ? "A-Level" : "HSSC",
    "subjectForFurtherStudies_1": selectedSubjects,
    "subjectForFurtherStudies_2": 0,
    "subjectForFurtherStudies_3": 0,
    "subjectForFurtherStudies_4": 0,
    "continueAtCity": selectedPrefIds === "YES",
    "continueRemarks": selectedcollegetext,
    "personalStrenghth_1": 0,
    "personalStrenghth_2": 0,
    "qualitiesToDevelop_1": 0,
    "qualitiesToDevelop_2": 0,
    "otherStrength": "",
    "otherQualities": "",
    "hobbies_1": 0,
    "hobbies_2": 0,
    "otherHobbies": "",
    "completedActivities_1": "", 
    "details_1": "",
    "startDate_1": null,
    "duration_1": 0,
    "completedActivities_2": "",
    "details_2": "",
    "startDate_2": null,
    "duration_2": 0,
    "suggestedActivities_1": "",
    "suggestedActivitiesDetails_1": "",
    "suggestedActivities_2": "",
    "suggestedActivitiesDetails_2": "",
    "personalStatement": selectedStat,
    "recommendationStudent": selectedRecom,
    "teaherRecommendation_1": "",
    "teaherRecommendation_2": "",
    "createdBy": username,
    "neW_IEP_HonorAwardsDetails": selectedHnrs.map((honor, index) => ({
      "id": 0, // You might want to change this based on your actual ID logic
      "ieP_DETAILId": 0, // This seems to be a constant value; adjust if needed
      "award_Honor_Name": honor.name || "",
      "awarding_Body": honor.body || "",
      "year": parseInt(honor.year, 10) || 0, // Convert year to an integer, default to 0 if conversion fails
      "createdBy": username
    }))
  };

  selectedRiasecIds.forEach((id, index) => {
    if (index < 3) {  // Ensure it only handles up to three IDs
      api[`riasecId_${index + 1}`] = id.id;
    }
  });

  const { selectedIds, othersText } = selectedAspiredIds;
  if(selectedIds){
  if (selectedIds.length > 0 && selectedIds.length <= 2) {
    api.careerChoices_1 = selectedIds[0] || 0;
    api.careerChoices_2 = selectedIds[1] || 0;
} else {

    api.careerChoices_1 = 0;
    api.careerChoices_2 = 0;
}


if (othersText) {
  api.otherCareerChoices = othersText;
} else {
  api.otherCareerChoices = "";
}}

selectedStrengthIds.forEach((id, index) => {
  if (index < 2) {  // Ensure it only handles up to three IDs
    api[`personalStrenghth_${index + 1}`] = id;
  }
});
selectedDevelopmentIds.forEach((id, index) => {
  if (index < 2) {  // Ensure it only handles up to three IDs
    api[`qualitiesToDevelop_${index + 1}`] = id;
  }
});
selectedHobbiesIds.forEach((id, index) => {
  if (index < 2) {  // Ensure it only handles up to three IDs
    api[`hobbies_${index + 1}`] = id;
  }
});
selectedTeach.forEach((id, index) => {
  if (index < 2) {  // Ensure it only handles up to three IDs
    api[`teaherRecommendation_${index + 1}`] = id;
  }
});
if (selectedProf && selectedProf.completedActivities) {
  selectedProf.completedActivities.forEach((activity, index) => {
    if (index < 2) {
      api[`completedActivities_${index + 1}`] = activity.activity || "";
      api[`details_${index + 1}`] = activity.details || "";
      api[`startDate_${index + 1}`] = activity.startDate || null;
      api[`duration_${index + 1}`] = activity.duration || 0;
    }
  });
}
if (selectedProf && selectedProf.suggestedActivities) {
  selectedProf.suggestedActivities.forEach((activity, index) => {
    if (index < 2) {
      api[`suggestedActivities_${index + 1}`] = activity.activity || "";
      api[`suggestedActivitiesDetails_${index + 1}`] = activity.details || "";
    
    }
  });
}
  return api;
};
const apiObject = createApiObject();
console.log("post data", JSON.stringify(apiObject));
  const handleReset = async() => {
    try {
      console.log("postData",JSON.stringify(apiObject));
      await dispatch(counIEPData(JSON.stringify(apiObject)));
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your IEP has been saved successfully.',
      }).then((result) => {
        if (result.isConfirmed) {
         window.location.href = '/counselor'; // Refresh the page
        }
      });
      console.log("hogyi post api")
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleStep = (step) => () => {
    setActiveStep(step);
};
  return (
    <div>
          <Header/>
            <br></br>
            {/* <StudentInformation
          
            /> */}
            <br></br>
            <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
            <div className='row'>
    <div className='col-md-6'>
  <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginRight: '20px',marginTop:'-5%' }}>
            <Stepper activeStep={activeStep} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: '20px' }}>
        {steps.map((step, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption"></Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={step.label} {...stepProps} sx={{width:'100%'}}>
              <StepLabel {...labelProps}  
              onClick={handleStep(index)}
               sx={{ 
                margin: '10px 0', 
                cursor: 'pointer', 
                textDecoration: 'none',
                color: activeStep === index ? '#fff' : '#000', // Change text color based on active step
                backgroundColor: activeStep === index ? '#007bff' : 'transparent', // Change background color based on active step
                borderRadius: '5px', 
                padding: '10px',
                border: '1px solid #007bff', // Add border to all steps
            }}>
                {step.label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      </Box>
      </div>
  </div>
      <Box sx={{width:'100%', alignItems: 'center' }}>
      <div className="row">
              <div className="col-md-8" style={{marginLeft:'15%'}}>
              <StudentInformation/>
              </div>
            </div>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Save Data</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
        {/* <Typography sx={{ mt: 2, mb: 1 }}>{steps[activeStep].label}</Typography> */}

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Typography sx={{ mt: 2, mb: 1 ,fontWeight:'bolder' ,textDecoration:'underline' ,marginLeft:'25%'}}>{steps[activeStep].label}</Typography>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next & Save'}
            </Button>
          </Box>
          <Box sx={{ mt: 3, border: '1px solid #ccc', borderRadius: '8px', padding: '20px' }}>
            {steps.map((step, index) => (
              <div key={index} style={{ display: index === activeStep ? 'block' : 'none' }}>
                {step.component}
              </div>
            ))}
          </Box>
        </React.Fragment>
      )}
    </Box>
    </Box>
    </div>
  );
};

export default Wizard;
