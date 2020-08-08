import { selectGradesData, saveGradesData } from "../models/grades.js";

class GradeController {
  constructor() {
    this.gradesData = {};
  }

  init = async () => {
    this.gradesData = await selectGradesData();
  };

  insertGrade = async (data) => {
    let grade = {
      id: this.gradesData.nextId,
      timestamp: new Date(),
      ...data,
    };

    this.gradesData.grades.push(grade);
    this.gradesData.nextId = incrementId(this.gradesData.nextId);

    const isWrote = await saveGradesData(this.gradesData);

    if (!isWrote) {
      throw new Error("Não foi possível inserir a nota, algo deu errado!");
    }

    return grade;
  };

  updateGrade = (id) => {
    console.log("Update");
  };

  deleteGrade = (id) => {
    console.log("Delete");
  };

  getGrade = (id) => {
    console.log("Get");
  };

  getTotalStudentGradeBySubject = (student, subject) => {
    console.log("Get Student");
  };

  getAvarageGradeBySubjectAndType = (subject, type) => {
    console.log("Avarage");
  };

  getTopGradeBySubjectAndType = (subject, type) => {
    console.log("Top");
  };
}

const incrementId = (id) => {
  return id + 1;
};

export default new GradeController();
