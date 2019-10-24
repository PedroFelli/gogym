import * as Yup from 'yup';
import Matricula from '../models/Matricula';
import Student from '../models/Student';
import Plano from '../models/Plano';

class MatriculaController {
  async store(req, res) {
    const { student_id, plan_id } = req.body;

    const isStudent = await Student.findByPk(student_id);

    if (!isStudent) {
      return res.status(401).json({ error: 'Stundent not found' });
    }

    const isPlano = await Plano.findByPk(plan_id);

    if (!isPlano) {
      return res.status(401).json({ error: 'Plano not found' });
    }

    const matricula = await Matricula.create(req.body);

    return res.json(matricula);
  }
}

export default new MatriculaController();
