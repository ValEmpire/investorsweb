module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define(
    "favorite",
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
    },

    {
      underscored: true,
    }
  );

  Favorite.associate = (model) => {
    Favorite.belongsTo(model.user, {
      foreignKey: "userId",
    });

    Favorite.belongsTo(model.project, {
      foreignKey: "projectId",
    });
  };

  return Favorite;
};
