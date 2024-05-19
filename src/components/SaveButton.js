import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Button component to save changes
const SaveButton = ({ nodes, edges }) => {
  // Handler for save button click
  const handleSave = () => {
    const hasErrors = nodes.some(
      (node) =>
        node.data.label.trim() === "" || // Check for empty node labels
        !edges.some((edge) => edge.source === node.id || edge.target === node.id) // Check for disconnected nodes
    );

    if (hasErrors) {
      toast.error("There are nodes without connections or with empty labels.");
    } else {
      toast.success("Flow saved successfully.");
    }
  };

  return (
    <button onClick={handleSave} style={styles.button}>
      Save Changes
    </button>
  );
};

// Styles for the button
const styles = {
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  },
};

export default SaveButton;
