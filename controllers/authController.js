import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Employee from "../models/employee.js";
import employeeRepository from "../repositories/employeeRepository.js";

const employeeRepo = new employeeRepository();

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Employee Login
 *     operationId: login
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: email
 *          description: "Your email"
 *          type: string
 *        - in: query
 *          name: password
 *          description: "Your password"
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.query;
  const employee = await employeeRepo.getEmployee(email);

  if (employee && (await employee.matchPassword(password))) {
    const token = generateToken(res, employee._id);
    // Regenerate session when signing in
    // to prevent fixation
    // or in this case the entire user object
    req.session.user = employee;

    res.json({
      status: true,
      message: "Logged In Successful.",
      data: { user: employee, token: token },
    });
  } else {
    res.json({
      status: false,
      message: "Invalid email or password.",
      data: [],
    });
  }
});

export { login };
