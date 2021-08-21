module.exports = (sequelize, Datatype) => {
  const User = sequelize.define("user", {
    name: {
      type: Datatype.STRING,
      allowNull: false
    },
    email: {
      type: Datatype.STRING,
      allowNull: false
    },
    phone: {
      type: Datatype.STRING,
      allowNull: false
    },
    is_active: {
      type: Datatype.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    password: {
      type: Datatype.STRING,
      allowNull: false
    },

  });

  User.associate = models => {
    User.hasOne(models.UserProfile, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    User.hasMany(models.UserPackage, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    User.hasMany(models.RunResult, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  }

  return User;
};