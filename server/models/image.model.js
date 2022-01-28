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

  Image.associate = (model) => {
    Image.hasOne(model.user, {
      foreignKey: "imageId",
    });

    Image.hasOne(model.project, {
      foreignKey: "imageId",
    });
  };

  return Image;
};
