import React, { useMemo, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import "./LinderTextEditor.css";

const LinderTextEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }]
    }
  ]);

  return (
    <div
      className="text-editor"
    >
      <Slate editor={editor} value={value} onChange={value => setValue(value)}>
        <Editable />
      </Slate>
    </div>
  );
};

export default LinderTextEditor;
