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

      name: {
        type: DataTypes.STRING,
      },

      location: {
        type: DataTypes.STRING,
      },

      targetFund: {
        type: DataTypes.DECIMAL(10, 2),
      },

      investorCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      raisedAmount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },

      story: {
        type: DataTypes.STRING(65535),
      },

      website: {
        type: DataTypes.STRING,
      },

      imageId: {
        type: DataTypes.INTEGER,
      },

      industry: {
        type: DataTypes.STRING,
      },

      deadline: {
        type: DataTypes.DATE,
      },

      minInvestment: {
        type: DataTypes.DECIMAL(10, 2),
      },

      isLive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },

    {
      underscored: true,
    }
  );

  Project.associate = model => {
    Project.belongsTo(model.image, {
      foreignKey: "imageId",
      as: "logo",
    });

    Project.belongsTo(model.user, {
      foreignKey: "userId",
      as: "owner",
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
