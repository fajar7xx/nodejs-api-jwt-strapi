import { response } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (request, response, next) => {
  const authHeader = request.headers.token;

  if (authHeader) {
    jwt.verify(token, process.env.APP_SECRET, (err, user) => {
      if (err) {
        response.status(403).json({
          status: "failed",
          message: "Token is not valid!",
          data: nll,
        });
      }

      request.user = user;
      next();
    });
  } else {
    return response.status(401).json({
      status: "failed",
      message: "Your are not authenticated",
      data: null,
    });
  }
};

const verifyTokenAndAuthorization = (request, response, next) => {
  verifyToken(request, response, () => {
    if (request.user.id === request.params.id || request.user.isAdmin) {
      next();
    } else {
      response.status(403).json({
        status: "failed",
        message: "You are not allowed to do that!",
        data: null,
      });
    }
  });
};

export default {
  verifyToken,
  verifyTokenAndAuthorization,
};
