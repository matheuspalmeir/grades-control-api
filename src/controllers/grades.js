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

  deleteGrade = async (id) => {
    if (!gradeExists(id, this.gradesData.grades)) {
      throw new Error(
        "The recevied grade id does not exist! You can try again with a valid grade id!"
      );
    }

    const newGradesData = this.gradesData.grades.filter(
      (grade) => grade.id !== id
    );

    this.gradesData.grades = newGradesData;

    const isWrote = await saveGradesData(this.gradesData);
    if (!isWrote) {
      throw new Error(
        "Was not possible to insert a new grade, something is wrong, try again!"
      );
    }

    return { message: "The grade was removed with success!" };
  };

  getGrade = (id) => {
    if (!gradeExists(id, this.gradesData.grades)) {
      throw new Error(
        "The recevied grade id does not exist! You can try again with a valid grade id!"
      );
    }

    const gradeIndex = findGrade(id, this.gradesData.grades);
    return this.gradesData.grades[gradeIndex];
  };

  getTotalStudentGradeBySubject = ({ student, subject }) => {
    const parsedStudent = student.replace("_", " ");
    const parsedSubject = subject.replace("_", " ");

    const exists = studentExists(parsedStudent, this.gradesData.grades);

    if (!exists) {
      throw new Error(
        "The recevied student does not exist! You can try again with a valid student!"
      );
    }

    const studentTotalGrade = sumGradesFromStudentBySubject(
      this.gradesData.grades,
      parsedStudent,
      parsedSubject
    );

    return { student: parsedStudent, totalGrade: studentTotalGrade };
  };

  getAvarageGradeBySubjectAndType = ({ subject, type }) => {
    const parsedSubject = subject.replace("_", " ");
    const parsedType = type.replace("_", " ");

    const exists = subjectExists(parsedSubject, this.gradesData.grades);

    if (!exists) {
      throw new Error(
        "The recevied subject does not exist! You can try again with a valid subject!"
      );
    }

    const sumGrades = sumGradesBySubjectAndType(
      this.gradesData.grades,
      parsedSubject,
      parsedType
    );

    const countGrades = countGradesBySubjectAndType(
      this.gradesData.grades,
      parsedSubject,
      parsedType
    );

    return { gradesAvarage: sumGrades / countGrades };
  };

  getTopGradeBySubjectAndType = ({ subject, type, n = 3 }) => {
    const parsedSubject = subject.replace("_", " ");
    const parsedType = type.replace("_", " ");

    const exists = subjectExists(parsedSubject, this.gradesData.grades);

    if (!exists) {
      throw new Error(
        "The recevied subject does not exist! You can try again with a valid subject!"
      );
    }

    const orderedGrades = this.gradesData.grades.filter((grade) => {
      return (
        grade.subject.localeCompare(parsedSubject) === 0 &&
        grade.type.localeCompare(parsedType) === 0
      );
    });

    orderedGrades.sort(
      (gradeA, gradeB) => parseFloat(gradeB.value) - parseFloat(gradeA.value)
    );

    return { [`${n}bestGrades`]: orderedGrades.slice(0, n) };
  };
}

const incrementId = (id) => {
  return id + 1;
};

const gradeExists = (id, grades) => {
  return grades.some((grade) => grade.id === id);
};

const studentExists = (student, grades) => {
  return grades.some((grade) => grade.student.localeCompare(student) === 0);
};

const subjectExists = (subject, grades) => {
  return grades.some((grade) => grade.subject.localeCompare(subject) === 0);
};

const findGrade = (id, grades) => {
  return grades.findIndex((grade) => grade.id === id);
};

const sumGradesFromStudentBySubject = (grades, student, subject) => {
  return grades.reduce((acc, grade) => {
    if (
      grade.student.localeCompare(student) === 0 &&
      grade.subject.localeCompare(subject) === 0
    ) {
      return acc + parseFloat(grade.value);
    }

    return acc;
  }, 0);
};

const sumGradesBySubjectAndType = (grades, subject, type) => {
  return grades.reduce((acc, grade) => {
    if (
      grade.subject.localeCompare(subject) === 0 &&
      grade.type.localeCompare(type) === 0
    ) {
      return acc + parseFloat(grade.value);
    }

    return acc;
  }, 0);
};

const countGradesBySubjectAndType = (grades, subject, type) => {
  return grades.filter((grade) => {
    return (
      grade.subject.localeCompare(subject) === 0 &&
      grade.type.localeCompare(type) === 0
    );
  }).length;
};

export default new GradeController();
