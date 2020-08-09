import express from "express";
import GradeController from "../controllers/grades.js";

const router = express.Router();

GradeController.init();

router.get("/:id", (req, res) => {
  try {
    const response = GradeController.getGrade(parseInt(req.params.id));
    res.status(200).send(response);
  } catch (error) {
    console.log("Error:", error);
    res.status(404).send(error.message);
  }
});

router.get("/:student/:subject", (req, res) => {
  console.log("Params:", req.params);
  try {
    const response = GradeController.getTotalStudentGradeBySubject(req.params);
    res.status(200).send(response);
  } catch (error) {
    console.log("Error:", error);
    res.status(404).send(error.message);
  }
});

router.get("/avarage/:subject/:type", (req, res) => {
  try {
    const response = GradeController.getAvarageGradeBySubjectAndType(
      req.params
    );
    res.status(200).send(response);
  } catch (error) {
    console.log("Error:", error);
    res.status(404).send(error.message);
  }
});

router.get("/best/:subject/:type/:n?", (req, res) => {
  try {
    const response = GradeController.getTopGradeBySubjectAndType(req.params);
    res.status(200).send(response);
  } catch (error) {
    console.log("Error:", error);
    res.status(404).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const response = await GradeController.insertGrade(req.body);
    res.status(200).send(response);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const response = await GradeController.updateGrade(
      parseInt(req.params.id),
      req.body
    );

    res.status(200).send(response);
  } catch (error) {
    console.log("Error:", error);
    res.status(404).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const response = await GradeController.deleteGrade(parseInt(req.params.id));
    res.status(200).send(response);
  } catch (error) {
    console.log("Error:", error);
    res.status(404).send(error.message);
  }
});

export default router;
