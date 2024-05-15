import { useState } from "react";
import Header from "../components/Header";
import StudentInformation from "../components/StudentInformation";
import Logo from "../assets/logo.png";
import { useSelector } from "react-redux";
const FormPreview =()=>{
    const {counselor_updateInfo} = useSelector(state => state.counselor_update);
    
    return (
        <div className="container">
           <div className="row">
            <div className="col-md-12">
            <Header></Header>
            </div>
            </div>
            <div className="row">
                <div className="col-md-10">
                    <h2 className="text-center">The City School</h2>
                    <span style={{marginLeft:'30%',fontWeight:'bolder',}}>Individual Educational Plan (IEP)[session_year]</span>
                </div>
                <div className="col-md-2"><img src={Logo} alt="" height={100} width={100} /></div>
            </div>
            
            <div className="row">
                <div className="col-md-12">
                    <span>This Individual Education Plan (IEP) is collaboratively prepared by our school's Guidance Counselor, the student, and our dedicated team of teachers. This plan is tailored to support your child's unique learning journey and academic success</span>
                </div>
            </div>
            <div className="row">
            <div className="col-md-12 mt-2">
            <StudentInformation style={{width:'100%'}}></StudentInformation>
            </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h5 className="text-center">Academic Overview</h5>
                    <p>Result of [class] [term]</p>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <td>Urdu</td>
                                <td>B</td>

                                <td>Islamiat</td>
                                <td>A</td>

                                <td>Pakistan Studies</td>
                                <td>C</td>
                            </tr>

                            <tr>
                                <td>Maths</td>
                                <td>B</td>

                                <td>English</td>
                                <td>A</td>

                                <td>Physics</td>
                                <td>C</td>
                            </tr>
                        </thead>
                    </table>
                    <h5 className="text-center">CAIE results</h5>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <td>Urdu</td>
                                <td>B</td>

                                <td>Islamiat</td>
                                <td>A</td>

                                <td>Pakistan Studies</td>
                                <td>C</td>
                            </tr>

                            <tr>
                                <td>Maths</td>
                                <td>B</td>

                                <td>English</td>
                                <td>A</td>

                                <td>Physics</td>
                                <td>C</td>
                            </tr>
                        </thead>
                    </table>
                    <h5 className="text-center">Class Teacher remarks</h5>
                    <table className="table table-bordered">
                        <tr>
                            <td>1</td>
                            <td>First Remarks</td>
                        </tr>

                        <tr>
                            <td>2</td>
                            <td>Second Remarks</td>
                        </tr>
                    </table>
                    <h5 className="text-center">Discussion Outcomes with the Counselor</h5>
                    <p>Highest Interest Codes from the RIASEC aptitude test are <b>Realistic</b>, <b>Artistic</b> and <b>Social</b>.</p>
                    <h5>Aspired career choices are:</h5>
                    <ul>
                        <li>XYZ</li>
                        <li>ABC</li>
                    </ul>
                    <p>Study preference:<br/> <b>Subject 1</b>, <b>Subject 2</b> and <b>Subject 3</b> through <b>HSSC/A-Level</b> route</p>
                    <table className="table table-bordered">
                        <tr>
                            <th>Personal Strengths</th>
                            <th>Qualities to Develop</th>
                        </tr>
                        <tr>
                            <td>ABC</td>
                            <td>XYZ</td>
                        </tr>

                        <tr>
                            <td>ABC</td>
                            <td>XYZ</td>
                        </tr>

                        <tr>
                            <td>ABC</td>
                            <td>XYZ</td>
                        </tr>
                    </table>

                    <h5>Hobbies/Intrest</h5>
                    <ul>
                        <li>Abc</li>
                        <li>Xyz</li>
                        <li>EFG</li>
                    </ul>
                    <h5>Details of Honors and Awards</h5>
                    <table className="table table-bordered">
                        <tr>
                            <th>Award/Honor</th>
                            <th>Awarding Body</th>
                            <th>Award</th>
                        </tr>
                        <tr>
                            <td>Debate</td>
                            <td>The City School</td>
                            <td>2023</td>
                        </tr>
                    </table>
                    <h5>Profile Building Activities</h5>
                    <table className="table table-bordered">
                        <tr>
                            <th>Completed Activities</th>
                            <th>Details</th>
                            <th>Start Date</th>
                            <th>Duration</th>
                        </tr>
                        <tr>
                            <td>Xyz</td>
                            <td>The City School</td>
                            <td>April 20, 2020</td>
                            <td>30 Days</td>
                        </tr>

                        <tr>
                            <td>Xyz</td>
                            <td>The City School</td>
                            <td>April 20, 2020</td>
                            <td>30 Days</td>
                        </tr>
                    </table>

                    <table className="table table-bordered">
                        <tr>
                            <th>Suggested Activities</th>
                            <th>Details</th>
                        </tr>
                        <tr>
                            <td>Xyz</td>
                            <td>The City School</td>
                        </tr>

                        <tr>
                            <td>Xyz</td>
                            <td>The City School</td>
                        </tr>
                    </table>
                    <h5>Personal Statement</h5>
                    <p>Asdf asdfd asdfkdj eoiulka asdkj elekji fakdj reasejler. Asdf asdfd asdfkdj eoiulka asdkj elekji fakdj reasejler. Asdf asdfd asdfkdj eoiulka asdkj elekji fakdj reasejler. Asdf asdfd asdfkdj eoiulka asdkj elekji fakdj reasejler. Asdf asdfd asdfkdj eoiulka asdkj elekji fakdj reasejler. Asdf asdfd asdfkdj eoiulka asdkj elekji fakdj reasejler</p>
                    <ul>
                        <li>The person writing a recommendation for the student, should know:
                            <p>Asdf asdfd asdfkdj eoiulka asdkj elekji fakdj reasejler. Asdf asdfd asdfkdj eoiulka asdkj elekji fakdj reasejler. Asdf asdfd asdfkdj eoiulka asdkj elekji fakdj reasejler. Asdf asdfd asdfkdj eoiulka asdkj.</p>
                        </li>
                        <li>Details of the undertakings issued and confirmed by the parents, so far</li>
                        <table className="table table-bordered">
                        <tr>
                            <th>Class (Term)</th>
                            <th>Date of issue</th>
                            <th>Parent’s Confirmation</th>
                        </tr>
                        <tr>
                            <td>Xyz</td>
                            <td>The City School</td>
                            <td>January 22, 2023</td>
                        </tr>
                    </table>
                    </ul>
                </div>
            </div>
           </div>
        
    );
}
export default FormPreview;