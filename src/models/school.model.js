import { DataTypes } from 'sequelize';
import connectDb from '../db/index.js'; // Ensure this file correctly initializes Sequelize

const School = connectDb.define('School', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: true // Adds createdAt & updatedAt fields automatically
});

export default School;
