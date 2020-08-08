import { promises as fs } from "fs";

const { readFile, writeFile } = fs;
const path = "./database/grades.json";
export const selectGradesData = async () => {
  try {
    const file = await readFile(path, "utf-8");
    const parsedFile = JSON.parse(file);
    return parsedFile;
  } catch (error) {
    console.log("Error:", error);
  }
};

export const saveGradesData = async (gradesData) => {
  try {
    console.log("Cheguei na gravação");

    const error = await writeFile(path, JSON.stringify(gradesData), "utf8");
    if (!error) {
      return true;
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
