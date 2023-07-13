import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Employee from "../models/employee.js";

/**
 * @DESC Verify JWT from authorization header Middleware
 */
const authenticateEmployee = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(403);
  const token = authHeader.split(" ")[2];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (decoded) {
        const { userId } = decoded;
        const employee = await Employee.findById(userId);
        req.session.user = employee;
        if (err) {
          res.json({
            status: false,
            message: "Not authorized",
          });
        }
        next();
      }else{
        res.json({
          status: false,
          message: "Not authorized",
        });
      }
    });
  } else {
    res.json({
      status: false,
      message: "Not authorized",
    });
  }
});

export { authenticateEmployee };
