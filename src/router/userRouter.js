import express from "express";
import { 
    getEdit,
    postEdit, 
    see, 
    logout, 
    startGithubeLogin, 
    finishGithubeLogin 
} from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middleware";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/githube/start", publicOnlyMiddleware, startGithubeLogin);
userRouter.get("/githube/finish", publicOnlyMiddleware, finishGithubeLogin);
userRouter.get("/:id", see);

export default userRouter;