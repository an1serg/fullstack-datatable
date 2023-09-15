
create TABLE person(
    id SERIAL PRIMARY KEY,
    surname VARCHAR(255),
    salary NUMERIC,
    vacationDays INTEGER,
    createdAt DATE DEFAULT now()
);

create TABLE book(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    price NUMERIC,
    amount INTEGER,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id),
    createdAt DATE DEFAULT now()
);

INSERT INTO person (surname, salary, vacationdays) VALUES 
    ('Пушкин', '70000', '25'),
    ('Гоголь', '25000', '15'),
    ('Тургенев', '150000', '3');

INSERT INTO book (title, price, amount, user_id) VALUES
    ('Евгений Онегин', '450', '3', '1'),
    ('Пиковая дама', '575', '6', '1'),
    ('Мертвые души', '300', '2', '2'),
    ('Ревизор', '230', '14', '2'),
    ('Отцы и дети', '760', '32', '3'),
    ('Муму', '170', '22', '3'),
    ('Пример1', '230', '14', '2'),
    ('Пример2', '123', '52', '1'),
    ('Пример3', '345', '21', '3'),
    ('Пример4', '123', '33', '2'),
    ('Пример5', '312', '12', '1'),
    ('Пример6', '333', '34', '1'),
    ('Пример7', '222', '55', '3'),
    ('Привер8', '111', '66', '2'),

