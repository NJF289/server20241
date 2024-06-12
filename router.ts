import { Router } from "express";
import { listCourse, saveCourse } from "./controllers/course";
import { listStudants, saveStudants, deleteStudants } from "./controllers/studant";
const router = Router();

router.get("/courses", listCourse);
router.post("/courses", saveCourse);
router.get("/studants", listStudants);
router.post("/studants", saveStudants);
router.delete("/studants/:id", deleteStudants)
export { router };
