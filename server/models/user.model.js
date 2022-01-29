module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING,
      },

      imageId: {
        type: DataTypes.INTEGER,
      },
    },

    {
      underscored: true,
    },
  )

  User.associate = (model) => {
    User.hasOne(model.userDetail, {
      foreignKey: 'userId',
    })

    User.belongsTo(model.image, {
      foreignKey: 'imageId',
    })

    User.hasMany(model.favorite, {
      foreignKey: 'userId',
    })

    User.hasMany(model.project, {
      foreignKey: 'userId',
    })

    User.hasMany(model.investment, {
      foreignKey: 'userId',
    })

    User.hasMany(model.comment, {
      foreignKey: 'userId',
    })

    User.hasMany(model.commentLike, {
      foreignKey: 'userId',
    })

    User.hasMany(model.message, {
      foreignKey: 'userId',
    })

    User.belongsToMany(model.conversation, {
      through: model.userConversation,
      foreignKey: 'userId',
      otherKey: 'conversationId',
    })

    User.hasMany(model.notification, {
      foreignKey: 'userId',
    })
  }

  return User
}
