const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController")

router.post("/create", taskController.createTask);
router.get("/:tid", taskController.getTaskById);
router.post("/assignPerformer", taskController.assignPerformer);

router
    .route('/')
    .get(taskController.getAllTasks);

router.post("/setTaskCompleted/:taskId", taskController.setTaskCompleted);

module.exports = router;