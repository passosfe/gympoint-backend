import * as Yup from 'yup';

import Subscription from '../models/Subscription';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        discontinued_at: null,
      },
      order: ['duration'],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { title } = req.body;

    const exists = await Subscription.findOne({ where: { title } });

    if (exists) {
      return res
        .status(401)
        .json({ error: 'This subscription type already exists' });
    }

    const { duration, price } = await Subscription.create(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { title } = req.body;

    const subscription = await Subscription.findByPk(req.params.id);

    if (title && title !== subscription.title) {
      const exists = await Subscription.findOne({
        where: { title },
      });

      if (exists) {
        return res
          .status(401)
          .json({ error: `The ${title} subscription already exists` });
      }
    }

    const { duration, price } = await subscription.update(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.id);

    subscription.discontinued_at = new Date();

    await subscription.save();

    return res.json(subscription);
  }
}

export default new SubscriptionController();
