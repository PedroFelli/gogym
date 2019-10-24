import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number().required(),
      peso: Yup.number().required(),
      altura: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExist = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExist) {
      return res.status(400).json('Stundet alredy exist ');
    }

    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    // Fazer checkagem se aluno existe e validar os dados;

    const student = await Student.findByPk(req.body.id);

    const { id, name, email, idade, altura, peso } = await student.update(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      idade,
      altura,
      peso,
    });
  }
}

export default new StudentController();
