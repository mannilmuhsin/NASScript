import express from "express";
import auth from "../middleware/auth.js";
import { editCompany } from "../controllers/companyController.js";

const router = express.Router();

router.use(auth);

router.post("/edit_nfc/:nfcCode", editCompany);

export default router;
