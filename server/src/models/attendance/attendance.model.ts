import { Model, DataTypes, Optional } from "sequelize";
import { IAttendance } from "../../interfaces/attendence.interface";
import sequelize from "..";

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

// PerformanceReview.belongsTo(Employee, { foreignKey: 'employee_id' });

export default Attendance;