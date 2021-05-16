const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
      type: DataTypes.STRING,
      validate: { len: [1] }
  },
  creation_date:{
    type: DataTypes.DATEONLY,
    allowNull:false,
    defaultValue: Date.now,
  },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
      
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
