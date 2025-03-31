import e from "express";
import * as User from "../controllers/user.controller.js"
const router = e.Router();

router.get('/', User.getAllUsers);
router.get('/:id', User.getOneUser);
router.patch('/:id');
router.delete('/:id', User.deleteUser);

export default router;