module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "project",
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

      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      targetFund: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      story: {
        type: DataTypes.STRING(65535),
        allowNull: false,
      },

      website: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      imageId: {
        type: DataTypes.INTEGER,
      },

      industry: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      deadline: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      minInvestment: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      isLive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },

    {
      underscored: true,
    }
  );

  Project.associate = (model) => {
    Project.belongsTo(model.image, {
      foreignKey: "imageId",
    });

    Project.belongsTo(model.user, {
      foreignKey: "userId",
    });

    Project.hasMany(model.favorite, {
      foreignKey: "projectId",
    });

    Project.hasMany(model.investment, {
      foreignKey: "projectId",
    });

    Project.hasMany(model.comment, {
      foreignKey: "projectId",
    });
  };

  return Project;
};
