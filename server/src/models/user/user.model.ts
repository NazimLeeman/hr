import { Model, DataTypes, Optional } from "sequelize";
import { IUser } from "../../interfaces/user.interface";
import sequelize from "..";

enum UserRole {
    ADMIN = 'admin',
    EMPLOYEE = 'employee'
}

interface UserCreationAttributes extends Optional<IUser, 'id'> {};

interface UserInstance extends Model<IUser, UserCreationAttributes>, IUser {
    createdAt?: Date;
    updatedAt?: Date;
}

const User = sequelize.define<UserInstance>('user', {
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
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM(...Object.values(UserRole)),
        allowNull: false,
        defaultValue: UserRole.EMPLOYEE, 
    },
})

export default User;