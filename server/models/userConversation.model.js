module.exports = (sequelize, DataTypes) => {
  const UserConversation = sequelize.define(
    "userConversation",
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

      isSeen: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },

    {
      underscored: true,
    }
  );

  return UserConversation;
};
