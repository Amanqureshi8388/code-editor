import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { LocalStorage } from "./components/LocalStorage";
import Editor from "./components/Editor";
import { AiFillHtml5 } from "react-icons/ai";
import { DiCss3, DiJavascript } from "react-icons/di";
import { GrCodepen } from "react-icons/gr";
import "./components/editor.scss";
import Split from "react-split";

function App() {
  const [html, setHtml] = LocalStorage("html", "");
  const [css, setCss] = LocalStorage("css", "");
  const [js, setJs] = LocalStorage("js", "");
  const [srcDoc, setsrcDock] = useState("");
  const ref = useRef();
  const elementRef = useRef(null);
  const [width, setWidth] = useState({
    winWidth: window.innerWidth,
  });
  const detectSize = () => {
    setWidth({
      winWidth: window.innerWidth,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [width]);


  useEffect(() => {
    const timeout = setTimeout(() => {
      setsrcDock(
        `
            <html>
             <body>${html}</body>
             <style>${css}</style>
             <script>${js}</script>
            </html>
            `
      );
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  function onIframe() {
    document
      .querySelector("iframe")
      .contentWindow.document.querySelector("html").style.overflowWrap =
      "break-word";
  }

  return (
    <>
      <header className="" ref={elementRef}>
        <GrCodepen /> <div>Codepen</div>
      </header>
      <Split direction="vertical" minSize={40} className="split" >
        <Split className=" pane top-pan" >
          <Editor
            language="xml"
            color="#E96228"
            title="HTML"
            logo={<AiFillHtml5 />}
            value={html}
            onChange={setHtml}
          ></Editor>
          <Editor
            language="css"
            color="dodgerblue"
            title="CSS"
            logo={<DiCss3 />}
            value={css}
            onChange={setCss}
          ></Editor>
          <Editor
            language="javascript"
            color="orange"
            title="JS"
            logo={<DiJavascript />}
            value={js}
            onChange={setJs}
          ></Editor>
        </Split>
        <Split className="pane-bottom pane ">
          <iframe
            onLoad={onIframe}
            ref={ref}
            srcDoc={srcDoc}
            title="This is a unique title"
            frameBorder="0"
            sandbox="allow-scripts allow-same-origin"
            width="100%"
            height="100%"
          />
        </Split>
      </Split>
    </>
  );
}

export default App;
