import { Model, DataTypes, Optional } from "sequelize";
import { IAttendance } from "../../interfaces/attendence.interface";
import sequelize from "..";

interface AttendanceCreationAttributes extends Optional<IAttendance, 'id' | 'checkOutTime'> {};

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
    day: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    checkInTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    checkOutTime: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default Attendance;