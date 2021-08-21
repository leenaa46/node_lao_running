module.exports = (sequelize, Datatype) => {
  const RunResult = sequelize.define("run_result", {
    user_id: {
      type: Datatype.INTEGER.UNSIGNED,
      allowNull: false
    },
    package_id: {
      type: Datatype.INTEGER.UNSIGNED,
      allowNull: false
    },
    time: {
      type: Datatype.TIME,
      allowNull: false
    },
    is_free_user: {
      type: Datatype.BOOLEAN,
      allowNull: false
    },

  });

  return RunResult;
};