// import * as Yup from 'yup';
import { addMonths, parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Matricula from '../models/Matricula';
import Student from '../models/Student';
import Plano from '../models/Plano';

import Mail from '../../lib/Mail';

class MatriculaController {
  async store(req, res) {
    const { student_id, plan_id, start_date } = req.body;

    const isStudent = await Student.findByPk(student_id);

    if (!isStudent) {
      return res.status(401).json({ error: 'Stundent not found' });
    }

    const isPlano = await Plano.findByPk(plan_id);

    if (!isPlano) {
      return res.status(401).json({ error: 'Plano not found' });
    }

    const end_date = addMonths(parseISO(start_date), isPlano.duration);

    const price = isPlano.price * isPlano.duration;

    await Mail.sendMail({
      to: `${isStudent.name} <${isStudent.email}>`,
      subject: 'Boas-vindas à GoGYM',
      template: 'enrollment',
      context: {
        name: isStudent.name,
        plano: isPlano.title,
        end_date: format(end_date, "dd 'de' MMMM", {
          locale: pt,
        }),
        price,
      },
    });

    const matricula = await Matricula.create({
      ...req.body,
      end_date,
      price,
    });

    return res.json(matricula);
  }

  async update(req, res) {
    const matricula = await Matricula.findByPk(req.params.id);

    if (!matricula) {
      return res.status(401).json({ error: 'Matricula not found' });
    }

    const isPlano = await Plano.findByPk(matricula.plan_id);

    if (!isPlano) {
      return res.status(401).json({ error: 'Plano not found' });
    }

    const end_date = addMonths(parseISO(req.body.start_date), isPlano.duration);

    const price = isPlano.price * isPlano.duration;

    const matriculaUp = await matricula.update({
      ...req.body,
      end_date,
      price,
    });

    return res.json({ matriculaUp });
  }

  async index(req, res) {
    const matriculas = await Matricula.findAll({
      attributes: ['id', 'plan_id'],
      include: [
        {
          model: Plano,
          as: 'planos',
        },
        {
          model: Student,
          as: 'students',
        },
      ],
    });

    return res.json(matriculas);
  }

  async delete(req, res) {
    const matricula = await Matricula.findByPk(req.params.id);

    if (!matricula) {
      return res.status(400).json({ error: 'Matricula not found!' });
    }

    await Matricula.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json('Matricula deletada!');
  }
}

export default new MatriculaController();
