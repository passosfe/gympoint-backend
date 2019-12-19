import * as Yup from 'yup';
import Student from '../models/Student';

import { Op } from 'sequelize';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email } = req.body;

    const exists = await Student.findOne({ where: { email } });

    if (exists) {
      return res.status(401).json({ error: 'Student already exists' });
    }

    const { id, name, age, weight, height } = await Student.create(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      new_email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const student = await Student.findOne({ where: { email: req.body.email } });

    if (!student) {
      return res.status(401).json({ error: 'User email not found' });
    }

    const { new_email } = req.body;

    if (new_email) {
      const new_email_exists = await Student.findOne({
        where: { email: new_email },
      });

      if (new_email_exists) {
        return res.status(401).json({ error: 'E-mail already exists' });
      }
    }

    req.body.email = req.body.new_email;

    const { id, name, email, weight, height } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      weight,
      height,
    });
  }

  async search(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(401).json({ error: 'Name must be a string' });
    }

    const { name } = req.query;

    const students = await Student.findAll(
      name ? { where: { name: { [Op.like]: name } } } : {}
    );

    return res.json(students);
  }
}

export default new StudentController();
