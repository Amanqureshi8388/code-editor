import React, { useState } from "react";
// import './editor.scss'
// import "codemirror/theme/material-ocean.css";
import "codemirror/theme/ayu-mirage.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled } from "react-codemirror2";


const Editor = (props) => {
  const { language, logo, value, onChange, color, title } = props;

  function handleChange(editor, data, value) {
    onChange(value);
  }

 

  return (
    <>
      <div className='editor-container'>
        <div className="editor-title" style={{ color: color , display:'flex',alignItems:'center' }}>
            {logo}
            <div style={{fontWeight:'500'}}>{title}</div>  
        </div>
        <Controlled
          onBeforeChange={handleChange}
          value={value}
          className="code-mirror-wrapper "
          options={{
            lineWrapping: true,
            lint: true,
            mode: language,
            theme: "ayu-mirage",
            lineNumbers: true,
          }}
        />
      </div>
    </>
  );
};

export default Editor;
