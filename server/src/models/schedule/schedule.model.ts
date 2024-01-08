import { Model, DataTypes, Optional } from "sequelize";
import { ISchedule } from "../../interfaces/schedule.interface";
import sequelize from "..";

interface ScheduleCreationAttributes extends Optional<ISchedule, 'id'> {};

interface ScheduleInstance extends Model<ISchedule, ScheduleCreationAttributes>, ISchedule {
    createdAt?: Date;
    updatedAt?: Date;
}

const Schedule = sequelize.define<ScheduleInstance>('schedule', {
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
        allowNull: false,
    },
    slotStart: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    slotEnds: {
        type: DataTypes.DATE,
        allowNull: false,
    },restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

export default Schedule;