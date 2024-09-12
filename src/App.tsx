import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import db from "./db";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  // type OnDelete,
  // type Node,
  // type Edge,
  Connection,
  // NodeTypes,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialNodes, nodeTypes } from './nodes';
import { initialEdges, edgeTypes } from './edges';
// import {StartNode} from './nodes/StartNode';
import {AppNode} from './nodes/types';
// import { createServer } from './server';

export default function App() {
  const [nodes, setNodes , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [workflowId, setWorkflowId] = useState("");
  // let workflowid: string = Math.random().toString(36).slice(2,11);
  const navigate = useNavigate();

  const validateConnetion = useCallback((connection: Connection)=>{
    let target: string = connection.target;
    // console.log("edges ",edges," target ",target);
    let targetExist = edges.find((e)=> e.target === target);
    if(targetExist){
      console.log("target present");
      return false;
    }
    return true;
  },[nodes,edges])

  const onConnect: OnConnect = useCallback(
    (connection) => {
      if (validateConnetion(connection)) {
        setEdges((edges) => addEdge({ ...connection, animated: true }, edges))
      }
    }
    ,[setEdges]
  );

  async function saveWorkflow(){
    let workflowObject = {id:workflowId,nodes:nodes,edges:edges};
    setWorkflowId(Math.random().toString(36).slice(2,11));
    let backendUrl = import.meta.env.VITE_BACKEND_URL;
    // console.log("backend url ",backendUrl);
    let response = await axios.post(`${backendUrl}setworkflow`,workflowObject);
    // console.log("saveworkflow responser ",response);
    if(response){
      console.log("successfully added");
      navigate("/run");
    }else{
      console.log("something went wrong");
    }
  }
  const addNodeAtCenter = (type: keyof typeof nodeTypes, name: string)=>{
    let newNode: AppNode = {
      id: Math.random().toString(36).slice(2,11),
      type,
      position: { x: -100, y: 100 },
      data: { label: name},
    };
    setNodes((nds)=>[...nds,newNode]);

  }
  
  useEffect(()=>{
    setWorkflowId(Math.random().toString(36).slice(2,11));
  },[]);

  return (
    <div style={{
      width:"90vw",
      height:"90vh",
      border:"2px solid green",
      display:"flex"}}>
      <div
        style={{
          height: "40px",
          zIndex: 1,
          display: "felx",
          // justifySelf:"end",
          right: "10vw",
          position: "absolute"
        }}
      >
        <p>{workflowId}</p>
        <button
          onClick={() => saveWorkflow()}
        >saveWorkflow</button>
      </div>
      <div style={{
        border:"2px solid green", 
        height:"40vh",
        width:"10vw",
        position:"absolute",
        display:"flex",
        flexDirection:"column",
        zIndex:1,
        alignSelf:"center"}}>
        sidepanel
        <button onClick={()=>addNodeAtCenter("StartNode","start")}>
          start
        </button>
        <button onClick={()=>addNodeAtCenter("position-logger","filter data")}>
          filter data
        </button>
        <button onClick={()=>addNodeAtCenter("position-logger","wait")}>
          wait
        </button>
        <button onClick={()=>addNodeAtCenter("position-logger","convert format")}>
          convert format
        </button>
        <button onClick={()=>addNodeAtCenter("position-logger","send post request")}>
          send post request
        </button>
        <button onClick={()=>addNodeAtCenter("EndNode","end")}>
          end
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        // onNodesDelete={onNodesDelete}
        onConnect={onConnect}
        // onDelete={onDelete}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}
