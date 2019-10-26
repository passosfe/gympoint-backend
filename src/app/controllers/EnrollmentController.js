import * as Yup from 'yup';
import { parseISO, addMonths, startOfDay, endOfDay, isBefore } from 'date-fns';
import { Op } from 'sequelize';

import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Subscription from '../models/Subscription';

class EnrollmentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const enrollments = await Enrollment.findAll({
      where: {
        canceled_at: null,
        end_date: {
          [Op.gt]: new Date(),
        },
      },
      order: ['end_date'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['start_date', 'end_date', 'price'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Subscription,
          as: 'subscription',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    return res.json(enrollments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const parsedStartDate = startOfDay(parseISO(start_date));

    const enrolled = await Enrollment.findOne({
      where: {
        student_id,
      },
    });

    if (enrolled && !enrolled.canceled_at) {
      return res.status(401).json({ error: 'The student is already enrolled' });
    }

    const subscription = await Subscription.findByPk(plan_id);

    const end_date = endOfDay(
      addMonths(parsedStartDate, subscription.duration)
    );

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date: parsedStartDate,
      end_date,
      price: subscription.total_price,
    });

    return res.json(enrollment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id);

    const { start_date } = req.body;

    const parsedStartDate = startOfDay(parseISO(start_date));

    if (isBefore(parsedStartDate, enrollment.end_date)) {
      return res.status(401).json({
        error: 'The student already has a valid enrollment for that period',
      });
    }

    const { plan_id = enrollment.plan_id } = req.body;

    const subscription = await Subscription.findByPk(plan_id);

    const end_date = endOfDay(
      addMonths(parsedStartDate, subscription.duration)
    );

    await enrollment.update({
      plan_id,
      start_date: parsedStartDate,
      end_date,
      price: subscription.total_price,
    });

    return res.json(enrollment);
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id, {
      attributes: ['id', 'price', 'canceled_at', 'is_valid'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Subscription,
          as: 'subscription',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    enrollment.canceled_at = new Date();

    await enrollment.save();

    return res.json(enrollment);
  }
}

export default new EnrollmentController();
