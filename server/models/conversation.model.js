module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    "conversation",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },

    {
      underscored: true,
    }
  );

  Conversation.associate = (model) => {
    Conversation.belongsToMany(model.user, {
      through: model.userConversation,
      foreignKey: "conversationId",
      otherKey: "userId",
    });
  };

  return Conversation;
};
