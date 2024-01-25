import { Model, DataTypes, Optional } from "sequelize";
import { IPerformanceWaiter } from "../../interfaces/performancePos.interface";
import sequelize from "..";

interface PerformanceWaiterCreationAttributes extends Optional<IPerformanceWaiter, 'id'> {};

interface PerformanceWaiterInstance extends Model<IPerformanceWaiter, PerformanceWaiterCreationAttributes>, IPerformanceWaiter {
    createdAt?: Date;
    updatedAt?: Date;
}

const PerformanceWaiter = sequelize.define<PerformanceWaiterInstance>('performanceWaiter', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true
    },
    date: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    orderId: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    preparationTime: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    orderReadyToServeTime: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    bill: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    occupiedToCompleteTime: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

export default PerformanceWaiter;