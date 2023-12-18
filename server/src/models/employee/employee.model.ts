import { Model, DataTypes, Optional } from "sequelize";
import { IEmployee } from "../../interfaces/employee.interface";
import sequelize from "..";
import Position from "../position/position.model";
import Applicant from "../applicant/applicant.model";
import Attendance from "../attendance/attendance.model";
import Payroll from "../payroll/payroll.model";

interface EmployeeCreationAttributes extends Optional<IEmployee, 'id'> {};

interface EmployeeInstance extends Model<IEmployee, EmployeeCreationAttributes>, IEmployee {
    createdAt?: Date;
    updatedAt?: Date;
}

const Employee = sequelize.define<EmployeeInstance>('employee', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    joiningDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    positionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    applicantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Employee.belongsTo(Position, { foreignKey: 'position_id' });
Position.hasMany(Employee, { foreignKey: 'position_id' });
Employee.belongsTo(Applicant, { foreignKey: 'applicant_id' });
Employee.hasMany(Attendance, { foreignKey: 'employee_id' });
Employee.hasMany(Payroll, { foreignKey: 'employee_id' });
// Employee.hasMany(PerformanceReview, { 
//     foreignKey: 'employee_id' 
// });

export default Employee;