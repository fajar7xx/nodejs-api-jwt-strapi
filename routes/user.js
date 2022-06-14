import express from "express";
import verify from "./verify";

const router = express.Router();

router.get("/test", (request, response) => {
  response.send("user test has been successfully tested");
  console.info("get user test route has been successfully");
});

router.put("/:id", verify.verifyToken, (request, response) => {
  // if(request.user.id === request.params.id)
});

export default router;
