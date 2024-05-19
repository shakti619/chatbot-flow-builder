import React from "react";
import { Handle } from "reactflow";
import { BrandWhatsapp, Message } from "tabler-icons-react";
import { Text } from "@mantine/core";

// Custom node component for text nodes
const TextNode = ({ data }) => {
  return (
    <div style={styles.node}>
      <Handle type="target" position="left" style={styles.handle} />
      <div style={styles["send-message-header"]}>
        <Message size={12} style={styles.messageIcon} />
        <Text size={8}>Send Message</Text>
        <BrandWhatsapp size={12} />
      </div>
      <div style={styles.label}>{data.label}</div>
      <Handle type="source" position="right" style={styles.handle} />
    </div>
  );
};

// Styles for the text node
const styles = {
  node: {
    padding: "5px",
    flexWrap: "wrap",
    
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    textAlign: "center",
    width: "151.2px", // 4 cm
    height: "70.5px", // 2.5 cm
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Added shadow
    overflow: "hidden", // Ensure the content is contained within the node
    wordWrap: "break-word",
  },
  handle: {
    borderRadius: "50%",
    width: "10px",
    height: "10px",
    backgroundColor: "#007bff",
  },
  "send-message-header": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#b0f1e3", // Adjusted background color
    padding: "5px",
    borderRadius: "5px 5px 0 0",
    height: "15px", // Adjusted height
  },
  messageIcon: {
    marginTop: "0px", // Adjusted to align the message icon with the text
  },
  label: {
    display: "flex",
    flexWrap: "wrap",
    
    wordWrap: "break-word",
  },
};

export default TextNode;
