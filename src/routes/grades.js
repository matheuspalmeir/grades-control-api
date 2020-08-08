import express from "express";

const router = express.Router();

router.get("/:id", (req, res) => {
  let response = {};
  const status = 200;

  try {
    response = {
      message: "GET Grades",
    };
  } catch (error) {
    console.log("Error:", error);
    response = error;
    status = 400;
  }

  res.send(status, response);
});

router.get("/:student/:subject", (req, res) => {
  let response = {};
  const status = 200;

  try {
    response = {
      message: "GET Student Total Grades",
    };
  } catch (error) {
    console.log("Error:", error);
    response = error;
    status = 400;
  }

  res.send(status, response);
});

router.get("/avarage/:subject/:type", (req, res) => {
  let response = {};
  const status = 200;

  try {
    response = {
      message: "GET Subject and Type Avarage",
    };
  } catch (error) {
    console.log("Error:", error);
    response = error;
    status = 400;
  }

  res.send(status, response);
});

router.get("/best/(:quantity)/:subject/:type", (req, res) => {
  let response = {};
  const status = 200;

  try {
    response = {
      message: "GET Three Best Subject and Type ",
    };
  } catch (error) {
    console.log("Error:", error);
    response = error;
    status = 400;
  }

  res.send(status, response);
});

router.post("/", (req, res) => {
  let response = {};
  const status = 200;

  try {
    response = {
      message: "Insert Grades",
    };
  } catch (error) {
    console.log("Error:", error);
    response = error;
    status = 400;
  }

  res.send(status, response);
});

router.put("/:id", (req, res) => {
  let response = {};
  const status = 200;

  try {
    response = {
      message: "Update Grades",
    };
  } catch (error) {
    console.log("Error:", error);
    response = error;
    status = 400;
  }

  res.send(status, response);
});

router.delete("/:id", (req, res) => {
  let response = {};
  const status = 200;

  try {
    response = {
      message: "Delete Grades",
    };
  } catch (error) {
    console.log("Error:", error);
    response = error;
    status = 400;
  }

  res.send(status, response);
});

export default router;
