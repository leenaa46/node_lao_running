module.exports = (sequelize, Datatype) => {
  const Package = sequelize.define("package", {
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

  Package.associate = models => {
    Package.hasMany(models.UserPackage, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  }

  return Package;
};