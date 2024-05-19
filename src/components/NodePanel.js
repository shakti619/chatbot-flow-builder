import React from "react";
import { BrandWhatsapp, Message } from "tabler-icons-react";
import '../styles/NodePanel.css';

const NodePanel = () => {
  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside style={styles.panel}>
      <div style={styles.description}>Drag a node to the flow pane</div>
      <div
        onDragStart={(event) => handleDragStart(event, "textNode")}
        draggable
        style={styles.node}
        className="dndnode input"
      >
        <Message size={24} style={styles.icon} />
        <span>Message</span>
      </div>
    </aside>
  );
};

const styles = {
  panel: {
    padding: "10px",
    width: "100%",
    height: "100vh",
    backgroundColor: "#f4f4f4",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  description: {
    marginBottom: "10px",
    fontWeight: "bold",
    textAlign: "center",
  },
  node: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#fff",
    cursor: "grab",
    textAlign: "center",
    width: "150px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  icon: {
    marginRight: "8px",
  },
};

export default NodePanel;
