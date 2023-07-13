import Role from "../models/role.js";

export default class roleRepository {
  /**
   * Add Role
   * @param Array roleData
   * @return role
   */
  async addRole(roleData) {
    const role = new Role();
    Object.keys(roleData).forEach((key) => {
      role[key] = roleData[key];
    });
    role.save();
    return role;
  }

  /**
   * Get role
   * @param String roleId
   * @return role
   */
  async getrole(roleId) {
    const role = await Role.findById(roleId);
    return role;
  }

  /**
   * Update role
   * @param String roleId
   * @param role roleData
   * @return employee
   */
  async updaterole(roleId, roleData) {
    const role = await Role.findById(roleId);
    if (role) {
      Object.keys(roleData).forEach((key) => {
        role[key] = roleData[key];
      });
      const updatedrole = await role.save();
      return updatedrole;
    }
  }

  /**
   * List roles
   * @return Collection role
   */
  async listrole() {
    return Role.find({});
  }

  /**
   * Delete role
   * @param String roleId
   * @return true|false
   */
  async deleterole(roleId) {
    const roleData = await Role.findById(roleId);
    if (roleData) {
      await Role.deleteOne(roleData);
      return true;
    }

    return false;
  }
}
