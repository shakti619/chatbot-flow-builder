import React, { useEffect, useRef } from "react";

const SettingsPanel = ({ selectedNode, handleLabelChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedNode]);

  const handleTextChange = (event) => {
    const newLabel = event.target.value;
    handleLabelChange(newLabel);
  };

  return (
    <aside style={styles.panel}>
      <h3 style={styles.heading}>Message</h3>
      <label htmlFor="text" style={styles.label}>Text:</label>
      <textArea
        type="text"
        id="text"
        value={selectedNode.data.label}
        onChange={handleTextChange}
        style={styles.input}
        ref={inputRef}
      />
    </aside>
  );
};

const styles = {
  panel: {
    padding: "10px",
    width: "100%",
    backgroundColor: "#fff",
    height: "100vh",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  heading: {
    marginBottom: "10px",
    fontWeight: "bold",
  },
  label: {
    display: "block",
    marginBottom: "5px",
  },
  textArea: {
    width: "100%",
    padding: "5px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
};

export default SettingsPanel;
