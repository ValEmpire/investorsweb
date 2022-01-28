module.exports = (sequelize, DataTypes) => {
  const UserDetail = sequelize.define(
    "userDetail",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      userId: {
        type: DataTypes.INTEGER,
      },

      description: {
        type: DataTypes.STRING(1000),
      },

      city: {
        type: DataTypes.STRING,
      },

      province: {
        type: DataTypes.STRING,
      },

      phoneNumber: {
        type: DataTypes.STRING(10),
      },
    },

    {
      underscored: true,
    }
  );

  UserDetail.associate = (model) => {};

  return UserDetail;
};
