import Sequelize, { Model } from 'sequelize';

class Matricula extends Model {
  static init(connection) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
        plan_id: Sequelize.INTEGER,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.FLOAT,
      },
      { sequelize: connection }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plano, { foreignKey: 'plan_id', as: 'plano' });
  }
}

export default Matricula;
