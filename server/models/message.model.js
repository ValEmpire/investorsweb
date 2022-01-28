module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "message",
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

      conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      body: {
        type: DataTypes.STRING(9999),
        allowNull: false,
      },
    },

    {
      underscored: true,
    }
  );

  Message.associate = (model) => {
    Message.belongsTo(model.user, {
      foreignKey: "userId",
    });

    Message.belongsTo(model.conversation, {
      foreignKey: "conversationId",
    });
  };

  return Message;
};
