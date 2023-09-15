const Book = require('../models/Book');

class BookController {
  async createBook(req, res) {
    try {
      const { title, price, amount, user_id } = req.body;

      if (!title || !price || !amount || !user_id) {
        return res
          .status(400)
          .json({ error: 'Не все обязательные поля были предоставлены' });
      }

      const newBook = await Book.sequelize.query(`
        INSERT INTO book (title, price, amount, user_id) 
        VALUES ('${title}', '${price}', '${amount}', '${user_id}') 
        RETURNING *
      `);

      res.json(newBook[0]);
    } catch (error) {
      console.error('Произошла ошибка:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }

  async getBookByUser(req, res) {
    try {
      const id = req.query.id;

      if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Некорректный ID' });
      }

      const books = await Book.sequelize.query(
        `SELECT * FROM book WHERE user_id = '${id}'`
      );

      res.json(books[0]);
    } catch (error) {
      console.error('Произошла ошибка:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }

  async getBooks(req, res) {
    try {
      const startAsNumber = Number.parseInt(req.query.start);
      const endAsNumber = Number.parseInt(req.query.end);

      let start = 0;
      if (!Number.isNaN(startAsNumber) && startAsNumber >= 0) {
        start = startAsNumber;
      }

      let end = 10;
      if (!Number.isNaN(endAsNumber) && endAsNumber > 0) {
        end = endAsNumber;
      }

      const books = await Book.findAndCountAll({
        limit: end - start,
        offset: start,
        order: [['id', 'ASC']],
      });

      res.json(books);
    } catch (error) {
      console.error('Произошла ошибка:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }

  async updateBook(req, res) {
    try {
      const { id, title, price, amount, user_id } = req.body;

      const results = await Book.sequelize.query(
        `UPDATE book SET title = '${title}', price = '${price}', amount = '${amount}', user_id = '${user_id}'
         WHERE id = '${id}' RETURNING *`
      );

      if (results.length === 0) {
        return res.status(404).json({ error: 'Книга не найдена' });
      }

      res.json(results[0]);
    } catch (error) {
      console.error('Произошла ошибка:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }

  async deleteBook(req, res) {
    try {
      const id = req.params.id;

      const results = await Book.sequelize.query(
        `DELETE FROM book WHERE id = '${id}'`
      );

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: 'Книга не найдена или уже удалена' });
      }

      res.json({ message: 'Книга успешно удалена' });
    } catch (error) {
      console.error('Произошла ошибка:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }
}

module.exports = new BookController();
