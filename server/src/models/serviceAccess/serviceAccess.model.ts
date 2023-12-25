import { Model, DataTypes, Optional } from "sequelize";
import { IServiceAccess } from "../../interfaces/serviceAccess.interface";
import sequelize from "..";

interface ServiceAccessCreationAttibutes extends Optional<IServiceAccess, 'id' | 'employeeId'> {};

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
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    // restaurantId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    position: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    services: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false
    }
})

export default ServiceAccess;