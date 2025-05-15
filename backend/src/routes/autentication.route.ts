import e from "express";
import * as Auth from "../controllers/auth.controller";
const router = e.Router();

router.post('/register', Auth.register);
router.post('/login', Auth.login);

export default router;