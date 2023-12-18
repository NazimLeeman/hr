import { Model, DataTypes, Optional } from "sequelize";
import { IPayroll } from "../../interfaces/payroll.interface";
import sequelize from "..";

interface PayrollCreationAttributes extends Optional<IPayroll, 'id'> {};

interface PayrollInstance extends Model<IPayroll, PayrollCreationAttributes>, IPayroll {
    createdAt?: Date;
    updatedAt?: Date;
}

const Payroll = sequelize.define<PayrollInstance>('payroll', {
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
    hourlyRate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    deductions: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

export default Payroll;