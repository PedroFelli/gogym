import Sequelize from 'sequelize';

import Matricula from '../app/models/Matricula';
import User from '../app/models/User';
import Student from '../app/models/Student';
import Plano from '../app/models/Plano';
import Checkin from '../app/models/Checkin';
import Help from '../app/models/HelpOrder';

import databaseConfig from '../config/database';

const models = [Matricula, User, Student, Plano, Checkin, Help];

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
