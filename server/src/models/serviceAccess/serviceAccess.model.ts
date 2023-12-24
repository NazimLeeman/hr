import { Model, DataTypes, Optional } from "sequelize";
import { IServiceAccess } from "../../interfaces/serviceAccess.interface";
import sequelize from "..";

interface ServiceAccessCreationAttibutes extends Optional<IServiceAccess, 'id'> {};

interface ServiceAccessInstance extends Model<IServiceAccess, ServiceAccessCreationAttibutes>, IServiceAccess {
    createdAt?: Date;
    updatedAt?: Date;
}

const ServiceAccess = sequelize.define<ServiceAccessInstance>('serviceAccess', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    services: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false
    }
})

export default ServiceAccess;