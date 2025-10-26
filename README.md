### Лабораторная работа №2
Студент: Алексеев Сергей. <br>
Группа: IA-2303
***
Цель работы
***
1. Научиться проектировать и реализовывать REST API с несколькими связанными сущностями.
2. Освоить работу с PostgreSQL в приложении на Node.js + Express с использованием ORM или сырых SQL-запросов.
3. Реализовать корректные операции CRUD, а также фильтрацию, сортировку и пагинацию.
4. Освоить принципы работы связей «один ко многим» (1:N) в реляционных базах данных.

### Шаг 1. Создание базы данных

Используя миграции, создаём две таблицы:

- Таблица `todos` для хранения задач.
- Таблица `categories` для хранения категорий задач.

``PS C:\Users\admin\WebstormProjects\todoapp> npx sequelize-cli migration:generate --name create-categories``
``PS C:\Users\admin\WebstormProjects\todoapp> npx sequelize-cli migration:generate --name create-todos``

### Шаг 3. Реализация API
