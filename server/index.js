const express = require('express');
const personRouter = require('./routes/person.routes');
const bookRouter = require('./routes/book.routes');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', personRouter);
app.use('/api', bookRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
