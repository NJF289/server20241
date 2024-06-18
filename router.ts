import { Router } from "express";
import { listCourse, saveCourse } from "./controllers/course";
import { listEmployees, saveEmployees} from "./controllers/employee";
const router = Router();

router.get("/courses", listCourse);
router.post("/courses", saveCourse);
router.get("/studants", listEmployees);
router.post("/studants", saveEmployees);

export { router };
