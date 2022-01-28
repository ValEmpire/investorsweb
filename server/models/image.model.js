module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "image",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      url: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
    },

    {
      underscored: true,
    }
  );

  Image.associate = (model) => {};

  return Image;
};
