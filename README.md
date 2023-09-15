# Fullstack Datatable

## Требования

Для запуска этого проекта вам потребуется:

- Версия Node.js 18.15.0 или выше
- Версия PostgreSQL 15.2 или выше

## Установка и Настройка

1. **Клонируйте репозиторий:**

   ```
   git clone https://github.com/an1serg/fullstack-datatable.git
   ```

2. **Установка и запуск сервера**

   - Перейдите в директорию server
     ```
     cd server
     ```
   - Установите зависимости

     ```
     npm install
     ```

   - Установите PostgreSQL - [[Link]](https://www.postgresql.org/download/)

   - Создайте базу данных с помощью pgAdmin или psql в PowerShell

     - Откройте приложение SQL Shell (psql)
     - Войдите в свою учетную запись
     - Создайте базу данных с помощью команды

       `CREATE DATABASE 'database_name';`

   - Подключитесь к созданной базе данных, используя команду

     `\connect 'database_name'`

   - Создайте таблицы и заполните их исходными данными выполнив команды из файла _server/init-db.sql_ в терминале

   - Или запустите в терминале команду

     `psql -U username -d database_name -a -f init-db.sql`

     Где username - имя пользователя (по умолчанию - postgres), database_name - название базы данных

   - Создайте файл _server/.env_ и добавьте туда значения переменных, в зависимости от тех, которые вы указывали при создании базы данных (пример заполнения файла _.env_ можно посмотреть в файле _.env.example_ )

   - Запустите сервер, используя команду
     ```
     npm run start
     ```

3. **Установка и запуск клиента**

- Перейдите в директорию client
  ```
  cd client
  ```
- Установите зависимости

  ```
  npm install
  ```

- Запустите клиент, используя команду

  ```
  npm run start
  ```

#### После запуска сервера и клиента проект будет доступен по ссылке - http://localhost:3000/
