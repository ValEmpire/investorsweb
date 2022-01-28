module.exports = (sequelize, DataTypes) => {
  const Investment = sequelize.define(
    "investment",
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

      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },

    {
      underscored: true,
    }
  );

  Investment.associate = (model) => {};

  return Investment;
};
