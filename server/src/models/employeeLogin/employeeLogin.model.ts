import { Model, DataTypes, Optional } from "sequelize";
import { IEmployeeLogin } from "../../interfaces/employeeLogin.interface"
import sequelize from "..";

interface EmployeeLoginCreationAttributes extends Optional<IEmployeeLogin, 'id'> {};

interface EmployeeLoginInstance extends Model<IEmployeeLogin, EmployeeLoginCreationAttributes>, IEmployeeLogin {
    createdAt?: Date;
    updatedAt?: Date;
}

const EmployeeLogin = sequelize.define<EmployeeLoginInstance>('employeeLogin', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

export default EmployeeLogin;