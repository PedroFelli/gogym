import * as Yup from 'yup';
import Student from '../models/Student';
import Help from '../models/HelpOrder';

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

    const { question, answer } = await help.update({
      ...help,
      answer: req.body.answer,
      answer_at: new Date(),
    });

    return res.json({ question, answer });
  }

  async index(req, res) {
    const help_orders = await Help.findAll();

    return res.json(help_orders);
  }
}

export default new HelpAnswerController();
