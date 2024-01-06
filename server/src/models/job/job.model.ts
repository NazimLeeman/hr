import { Model, DataTypes, Optional } from "sequelize";
import { IJob } from "../../interfaces/job.interface";
import sequelize from "..";
import Applicant from "../applicant/applicant.model";

interface JobCreationAttributes extends Optional<IJob, 'id'> {};

interface JobInstance extends Model<IJob, JobCreationAttributes>, IJob {
    createdAt?: Date;
    updatedAt?: Date;
}

const Job = sequelize.define<JobInstance>('job', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true
    },
    jobRole: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    jobNature: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    jobDescription: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    experience: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    skillTags: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false
    },
    hourlyRate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    applicationDeadline: {
        type: DataTypes.DATE,
        allowNull: false
    },
    responsibilities: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false
    }
})

export default Job;