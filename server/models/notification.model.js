module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "notification",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      toUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      fromUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      body: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },

      href: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      isSeen: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },

    {
      underscored: true,
    }
  );

  Notification.associate = model => {
    Notification.belongsTo(model.user, {
      foreignKey: "fromUserId",
      as: "sender",
    });
    Notification.belongsTo(model.user, {
      foreignKey: "toUserId",
      as: "receiver",
    });
  };

  return Notification;
};
