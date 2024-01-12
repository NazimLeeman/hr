// import { Model, DataTypes, Optional } from "sequelize";
// import { IEmployeeSchedule } from "../../interfaces/employeeSchedule.interface";
// import sequelize from "..";
// import Employee from "../employee/employee.model";
// import Schedule from "../schedule/schedule.model";


// interface EmployeeScheduleCreationAttributes extends Optional<IEmployeeSchedule, 'id'> {};

// interface EmployeeScheduleInstance extends Model<IEmployeeSchedule, EmployeeScheduleCreationAttributes>, IEmployeeSchedule {
//     createdAt?: Date;
//     updatedAt?: Date;
// }

// const EmployeeSchedule = sequelize.define<EmployeeScheduleInstance>('employeeSchedule', {
//     id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: DataTypes.INTEGER,
//         unique: true
//     },
//     employeeId: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     scheduleId: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     restaurantId: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         defaultValue: 0
//     }
// })

// EmployeeSchedule.belongsTo(Employee);
// EmployeeSchedule.belongsTo(Schedule);

// Employee.belongsToMany(Schedule, { through: EmployeeSchedule });
// Schedule.belongsToMany(Employee, { through: EmployeeSchedule });

// export default EmployeeSchedule;