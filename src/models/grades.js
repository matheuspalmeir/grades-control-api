import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

const gradesDatabase = () => {
    const file = await readFile('../database/grades.json', 'utf-8');
    const parsedFile = JSON.parse(file);
    console.log("Parsed File:", parsedFile);
    return parsedFile; 
};

export default gradesDatabase; 

