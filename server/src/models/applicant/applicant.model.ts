import { Model, DataTypes, Optional } from "sequelize";
import { IApplicant } from "../../interfaces/applicant.interface";
import sequelize from "..";

interface ApplicantCreationAttributes extends Optional<IApplicant, 'id'> {};

interface ApplicantInstance extends Model<IApplicant, ApplicantCreationAttributes>, IApplicant {
    createdAt?: Date;
    updatedAt?: Date;
}

const Applicant = sequelize.define<ApplicantInstance>('applicant', {
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
    experience: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: ''
    },
    phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: ''
    },
    skillTags: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: ''
    },
    hourlyRate: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
})

export default Applicant;