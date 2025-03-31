import e from "express";
import * as Posts from "../controllers/post.controller.js";
const router = e.Router();

router.get('/', Posts.getAllPosts);
router.get('/:id', Posts.getOnePost);
router.post('/', Posts.createPost);

export default router;