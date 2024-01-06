import express from "express";
import signUp from "../controllers/signUpController.js";
import signIn from "../controllers/logInController.js";
import { userSchema, validate } from "../helpers/helperZode.js";
import displayDashboard from "../controllers/displayDashboard.js";
import verifJwt from "../controllers/verifyJWT.js";
import getEntrevistas from "../resources/getEntrevistas.js";
import getVideos from "../resources/getVideos.js";
import { postEntrevista } from "../resources/postEntrevista.js";
import { postVideo } from "../resources/postVideo.js";

const router = express.Router();

router.post("/signUp", signUp);

router.post("/signIn", validate(userSchema), signIn);

router.post("/displayDhb", verifJwt, displayDashboard);

router.get("/entrevistas", getEntrevistas);

router.get("/videos", getVideos);

router.post("/entrevistas", verifJwt, postEntrevista);

router.post("/videos", verifJwt, postVideo);

export default router;

