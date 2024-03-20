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
    day: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    slotStart: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    slotEnds: {
        type: DataTypes.TEXT,
        allowNull: false,
    },restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    shift: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    employees: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: []
    },
})

export default Schedule;