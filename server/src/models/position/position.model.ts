import { Model, DataTypes, Optional } from "sequelize";
import { IPosition } from "../../interfaces/position.interface";
import sequelize from "..";

interface PositionCreationAttributes extends Optional<IPosition, 'id'> {};

interface PositionInstance extends Model<IPosition, PositionCreationAttributes>, IPosition {
    createdAt?: Date;
    updatedAt?: Date;
}

const Position = sequelize.define<PositionInstance>('position', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true
    },
    position: {
        type: DataTypes.TEXT,
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
    services: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false
    }
})

export default Position;