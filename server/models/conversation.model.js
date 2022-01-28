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

  Conversation.associate = (model) => {};

  return Conversation;
};
