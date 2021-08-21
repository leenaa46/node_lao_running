module.exports = (sequelize, Datatype) => {
  const UserPackage = sequelize.define("user_package", {
    user_id: {
      type: Datatype.INTEGER.UNSIGNED,
      allowNull: false
    },
    package_id: {
      type: Datatype.INTEGER.UNSIGNED,
      allowNull: false
    },
    payment_slip: {
      type: Datatype.STRING,
    },
    status: {
      type: Datatype.ENUM('pending', 'confirmed', 'rejected'),
      defaultValue: 'pending',
      allowNull: false
    },
    profile_image: {
      type: Datatype.STRING,
    },

  });

  UserPackage.associate = models => {
    UserPackage.belongsTo(models.User, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    UserPackage.belongsTo(models.Package, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  }

  return UserPackage;
};