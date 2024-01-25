import { Model, DataTypes, Optional } from "sequelize";
import { IPerformanceKds } from "../../interfaces/performanceKds.interface";
import sequelize from "..";

interface PerformanceKdsCreationAttributes extends Optional<IPerformanceKds, 'id'> {};

interface PerformanceKdsInstance extends Model<IPerformanceKds, PerformanceKdsCreationAttributes>, IPerformanceKds {
    createdAt?: Date;
    updatedAt?: Date;
}

const PerformanceKds = sequelize.define<PerformanceKdsInstance>('performanceKds', {
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
    orderId: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    servedOnTime: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

export default PerformanceKds;