const Person = require('../models/Person');

class PersonController {
  async createPerson(req, res) {
    try {
      const { surname, salary, vacationdays } = req.body;

      if (!surname || !salary || !vacationdays) {
        return res
          .status(400)
          .json({ error: 'Не все обязательные поля были предоставлены' });
      }

      const newPerson = await Person.sequelize.query(`
        INSERT INTO person (surname, salary, vacationdays)
        VALUES ('${surname}', '${salary}', '${vacationdays}')
        RETURNING *
      `);

      res.json(newPerson[0]);
    } catch (error) {
      console.error('Произошла ошибка:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }

  async getPersons(req, res) {
    try {
      const pageAsNumber = Number.parseInt(req.query.page);
      const sizeAsNumber = Number.parseInt(req.query.size);

      let page = 0;
      if (!Number.isNaN(pageAsNumber) && pageAsNumber >= 0) {
        page = pageAsNumber;
      }

      let size = 10;
      if (
        !Number.isNaN(sizeAsNumber) &&
        sizeAsNumber > 0 &&
        sizeAsNumber <= 10
      ) {
        size = sizeAsNumber;
      }

      const persons = await Person.findAndCountAll({
        limit: size,
        offset: page * size,
        order: [['id', 'ASC']],
      });

      res.json(persons);
    } catch (error) {
      console.error('Произошла ошибка:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }

  async getOnePerson(req, res) {
    try {
      const id = req.params.id;

      if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Некорректный ID' });
      }

      const person = await Person.sequelize.query(`
        SELECT * FROM person WHERE id = '${id}'
      `);

      if (person[0].length === 0) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      res.json(person[0]);
    } catch (error) {
      console.error('Произошла ошибка:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }

  async updatePerson(req, res) {
    try {
      const { id, surname, salary, vacationdays } = req.body;

      if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Некорректный ID' });
      }

      const updatedPerson = await Person.sequelize.query(`
        UPDATE person
        SET surname = '${surname}', salary = '${salary}', vacationdays = '${vacationdays}'
        WHERE id = '${id}'
        RETURNING *
      `);

      if (updatedPerson[0].length === 0) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      res.json(updatedPerson[0]);
    } catch (error) {
      console.error('Произошла ошибка:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }

  async deletePerson(req, res) {
    try {
      const id = req.params.id;

      if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Некорректный ID' });
      }

      const deletedPerson = await Person.sequelize.query(`
        DELETE FROM person
        WHERE id = '${id}'
        RETURNING *
      `);

      if (deletedPerson[0].length === 0) {
        return res
          .status(404)
          .json({ error: 'Пользователь не найден или уже был удален' });
      }

      res.json(deletedPerson[0]);
    } catch (error) {
      console.error('Произошла ошибка:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }
}

module.exports = new PersonController();
