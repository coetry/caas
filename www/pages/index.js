import { useState, useEffect } from "react";

const H1 = ({ children, ...props }) => (
  <h1 {...props}>
    {children}
    <style jsx>{`
      h1 {
        font-size: 16px;
        font-weight: 600;
        color: #ff0080;
        margin: 5px auto;
        display: ${"ib" in props ? "inline-block" : ""};
      }
    `}</style>
  </h1>
);

const TextArea = ({ ...props }) => (
  <textarea {...props}>
    <style jsx>{`
      textarea {
        width: 100%;
        color: #333333;
        margin: 15px auto;
      }
    `}</style>
  </textarea>
);

const CompiledOutput = ({ children, ...props }) => (
  <div {...props}>
    {children}
    <style jsx>{`
      div {
        width: 100%;
        height: 300px;
        overflow-y: scroll;
        color: #0076ff;
        margin: 15px auto;
        border: 1px solid #333333;
      }
    `}</style>
  </div>
);

const Flex = ({ children, ...props }) => (
  <div>
    {children}
    <style jsx>{`
      div {
        display: flex;
        justify-content: flex-start;
      }
    `}</style>
  </div>
);

const Button = ({ children, ...props }) => (
  <button {...props}>
    {children}
    <style jsx>{`
      button {
        padding: 3px;
        background: #50e3c2;
        color: #fff;
        margin-left: 10px;
        display: inline-block;
        border-radius: 3px;
      }
    `}</style>
  </button>
);

const Index = props => {
  const [out, setOut] = useState("");
  const [src, setSrc] = useState("");

  const changeSrc = e => {
    setSrc(e.target.value);
    console.log(src);
  };

  const compile = async e => {
    console.log(JSON.stringify({ src }));
    fetch("http://localhost:4567", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ src })
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(e => console.log(e.error || e.message));
    console.log("output:", out);
  };

  return (
    <main>
      <div>
        <H1 ib>src</H1>
        <Button onClick={compile}>compile</Button>
      </div>
      <textarea
        value={src}
        onChange={changeSrc}
        style={{
          width: "100%",
          height: "300px",
          overflowY: "scroll",
          fontFamily: "Menlo"
        }}
      />
      <H1>out</H1>
      <CompiledOutput>{out}</CompiledOutput>
      <style jsx>{`
        main {
          max-width: 600px;
          margin: auto;
        }
      `}</style>
      <style jsx global>{`
        * {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }
        html,
        body {
          width: 100vw;
          height: 100vh;
          font-family: Menlo;
          font-size: 14px;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
};

export default Index;
