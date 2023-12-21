import { Model, DataTypes, Optional } from "sequelize";
import { IEmployee } from "../../interfaces/employee.interface";
import sequelize from "..";
import Position from "../position/position.model";
import Applicant from "../applicant/applicant.model";
import Attendance from "../attendance/attendance.model";
import Payroll from "../payroll/payroll.model";
import Job from "../job/job.model";
import Schedule from "../schedule/schedule.model";

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
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    experience: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // joiningDate: {
    //     type: DataTypes.DATE,
    //     allowNull: false,
    // },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    skillTags: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    hourlyRate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // positionId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // applicantId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // }
})

Employee.belongsTo(Position, { foreignKey: 'positionId' });
Position.hasMany(Employee, { foreignKey: 'positionId' });
Employee.belongsTo(Applicant, { foreignKey: 'applicantId' });
Employee.hasMany(Attendance, { foreignKey: 'employeeId' });
Employee.hasMany(Payroll, { foreignKey: 'employeeId' });
Applicant.hasOne(Employee, { foreignKey: 'applicantId' });
Attendance.belongsTo(Employee, { foreignKey: 'employeeId' });
Payroll.belongsTo(Employee, { foreignKey: 'employeeId' });
Job.hasMany(Applicant, { foreignKey: 'jobId' });
Applicant.belongsTo(Job, { foreignKey: 'jobId' });
// Schedule.hasMany(Employee, {foreignKey: 'scheduleId'});
// Employee.belongsTo(Schedule, { foreignKey: 'scheduleId'});

// Employee.hasMany(PerformanceReview, { 
//     foreignKey: 'employee_id' 
// });

export default Employee;