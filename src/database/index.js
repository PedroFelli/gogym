import Sequelize from 'sequelize';

import User from '../app/models/User';
import Student from '../app/models/Student';
import Plano from '../app/models/Plano';
import Matricula from '../app/models/Matricula';

import databaseConfig from '../config/database';

const models = [User, Student, Plano, Matricula];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
