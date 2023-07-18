import express from "express";
import { 
    edit, 
    see, 
    logout, 
    startGithubeLogin, 
    finishGithubeLogin 
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/:id", see);
userRouter.get("/githube/start", startGithubeLogin);
userRouter.get("/githube/finish", finishGithubeLogin);

export default userRouter;