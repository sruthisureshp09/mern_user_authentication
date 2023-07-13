import asyncHandler from "express-async-handler";
import { make } from "simple-body-validator";

/**
 * Get the validation rules that apply to the role add request.
 *
 * @return array
 */
const roleAddRequest = asyncHandler(async (req, res, next) => {
  const rules = {
    name: [
      "required",
      "string"
    ],
    description: [
      "string"
    ],
    permissions: ["required"],
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

/**
 * Get the validation rules that apply to the role edit request.
 *
 * @return array
 */
const roleUpdateRequest = asyncHandler(async (req, res, next) => {
  const rules = {
    id: ["required", "string"],
    name: ["required", "string"],
    permissions: ["required", "string"],
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

/**
 * Get the validation rules that apply to the role edit request.
 *
 * @return array
 */
const roleGetRequest = asyncHandler(async (req, res, next) => {
  const rules = {
    id: ["required", "string"],
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

/**
 * Get the validation rules that apply to the role edit request.
 *
 * @return array
 */
const roleDeleteRequest = asyncHandler(async (req, res, next) => {
  const rules = {
    id: ["required", "string"],
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

export { roleAddRequest, roleUpdateRequest, roleGetRequest, roleDeleteRequest };
