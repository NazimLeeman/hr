import { Model, DataTypes, Optional } from "sequelize";
import { IJobApplicant } from "../../interfaces/jobApplicant.interface";
import sequelize from "..";
import Applicant from "../applicant/applicant.model";
import Job from "../job/job.model";

interface JobApplicantCreationAttributes extends Optional<IJobApplicant, 'id'> {};

interface JobApplicantInstance extends Model<IJobApplicant, JobApplicantCreationAttributes>, IJobApplicant {
    createdAt?: Date;
    updatedAt?: Date;
}

const JobApplicant = sequelize.define<JobApplicantInstance>('jobApplicant', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true
    },
    jobId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    applicantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
})

JobApplicant.belongsTo(Job);
JobApplicant.belongsTo(Applicant);

Job.belongsToMany(Applicant, { through: JobApplicant });
Applicant.belongsToMany(Job, { through: JobApplicant });

export default JobApplicant;