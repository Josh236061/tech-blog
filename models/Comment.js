
const { Model, DataTypes } = require('sequelize');

const sequelize=require('../config/connection.js');

class Comment extends Model{}


Comment.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement: true,
    },
    comment:{

        type:DataTypes.TEXT,
        allowNull: false,

    },
    post_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references:{
            key:'id',
            model:'post'
        }
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references:{
            key:'id',
            model:'user'
        }
    },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }

);

module.exports=Comment;