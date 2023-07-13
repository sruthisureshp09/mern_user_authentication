import Role from "../models/role.js";

/**
 * @DESC Check User Permissions
 */
const checkPermissions = (requiredPermissions) => async (req, res, next) => {
  const user = req.session.user;
  if (user) {
    const role = await Role.findOne({ name: user.role });
    if (user.role !== "Super Admin") {
      if (!role.permissions.includes(requiredPermissions)) {
        res.status(401).json("Sorry you do not have access to this route");
      } else {
        next();
      }
    } else {
      next();
    }
  } else {
    res.status(401).json("Sorry you do not have access to this route");
  }
};

export { checkPermissions };
