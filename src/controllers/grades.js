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
      throw new Error(
        "Was not possible to insert a new grade, something is wrong, try again!"
      );
    }

    return grade;
  };

  updateGrade = async (id, data) => {
    if (!gradeExists(id, this.gradesData.grades)) {
      throw new Error(
        "The recevied grade id does not exist! You can try again with a valid grade id!"
      );
    }

    const gradeIndex = findGrade(id, this.gradesData.grades);
    const oldGrade = this.gradesData.grades[gradeIndex];
    this.gradesData.grades[gradeIndex] = Object.assign({}, oldGrade, data);

    const isWrote = await saveGradesData(this.gradesData);
    if (!isWrote) {
      throw new Error(
        "Was not possible to insert a new grade, something is wrong, try again!"
      );
    }

    return this.gradesData.grades[gradeIndex];
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

const gradeExists = (id, grades) => {
  return grades.some((grade) => grade.id === id);
};

const findGrade = (id, grades) => {
  return grades.findIndex((grade) => grade.id === id);
};

export default new GradeController();
