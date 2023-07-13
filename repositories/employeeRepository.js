import Employee from "../models/employee.js";

export default class employeeRepository {
  /**
   * Get Employee by mail
   * @param String email
   * @return employee
   */
  async getEmployee(email) {
    const employee = await Employee.findOne({ email: email });
    return employee;
  }


  /**
   * Get Employee by id
   * @param String id
   * @return employee
   */
  async getEmployeeById(id) {
    const employee = await Employee.findById(id);
    return employee;
  }
}
