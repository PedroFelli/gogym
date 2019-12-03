import Sequelize from 'sequelize';

import Matricula from '../app/models/Matricula';
import User from '../app/models/User';
import Student from '../app/models/Student';
import Plano from '../app/models/Plano';

import databaseConfig from '../config/database';

const models = [Matricula, User, Student, Plano];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
