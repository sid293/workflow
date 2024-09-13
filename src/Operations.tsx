//@ts-ignore
import Papa from 'papaparse';
import axios from 'axios';

function wait(){
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + 1000) {

    }
}
async function filterData(csvdata: any){
    const readFile = (file: any)=>{
        return new Promise((resolve,reject)=>{
            const reader = new FileReader();
            reader.onload = (event)=>{
                if(event.target){
                    resolve(event.target.result);
                }else{
                    reject(new Error("failed to read data"));
                }
            };
            reader.onerror = (error)=>{
                reject(error);
            }
            reader.readAsText(file);
        })
    }
    const convertToLowercase = (csvData: any) =>{
        const lines = csvData.split("\n");
        const lowercaseLines = lines.map((line: string)=> line.toLowerCase());
        return lowercaseLines.join("\n");
    }
    let ans = await readFile(csvdata)
        .then((csvData)=>{
            const lowercaseCsvData = convertToLowercase(csvData);
            return lowercaseCsvData;
        })
        .catch((error)=>{
            console.error(error);
            return null;
        })
    return ans;
}

function convertFormat(filteredData: any){
    let json = null;
    const parseCSV = (file: any) => {
        Papa.parse(file, {
            header: true,
            complete: (results: any) => {
                json = results.data;
            },
            error: (error: any) => {
                console.error(error);
            },
        });
    };
    parseCSV(filteredData);
    return json;
}

function sendPostRequest(jsonData: any){
    let url = "https://webflow.requestcatcher.com/test";
    axios.post(url,jsonData)
        .then((response)=>{
            console.log("axios response ",response);
        })
        .catch((error)=>{
            console.error("error ",error);
        })
}

export {wait, filterData,convertFormat,sendPostRequest };