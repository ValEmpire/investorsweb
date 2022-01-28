module.exports = (sequelize, DataTypes) => {
  const CommentLike = sequelize.define(
    "commentLike",
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

      commentId: {
        type: DataTypes.INTEGER,
      },
    },

    {
      underscored: true,
    }
  );

  CommentLike.associate = (model) => {
    CommentLike.belongsTo(model.user, {
      foreignKey: "userId",
    });

    CommentLike.belongsTo(model.comment, {
      foreignKey: "commentId",
    });
  };

  return CommentLike;
};
