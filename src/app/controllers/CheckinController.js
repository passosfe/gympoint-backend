import { Op } from 'sequelize';
import { startOfDay, subDays, isBefore } from 'date-fns';

import Checkin from '../models/Checkin';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

class CheckinController {
  async index(req, res) {
    const student_id = parseInt(req.params.id);

    const checkins = await Checkin.findAll({
      where: {
        student_id,
      },
      attributes: ['id', 'student_id', 'createdAt'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const student_id = parseInt(req.params.id);

    const enrolled = await Enrollment.findOne({
      where: {
        student_id,
        end_date: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (!enrolled) {
      return res
        .status(401)
        .json({ error: "The student doesn't have a valid enrollment" });
    }

    const checkins = await Checkin.findAndCountAll({
      where: {
        student_id,
        created_at: {
          [Op.gt]: subDays(startOfDay(new Date()), 7),
        },
      },
    });

    if (checkins.count === 5) {
      return res.status(401).json({
        error: 'The student can only checkin 5 times in a 7 days period',
      });
    }

    const checkin = await Checkin.create({ student_id });

    return res.json(checkin);
  }
}

export default new CheckinController();
