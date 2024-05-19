import React, { useEffect, useRef } from "react";
import { ArrowLeft } from "tabler-icons-react"; // Import the ArrowLeft icon

const SettingsPanel = ({ selectedNode, handleLabelChange, setSettingsPanelOpen }) => {
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
      <div style={styles.header}>
        <ArrowLeft
          className="left-arrow"
          size={30}
          onClick={() => setSettingsPanelOpen(false)}
          style={styles.leftArrow}
        />
        <h3 style={styles.heading}>Message</h3>
      </div>
      <label htmlFor="text" style={styles.label}>Text:</label>
      <textarea
        id="text"
        value={selectedNode ? selectedNode.data.label : ""}
        onChange={handleTextChange}
        style={styles.textArea}
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
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    position: "relative" // Ensure relative positioning for the arrow
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px" // Adjusted margin bottom
  },
  leftArrow: {
    cursor: "pointer",
    marginRight: "10px" // Add margin to the right for spacing
  },
  heading: {
    margin: 0,
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
