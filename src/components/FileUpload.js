import React from "react";

const FileUpload = ({handleFileInput}) => {
    return (
      <div className="App">
        <form id = "myForm">
          <input
            type="file"
            onChange={e => handleFileInput(e)}
          />
        </form>
      </div>
    );
};

export default FileUpload;