import express from "express";
import { edit, remove, see, logout, startGithubeLogin, finishGithubeLogin } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/delete", remove);
userRouter.get("/:id", see);
userRouter.get("/logout", logout);
userRouter.get("/githube/start", startGithubeLogin);
userRouter.get("/githube/finish", finishGithubeLogin);

export default userRouter;