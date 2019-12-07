import * as Yup from 'yup';
import Student from '../models/Student';
import Help from '../models/HelpOrder';

class HelController {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const isStudent = await Student.findByPk(req.params.id);

    if (!isStudent) {
      return res.status(401).json({ error: 'Stundent not found' });
    }

    const { id, student_id, question } = await Help.create({
      ...req.body,
      student_id: req.params.id,
    });

    return res.json(id, student_id, question);
  }

  async index(req, res) {
    const isStudent = await Student.findByPk(req.params.id);

    if (!isStudent) {
      return res.status(401).json({ error: 'Stundent not found' });
    }

    const help_orders = Help.findByPk(req.params.id);

    return res.json(help_orders);
  }
}

export default new HelController();
