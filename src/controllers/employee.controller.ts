import { Request, Response, NextFunction } from "express";
import Employee, { employeeSchema } from "../models/employee.model";
import { createEmployee, deleteEmployee, getAllEmployees, getEmployee, updateEmployee } from "../services/employee.service";
import { v4 as getId } from "uuid";

export function getAllEmployeesHandler(req: Request, res: Response, next: NextFunction) {
    const employees = getAllEmployees();
    console.log(employees)
    // throw new Error("Server error");
    return res.json(employees);
}

export function createEmployeeHandler(req: Request<{}, {}, Employee>, res: Response, next: NextFunction) {
    const newEmployee = req.body;

    const { error, value: validatedEmployee } = employeeSchema.validate(newEmployee);
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    validatedEmployee.id = getId()
    createEmployee(validatedEmployee);

    return res.sendStatus(200);
}

export function getEmployeeHandler(req: Request<{ empId: string }>, res: Response, next: NextFunction) {
    const employee = getEmployee(req.params.empId);

    if (!employee) {
        return res.status(404).json({ error: "Employee not found."});
    }

    return res.json(employee);
}

export function updateEmployeeHandler(req: Request<{ empId: string }, {}, Employee>, res: Response, next: NextFunction) {
    const empId = req.params.empId;
    const employeeToUpdate = getEmployee(empId);
    const updatedEmployee = req.body;
    
    if (updatedEmployee.id && empId !== updatedEmployee.id) {
        return res.status(400).json( { error: "Employee IDs in request params and request body are not the same."});
    }

    if (!employeeToUpdate) {
        return res.status(404).json({ error: "Employee not found."});
    }

    const { error, value: validatedEmployee } = employeeSchema.validate(updatedEmployee);
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    if (areEmployeesSame(validatedEmployee, employeeToUpdate)) {
        return res.sendStatus(304);
    }
    
    updateEmployee(employeeToUpdate, validatedEmployee);

    return res.sendStatus(200);
}

function areEmployeesSame(emp1: Employee, emp2: Employee) {
    return emp1.name === emp2.name &&
        emp1.department === emp2.department &&
        emp1.salary === emp2.salary;
}

export function deleteEmployeeHandler(req: Request<{ empId: string }>, res: Response, next: NextFunction) {
    const empId = req.params.empId;
    const employeeToDelete = getEmployee(empId);
        
    if (!employeeToDelete) {
        return res.status(404).json({ error: "Employee not found."});
    }
    
    deleteEmployee(empId); 
    
    return res.sendStatus(204);
}