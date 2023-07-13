import asyncHandler from "express-async-handler";
import { Password, make } from "simple-body-validator";

/**
 * Get the validation rules that apply to the role add request.
 *
 * @return array
 */
const loginValidation = asyncHandler(async (req, res, next) => {
  const rules = {
    email: "required|email",
    password: [
      "required",
      Password.create().min(8).mixedCase().numbers().symbols(),
    ],
  };

  const validator = make().setData(req.query).setRules(rules);
  if (!validator.validate()) {
    const errors = validator.errors().all();
    res.json({
      status: false,
      message: "Validation failed",
      errors: errors,
    });
  }
  next();
});
export { loginValidation };
