import React from "react";

import "./Toolbar.css";

const ToDoButton = ({ text }) => {
  return (
    <button type="button" disabled aria-pressed="false" tabIndex="0">
      {text}
    </button>
  );
};

const Toolbar = ({
  editor,
  isMarkActive,
  isBlockActive,
  toggleMark,
  toggleBlock
}) => {
  const MarkButton = ({ format, text }) => {
    // const editor = useSlate()
    return (
      <button
        type="button"
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

  const BlockButton = ({ format, text }) => {
    // const editor = useSlate()
    return (
      <button
        type="button"
        aria-pressed={isBlockActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault();
          toggleBlock(editor, format);
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
      <BlockButton format="bulleted-list" text="Bulleted list" />
      <BlockButton format="numbered-list" text="Numbered list" />
      <BlockButton format="block-quote" text="Blockquote" />
    </div>
  );
};

export default Toolbar;
