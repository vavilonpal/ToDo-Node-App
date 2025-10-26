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


Windows PowerShell
(C) Корпорация Майкрософт (Microsoft Corporation). Все права защищены.

Установите последнюю версию PowerShell для новых функций и улучшения! https://aka.ms/PSWindows

PS C:\Users\admin\WebstormProjects\todoapp> npm install express pg pg-hstore sequelize sequelize-cli dotenv express-validator

added 186 packages, and audited 187 packages in 9s
35 packages are looking for funding
run `npm fund` for details
3 moderate severity vulnerabilities

To address issues that do not require attention, run:
npm audit fix

Some issues need review, and may require choosing
a different dependency.

Run `npm audit` for details.
PS C:\Users\admin\WebstormProjects\todoapp> npm install swagger-jsdoc swagger-ui-express
npm WARN deprecated inflight@1.0.6: This module is not supported, and leaks
memory. Do not use it. Check out lru-cache if you want a good and tested way
to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm WARN deprecated lodash.isequal@4.5.0: This package is deprecated. Use require('node:util').isDeepStrictEqual instead.
npm WARN deprecated lodash.get@4.4.2: This package is deprecated. Use the optional chaining (?.) operator instead.
npm WARN deprecated glob@7.1.6: Glob versions prior to v9 are no longer supported

added 31 packages, and audited 218 packages in 5s

36 packages are looking for funding
run `npm fund` for details

7 moderate severity vulnerabilities

To address issues that do not require attention, run:
npm audit fix

To address all issues possible (including breaking changes), run:
npm audit fix --force

Some issues need review, and may require choosing
a different dependency.

Run `npm audit` for details.
PS C:\Users\admin\WebstormProjects\todoapp> npm install --save-dev nodemon

added 24 packages, and audited 242 packages in 2s

40 packages are looking for funding
run `npm fund` for details

7 moderate severity vulnerabilities

To address all issues possible (including breaking changes), run:
npm audit fix --force

Some issues need review, and may require choosing
a different dependency.

Run `npm audit` for details.
PS C:\Users\admin\WebstormProjects\todoapp> npx sequelize-cli migration:generate --name create-categories

Sequelize CLI [Node: 20.11.0, CLI: 6.6.3, ORM: 6.37.7]

migrations folder at "C:\Users\admin\WebstormProjects\todoapp\src\migrations" already exists.
New migration was created at C:\Users\admin\WebstormProjects\todoapp\src\migrations\20251025140214-create-categories.js .
PS C:\Users\admin\WebstormProjects\todoapp> npx sequelize-cli migration:generate --name create-todos

Sequelize CLI [Node: 20.11.0, CLI: 6.6.3, ORM: 6.37.7]

migrations folder at "C:\Users\admin\WebstormProjects\todoapp\src\migrations" already exists.
New migration was created at C:\Users\admin\WebstormProjects\todoapp\src\migrations\20251025140358-create-todos.js .
PS C:\Users\admin\WebstormProjects\todoapp> npx sequelize-cli db:migrate

Sequelize CLI [Node: 20.11.0, CLI: 6.6.3, ORM: 6.37.7]


ERROR: Cannot find "C:\Users\admin\WebstormProjects\todoapp\src\config\config.js". Have you run "sequelize init"?

PS C:\Users\admin\WebstormProjects\todoapp> npx sequelize-cli db:migrate

Sequelize CLI [Node: 20.11.0, CLI: 6.6.3, ORM: 6.37.7]

[dotenv@17.2.3] injecting env (5) from .env -- tip: 🔄 add secrets lifecycle management: https://dotenvx.com/ops
Loaded configuration file "src\config\config.js".
Using environment "development".

ERROR: database "todo_dev" does not exist

PS C:\Users\admin\WebstormProjects\todoapp> npx sequelize-cli db:migrate
Sequelize CLI [Node: 20.11.0, CLI: 6.6.3, ORM: 6.37.7]

[dotenv@17.2.3] injecting env (5) from .env -- tip: 🔐 encrypt with Dotenvx: https://dotenvx.com
Loaded configuration file "src\config\config.js".
Using environment "development".

ERROR: database "todo_dev" does not exist

PS C:\Users\admin\WebstormProjects\todoapp> npx sequelize-cli db:migrate

Sequelize CLI [Node: 20.11.0, CLI: 6.6.3, ORM: 6.37.7]

[dotenv@17.2.3] injecting env (5) from .env -- tip: 👥 sync secrets across teammates & machines: https://dotenvx.com/ops
Loaded configuration file "src\config\config.js".
Using environment "development".
== 20251025140214-create-categories: migrating =======
== 20251025140214-create-categories: migrated (0.016s)

== 20251025140358-create-todos: migrating =======
== 20251025140358-create-todos: migrated (0.010s)

PS C:\Users\admin\WebstormProjects\todoapp>