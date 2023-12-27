import { Model, DataTypes, Optional } from "sequelize";
import { IApplicantLogin } from "../../interfaces/applicantLogin.interface";
import sequelize from "..";

interface ApplicantLoginCreationAttributes extends Optional<IApplicantLogin, 'id'> {};

interface ApplicantLoginInstance extends Model<IApplicantLogin, ApplicantLoginCreationAttributes>, IApplicantLogin {
    createdAt?: Date;
    updatedAt?: Date;
}

const ApplicantLogin = sequelize.define<ApplicantLoginInstance>('applicantLogin', {
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
    applicantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default ApplicantLogin;