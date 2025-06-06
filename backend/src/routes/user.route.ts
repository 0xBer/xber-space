import e from "express";
import * as User from "../controllers/user.controller"
const router = e.Router();

router.get('/', User.getAllUsers);
router.get('/:id', User.getOneUser);
router.patch('/:id', User.updateUser);
router.delete('/:id', User.deleteUser);

export default router;