import { useEffect, useState } from "react";
import axios from "axios";
// @ts-ignore
import DragAndDrop from "./DragAndDrop/DragAndDrop.jsx";

export default function RunWorkflow(){
    let [workflows, setWorkflows] = useState([]);
    let [selected, setSelected] = useState("");

    async function fetchWorkflows(){
        let backendUrl = import.meta.env.VITE_BACKEND_URL;
        // console.log("backend url ",backendUrl);
        let response = await axios.get(`${backendUrl}workflowids`);
        // console.log("saveworkflow responser ",response);
        if (response) {
            console.log("successfully added");
            console.log("saveworkflow responser ",response.data.data);
            setWorkflows(response.data.data);
        } else {
            console.log("something went wrong");
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
                border:"2px solid blue"
            }} >
                <DragAndDrop />
                <p>select workflow </p>
                <select>
                    <option>start</option>
                    {workflows.length > 0 && workflows.map((workflow)=>(
                        <option>{workflow.id}</option>
                    ))}
                </select>
                <button>Run</button>
                {/* <input type="file" id="file-input" accept=".csv"/>
                    <button id="upload-button">Upload File</button>
                    <div id="file-drop-zone">Drop CSV file here</div> */}
            </div>
        </div>
    )
}