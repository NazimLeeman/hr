import { Model, DataTypes, Optional } from "sequelize";
import { IAttendance } from "../../interfaces/attendence.interface";
import sequelize from "..";
import Employee from "../employee/employee.model";
import Payroll from "../payroll/payroll.model";

interface AttendanceCreationAttributes extends Optional<IAttendance, 'id'> {};

interface AttendanceInstance extends Model<IAttendance, AttendanceCreationAttributes>, IAttendance {
    createdAt?: Date;
    updatedAt?: Date;
}

const Attendance = sequelize.define<AttendanceInstance>('attendance', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    checkInTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    checkOutTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
})

Attendance.belongsTo(Employee, { foreignKey: 'employee_id' });
Payroll.belongsTo(Employee, { foreignKey: 'employee_id' });
// PerformanceReview.belongsTo(Employee, { foreignKey: 'employee_id' });

export default Attendance;