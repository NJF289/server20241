import { Router } from "express";
import { listCompany, saveCompany} from "./controllers/company";
import { listEmployees, saveEmployees} from "./controllers/employee";
const router = Router();

router.get("/company", listCompany);
router.post("/company", saveCompany);
router.get("/employee", listEmployees);
router.post("/employee", saveEmployees);

export { router };
