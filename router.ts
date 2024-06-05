import { Router } from "express";
import { listCourse, saveCourse } from "./controllers/course";
import { listStudants, saveStudants } from "./controllers/studant";
const router = Router();

router.get("/courses", listCourse);
router.post("/courses", saveCourse)
router.get("/studants", listStudants);
router.post("/studants", saveStudants)

export { router };
