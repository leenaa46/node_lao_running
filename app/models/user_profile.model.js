module.exports = (sequelize, Datatype) => {
  const UserProfile = sequelize.define("user_profile", {
    user_id: {
      type: Datatype.INTEGER.UNSIGNED,
      allowNull: false
    },
    name: {
      type: Datatype.STRING,
      allowNull: false
    },
    surname: {
      type: Datatype.STRING,
      allowNull: false
    },
    profile_image: {
      type: Datatype.STRING,
    },

  });

  UserProfile.associate = models => {
    UserProfile.belongsTo(models.User, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  }

  return UserProfile;
};