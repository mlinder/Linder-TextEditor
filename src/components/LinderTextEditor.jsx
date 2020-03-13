import React, { useMemo, useState, useCallback } from "react";
import { Editor, createEditor, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import isHotkey from "is-hotkey";

import Toolbar from "./Toolbar";
import "./LinderTextEditor.css";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline"
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <del>{children}</del>;
  }

  return <span {...attributes}>{children}</span>;
};

const toggleBlock = (editor, format) => {
  console.log(editor, format);
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const LinderTextEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }]
    }
  ]);
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  const handleKeyDown = event => {
    if (event.shiftKey === true && event.key === "Enter") {
      event.preventDefault();
      editor.insertText("\n");
    }

    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  };

  return (
    <div className="text-editor">
      <Toolbar
        editor={editor}
        toggleBlock={toggleBlock}
        toggleMark={toggleMark}
        isBlockActive={isBlockActive}
        isMarkActive={isMarkActive}
      />
      <Slate editor={editor} value={value} onChange={value => setValue(value)}>
        <Editable
          className="write-area"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="on"
          autoCapitalize="sentences"
          spellCheck
        />
      </Slate>
    </div>
  );
};

export default LinderTextEditor;
