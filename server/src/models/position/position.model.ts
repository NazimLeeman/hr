import { Model, DataTypes, Optional } from "sequelize";
import { IPosition } from "../../interfaces/position.interface";
import sequelize from "..";
import Employee from "../employee/employee.model";
import Applicant from "../applicant/applicant.model";

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
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})


Applicant.hasOne(Employee, { foreignKey: 'applicant_id' });

export default Position;