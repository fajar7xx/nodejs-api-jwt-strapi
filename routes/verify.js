import jwt from "jsonwebtoken";

const verifyToken = (request, response, next) => {
  // const authHeader = request.headers.token;
  const authHeader = request.headers.authorization; //menyamakan dengan authorization bearer token
  // console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.APP_SECRET, (err, user) => {
      if (err) {
        response.status(403).json({
          status: "failed",
          message: "Token is not valid!",
          data: null,
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

const verifyTokenAndAdmin = (request, response, next) => {
  verifyToken(request, response, () => {
    if (request.user.isAdmin) {
      // console.log(request.user);
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
  verifyTokenAndAdmin,
};
