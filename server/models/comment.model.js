module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "comment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      body: {
        type: DataTypes.STRING(65535),
        allowNull: false,
      },

      commentId: {
        type: DataTypes.INTEGER,
      },
    },

    {
      underscored: true,
    }
  );

  Comment.associate = (model) => {
    Comment.belongsTo(model.user, {
      foreignKey: "userId",
    });

    Comment.belongsTo(model.project, {
      foreignKey: "projectId",
    });

    Comment.hasMany(Comment, {
      as: "reply",
      foreignKey: "commentId",
      useJunctionTable: false,
    });

    Comment.hasMany(model.commentLike, {
      foreignKey: "commentId",
    });
  };

  return Comment;
};
