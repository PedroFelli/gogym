import * as Yup from 'yup';
import Plano from '../models/Plano';

class PlanoController {
  async index(req, res) {
    const planos = await Plano.findAll();

    return res.json(planos);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const plano = await Plano.create(req.body);

    return res.json(plano);
  }

  async delete(req, res) {
    const plano = await Plano.findByPk(req.params.id);

    if (!plano) {
      return res.status(400).json({ error: 'Plano not found!' });
    }

    await Plano.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json('Plano deletado');
  }

  async update(req, res) {
    const plano = await Plano.findByPk(req.params.id);

    if (!plano) {
      return res.status(400).json({ error: 'Plano not found!' });
    }

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, title, price, duration } = await plano.update(req.body);

    return res.json({ id, title, price, duration });
  }
}
export default new PlanoController();
