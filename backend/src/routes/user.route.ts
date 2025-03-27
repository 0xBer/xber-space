import e from "express";
import * as User from "../controllers/user.controller.js"
const router = e.Router();

router.post('/', User.create);
router.get('/', User.getAll);
router.get('/:id', User.getOne);
router.patch('/:id');
router.delete('/:id');

export default router;