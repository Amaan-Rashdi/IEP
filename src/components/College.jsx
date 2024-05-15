import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const College = ({ onTextChange }) => {
  const { counselor_updateInfo } = useSelector(state => state.counselor_update);
  const initialText = counselor_updateInfo && counselor_updateInfo[0] ? counselor_updateInfo[0].ieP_DETAILs?.continueRemarks || "" : "";
  const [text, setText] = useState(initialText);

  // Function to handle changes in the textarea content
  const handleTextChange = (event) => {
    const newText = event.target.value;
    // Limit the number of words to 200
    if (newText.split(/\s+/).length <= 200) {
      setText(newText);
      // Pass the text to the parent component
      onTextChange(newText);
    }
  };

  return (
    <div className="container">
      <p>
        If yes, which campus? If No, a, why not b, which college?*
      </p>
      <div className="row">
        <div className="col-md-12">
          <textarea
            cols={10}
            rows={10}
            className="form-control"
            style={{ resize: "none", border: "2px solid" }}
            value={text}
            onChange={handleTextChange}
            required
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default College;
