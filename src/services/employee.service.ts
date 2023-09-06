import Employee, { Departments } from "../models/employee.model";
import { v4 as getId } from "uuid";

let employees: Employee[] = [
    { id: getId(), name: "Andy", salary: 3200, department: Departments.PS },
    { id: getId(), name: "Beatrice", salary: 4000, department: Departments.HR },
    { id: getId(), name: "Catherine", salary: 4500, department: Departments.PS }
];

export function getAllEmployees() {
    return employees;
}

export function createEmployee(newEmployee: Employee) {
    employees.push(newEmployee);
}

export function getEmployee(empId: string) {
    const employee = employees.find(emp => emp.id === empId);
    if (!employee) return null;
    return employee;
}

export function updateEmployee(employeeToUpdate: Employee, updatedEmployee: Employee) {
    const idx = employees.indexOf(employeeToUpdate);
    employees[idx] = { ...updatedEmployee, id: employeeToUpdate.id };
}

export function deleteEmployee(empId: string) {
    employees = employees.filter(emp => emp.id !== empId);
}