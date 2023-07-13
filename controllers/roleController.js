import asyncHandler from "express-async-handler";
import roleRepository from "../repositories/roleRepository.js";
import roleResource from "../resources/roleResource.js";

const roleRepo = new roleRepository();
/**
 *
 * Add Role
 *
 * @swagger
 * /role/add:
 *   post:
 *     tags:
 *       - Role
 *     summary: Add Employee Role
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: name
 *          description: Enter Role Name
 *          type: string
 *        - in: query
 *          name: description
 *          description: Enter Role Description
 *          type: string
 *        - in: query
 *          name: permissions
 *          description: Json Array of permissions
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const addRole = asyncHandler(async (req, res) => {
  const { name, permissions,description } = req.query;
  const roleData = {
    name: name,
    permissions: permissions,
    description: description,
  };
  const roleDetails = await roleRepo.addRole(roleData);
  if (roleDetails) {
    const rolResponse = roleResource(roleDetails);
    res.json({
      status: true,
      message: "Role created successfully.",
      data: rolResponse,
    });
  } else {
    res.json({
      status: false,
      message: "Failed to create role",
      data: [],
    });
  }
});

/**
 *
 * Get Role
 *
 * @swagger
 * /role/get:
 *   post:
 *     tags:
 *       - Role
 *     summary: Get role details by id
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: id
 *          description: Enter the role id
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const getRole = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const role = await roleRepo.getRole(id);
  if (role) {
    const roleResponse = roleResource(role);
    res.json({
      status: true,
      message: "Role details.",
      data: roleResponse,
    });
  } else {
    res.json({
      status: false,
      message: "Failed to get role details",
      data: [],
    });
  }
});

/**
 *
 * List Roles
 *
 * @swagger
 * /role/list:
 *   post:
 *     tags:
 *       - Role
 *     summary: List Role
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const listRole = asyncHandler(async (req, res) => {
  const roles = await roleRepo.listRole();
  const roleData = roles.map((role) => roleResource(role));
  res.json({
    status: true,
    message: "role listed successfully.",
    data: roleData,
  });
});

/**
 *
 * Delete Role
 *
 * @swagger
 * /role/delete:
 *   post:
 *     tags:
 *       - Role
 *     summary: Delete role with id
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: id
 *          description: Enter the role id
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const deleteRole = asyncHandler(async (req, res) => {
  const { id } = req.query;

  const deleted = await roleRepo.deleterole(id);
  if (deleted) {
    res.json({
      status: true,
      message: "Role deleted successfully.",
      data: [],
    });
  } else {
    res.json({
      status: false,
      message: "Failed to delete role.",
      data: [],
    });
  }
});

/**
 *
 * Update Role
 *
 * @swagger
 * /role/update:
 *   post:
 *     tags:
 *       - Role
 *     summary: Update role
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: id
 *          description: Enter the role id
 *          type: string
 *        - in: query
 *          name: name
 *          description: Enter Role Name
 *          type: string
 *        - in: query
 *          name: description
 *          description: Enter Role Description
 *          type: string
 *        - in: query
 *          name: permissions
 *          description: Json Array of permission ids
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const updateRole = asyncHandler(async (req, res) => {
  const { id, name, permissions, description } = req.query;

  const roleData = {
    name: name,
    permissions: permissions,
    description: description,
  };

  const updatedrole = await roleRepo.updaterole(id, roleData);
  const roleResponse = roleResource(updatedrole);
  if (updaterole) {
    res.json({
      status: true,
      message: "Role updated successfully.",
      data: roleResponse,
    });
  } else {
    res.json({
      status: false,
      message: "Failed to update role.",
      data: [],
    });
  }
});

export { addRole, getRole, listRole, deleteRole, updateRole };
