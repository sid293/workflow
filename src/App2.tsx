import { useEffect, useState } from "react";
import axios from "axios";
import {wait, filterData,convertFormat,sendPostRequest } from "./Operations.js";
// @ts-ignore
import DragAndDrop from "./DragAndDrop/DragAndDrop.jsx";

export default function RunWorkflow(){
    let [csvdata, setCsvdata] = useState();
    type Node = {
        id:string;
        type:string;
        data:{label:string}
    }
    type Edge = {
        id:string;
        source:string;
        target:string;
    }
    type Workflow= {
        id:string;
        nodes:Node[];
        edges:Edge[];
    }
    let [workflows, setWorkflows] = useState<{id:string,nodes:Node[]}[]>([]);
    let [selected, setSelected] = useState("");
    let [filteredData, setFilteredData] = useState(null);
    let [jsonData, setJsonData] = useState(null);

    async function fetchWorkflows(){
        let backendUrl = import.meta.env.VITE_BACKEND_URL;
        let response = await axios.get(`${backendUrl}workflowids`);
        if (response) {
            setWorkflows(response.data.data);
        } else {
            console.log("something went wrong");
        }
    }

    async function runSelectedWorkflow(){
        let selectedWorkflow = workflows.find((workflow)=>workflow.id === selected) as Workflow | undefined;
        if(!selectedWorkflow){
            console.log("workflow not found");
            return;
        }
        let startNode = selectedWorkflow.nodes.find((node)=> node.data.label==="start");
        if(!startNode){
            console.log("start node not found");
            return;
        }
        let currentNode = startNode ?? null;
        let connectedEdge = selectedWorkflow.edges.find((edge)=> currentNode.id===edge.source);
        while(connectedEdge !== undefined){
            let label = currentNode?.data.label;
            //perform operation
            switch(label){
                case "wait":
                    wait();
                    break;
                case "filter data":
                    if (csvdata) {
                        let response = await filterData(csvdata);
                        if (response !== undefined) {
                            setFilteredData(response);
                        }
                    }
                    break;
                case "send post request":
                    if(jsonData){
                        sendPostRequest(jsonData);
                    }else{
                        console.log("json data not found");
                    }
                    break;
                case "convert format":
                    let json = convertFormat(filteredData);
                    if(json){
                        setJsonData(json);
                    }
                    break;
                default:
                    break;
            }
            currentNode = selectedWorkflow.nodes.find((node)=> node.id === connectedEdge?.target)!;
            connectedEdge = selectedWorkflow.edges.find((edge)=> currentNode.id===edge.source);
        }
    }
    useEffect(() => {
        fetchWorkflows();
    }, [])
    return(
        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column"
        }}>
            <p>Run workflow screen</p>
            <div style={{
            }} >
                <DragAndDrop csvdata={csvdata} setCsvdata={setCsvdata}/>
                <p>select workflow </p>
                <select
                value={selected}
                onChange={(e)=> setSelected(e.target.value)}>
                    <option>start</option>
                    {workflows.length > 0 && workflows.map((workflow)=>(
                        <option value={workflow.id}>{workflow.id}</option>
                    ))}
                </select>
                <button onClick={()=>runSelectedWorkflow()}>Run</button>
                {/* <input type="file" id="file-input" accept=".csv"/>
                    <button id="upload-button">Upload File</button>
                    <div id="file-drop-zone">Drop CSV file here</div> */}
            </div>
        </div>
    )
}