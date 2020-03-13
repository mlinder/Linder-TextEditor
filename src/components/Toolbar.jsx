import React from "react";

import "./Toolbar.css";

const ToDoButton = ({ text }) => {
  return (
    <button type="button" disabled aria-pressed="false" tabIndex="0">
      {text}
    </button>
  );
};

const Toolbar = ({ editor, isMarkActive, toggleMark }) => {
  const MarkButton = ({ format, text }) => {
    // const editor = useSlate()
    return (
      <button
        aria-pressed={isMarkActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault();
          toggleMark(editor, format);
        }}
      >
        {text}
      </button>
    );
  };
  return (
    <div role="toolbar" className="toolbar">
      <MarkButton format="bold" text="Bold" />
      <MarkButton format="italic" text="Italic" />
      <ToDoButton text="Link" />
      <ToDoButton text="block-quote" />
      <ToDoButton text="bulleted-list" />
      <ToDoButton text="numbered-list" />
    </div>
  );
};

export default Toolbar;
