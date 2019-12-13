import * as Yup from 'yup';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Student from '../models/Student';
import Help from '../models/HelpOrder';

import Mail from '../../lib/Mail';

class HelpAnswerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const help = await Help.findByPk(req.params.id);

    if (!help) {
      return res.status(401).json({ error: 'Help order not found!' });
    }

    const student = await Student.findByPk(help.student_id);

    const { question, answer, answer_at } = await help.update({
      ...help,
      answer: req.body.answer,
      answer_at: new Date(),
    });

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Pedido de auxílio',
      template: 'answer',
      context: {
        name: student.name,
        question,
        answer,
        date: format(answer_at, "dd 'de' MMMM", {
          locale: pt,
        }),
      },
    });

    return res.json({ question, answer });
  }

  async index(req, res) {
    const help_orders = await Help.findAll();

    return res.json(help_orders);
  }
}

export default new HelpAnswerController();
