import Joi from "joi";

type Employee = {
    id: string | undefined;
    name: string;
    salary: number | string;
    department: Departments;
}

export enum Departments {
    HR = "HR",
    PS = "PS"
}

export const employeeSchema = Joi.object({
    name: Joi.string()
        .required(),
    salary: Joi.number()
        .min(1)
        .required(),
    department: Joi.string()
        .valid("HR", "PS")
        .required()
});

export default Employee;