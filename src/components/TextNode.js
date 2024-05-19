import React from "react";
import { Handle } from "reactflow";
import { BrandWhatsapp, Message } from "tabler-icons-react";
import { Text } from "@mantine/core";

const TextNode = ({ data }) => {
  return (
    <div style={styles.node}>
      <Handle type="target" position="left" style={styles.handle} />
      <div style={styles["send-message-header"]}>
        <div style={styles["icon-container"]}>
          <Message size={20} style={styles.messageIcon} />
          <BrandWhatsapp size={20} />
        </div>
        <Text size={15}>Send Message</Text>
      </div>
      <div>{data.label}</div>
      <Handle type="source" position="right" style={styles.handle} />
    </div>
  );
};

const styles = {
  node: {
    padding: "5px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#e8f5e9",
    textAlign: "center",
    width: "151.2px", // 4 cm
    height: "94.5px", // 2.5 cm
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Added shadow
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
    background: "#e0f7fa", // Adjusted background color
    padding: "5px",
    borderRadius: "5px 5px 0 0",
    height: "30px", // Adjusted height
  },
  "icon-container": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "5px",
  },
  messageIcon: {
    marginTop: "0px", // Adjusted to align the message icon with the text
  },
};

export default TextNode;
