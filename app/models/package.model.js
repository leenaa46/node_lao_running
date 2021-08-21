module.exports = (sequelize, Datatype) => {
  const Package = sequelize.define("package", {
    name: {
      type: Datatype.STRING,
      allowNull: false
    },
    range: {
      type: Datatype.INTEGER.UNSIGN,
      allowNull: false
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