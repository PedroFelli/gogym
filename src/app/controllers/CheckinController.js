import { subDays } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkins';
import Student from '../models/Student';

class CheckinController {
  async store(req, res) {
    const isStudent = await Student.findByPk(req.params.id);

    if (!isStudent) {
      return res.status(401).json({ error: 'Stundent not found' });
    }

    const checkins = await Checkin.findAll({
      where: {
        student_id: req.params.id,
        created_at: { [Op.between]: [subDays(new Date(), 7), new Date()] },
      },
    });

    if (checkins.length >= 5) {
      return res.status(401).json({
        error:
          'You have reached the maximum number of checkins in the last 7 days',
      });
    }

    const checkin = await Checkin.create({
      student_id: req.params.id,
    });

    return res.json(checkin);
  }

  async index(req, res) {
    const isStudent = await Student.findByPk(req.params.id);

    if (!isStudent) {
      return res.status(401).json({ error: 'Stundent not found' });
    }

    const checkins = await Checkin.findAll({
      where: {
        student_id: req.params.id,
      },
    });

    return res.json(checkins);
  }
}

export default new CheckinController();
