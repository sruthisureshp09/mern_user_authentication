import express from "express";
import {
  roleAddRequest,
  roleDeleteRequest,
  roleGetRequest,
  roleUpdateRequest,
} from "../requests/roleRequest.js";

import {
  addRole,
  deleteRole,
  getRole,
  listRole,
  updateRole,
} from "../controllers/roleController.js";
import { loginValidation } from "../requests/authRequest.js";
import { login } from "../controllers/authController.js";
import { authenticateEmployee } from "../middleware/authenticateEmployee.js";
import { checkPermissions } from "../middleware/checkPermission.js";

const router = express.Router();

/**
 * Auth Routes
 */
router.route("/login").post(loginValidation, login);

/**
 * Role Routes
 */
router
  .route("/role/add")
  .post(
    authenticateEmployee,
    checkPermissions("role-create"),
    roleAddRequest,
    addRole
  );
router
  .route("/role/get")
  .post(
    authenticateEmployee,
    checkPermissions("role-view"),
    roleGetRequest,
    getRole
  );
router
  .route("/role/update")
  .post(
    authenticateEmployee,
    checkPermissions("role-update"),
    roleUpdateRequest,
    updateRole
  );
router
  .route("/role/delete")
  .post(
    authenticateEmployee,
    checkPermissions("role-delete"),
    roleDeleteRequest,
    deleteRole
  );
router
  .route("/role/list")
  .post(authenticateEmployee, checkPermissions("role-view"), listRole);

export default router;
