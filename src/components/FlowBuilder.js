import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import NodePanel from "./NodePanel";
import SettingsPanel from "./SettingsPanel";
import SaveButton from "./SaveButton";
import TextNode from "./TextNode";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Initial nodes and edges
const initialNodes = [
  {
    id: "1",
    type: "textNode",
    data: { label: "Start (ID: 1)" },
    position: { x: 250, y: 5 },
  },
];

const initialEdges = [];

// Define custom node types
const nodeTypes = {
  textNode: TextNode,
};

// Main component for building flow
const FlowBuilder = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const settingsPanelRef = useRef(null);
  const nodeCounter = useRef(2); // Counter to generate unique IDs for new nodes

  // Handler for node changes
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Handler for edge changes
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // Handler for connecting nodes
  const onConnect = useCallback(
    (params) => {
      const sourceHasEdge = edges.some((edge) => edge.source === params.source);
      if (!sourceHasEdge) {
        setEdges((eds) => addEdge(params, eds));
      } else {
        toast.error("Each source handle can only have one edge.");
      }
    },
    [edges]
  );

  // Handler for node click
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    setSettingsPanelOpen(true); // Open the settings panel when a node is clicked
  };

  // Handler for drag over event
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // Handler for drop event
  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");

    if (typeof type === "undefined" || !type) {
      return;
    }

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newId = nodeCounter.current++;
    const newNode = {
      id: `${newId}`, // Use counter for unique ID
      type,
      position,
      data: { label: `${type} node (ID: ${newId})` },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  // Handler for label change
  const handleLabelChange = (newLabel) => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedNode.id) {
            return {
              ...node,
              data: {
                ...node.data,
                label: newLabel,
              },
            };
          }
          return node;
        })
      );

      setSelectedNode((prevSelectedNode) => ({
        ...prevSelectedNode,
        data: {
          ...prevSelectedNode.data,
          label: newLabel,
        },
      }));
    }
  };

  // Handler for clicking outside of settings panel
  const handleClickOutside = useCallback((event) => {
    if (
      settingsPanelRef.current &&
      !settingsPanelRef.current.contains(event.target) &&
      !reactFlowWrapper.current.contains(event.target)
    ) {
      setSelectedNode(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#ffffff" }}>
      <div style={styles.navbar}>
        <h3 style={styles.navbarTitle}>Chatbot Flow Builder</h3>
        <ToastContainer position="top-center" /> {/* Set position to top-center */}
        <SaveButton nodes={nodes} edges={edges} />
      </div>
      <div style={styles.container}>
        <div style={styles.flowWrapper} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        {settingsPanelOpen && selectedNode ? (
          <div ref={settingsPanelRef} style={styles.sidebar}>
            <SettingsPanel 
              selectedNode={selectedNode} 
              handleLabelChange={handleLabelChange} 
              setSettingsPanelOpen={setSettingsPanelOpen} // Pass the state handler
            />
          </div>
        ) : (
          <div style={styles.sidebar}>
            <NodePanel />
          </div>
        )}
      </div>
    </div>
  );
};

// Styles for the flow builder components
const styles = {
  navbar: {
    backgroundColor: "#f3f3f3",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
  },
  navbarTitle: {
    margin: 0,
    fontSize: "18px",
  },
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
  },
  flowWrapper: {
    flex: 1,
    position: "relative",
    height: "calc(100vh - 50px)", // Adjust height to take up remaining space
  },
  sidebar: {
    width: "200px",
    borderLeft: "1px solid #ddd",
    backgroundColor: "#f4f4f4",
    padding: "10px",
    height: "calc(100vh - 50px)", // Adjust height to take up remaining space
  },
};

export default FlowBuilder;
