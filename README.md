# Лабораторная работа №3. Аутентификация и авторизация
Студент: Алексеев Сергей. <br>
Группа: IA-2303
***
## Цель работы

1. Освоить методы аутентификации и авторизации в backend-приложениях на Node.js.
2. Реализовать защиту REST API с помощью JWT (JSON Web Token).
3. Научиться разграничивать доступ к ресурсам в зависимости от роли пользователя.


### Шаг 1. Структура базы данных

Добавьте новую таблицу `users`, а также связь с таблицей `todos`.

![img.png](img.png)

Изменения в таблице `todos`, добавьте поле `user_id` для связи с пользователем-владельцем задачи:

| Поле      | Тип          | Описание                                          |
| --------- | ------------ | ------------------------------------------------- |
| `user_id` | INTEGER (FK) | Внешний ключ на таблицу `users` (владелец задачи) |

### Шаг 2. Реализация аутентификации (Authentication)

1. Добавьте маршруты `/api/auth`

   | Метод  | URL                  | Описание                                               | Ответ         |
      | ------ | -------------------- | ------------------------------------------------------ | ------------- |
   | `POST` | `/api/auth/register` | Регистрация нового пользователя                        | `201 Created` |
   | `POST` | `/api/auth/login`    | Вход пользователя (получение JWT)                      | `200 OK`      |
   | `GET`  | `/api/auth/profile`  | Получить информацию о текущем пользователе (по токену) | `200 OK`      |
```js
router.post('/register', );
router.post('/login',);
router.get('/profile',);
```
2. Регистрация (`POST /register`):
   1. Проверьте, что имя пользователя и email уникальныc
   2. Захэшируйте пароль с помощью `bcrypt`.
   3. Создайте пользователя в таблице `users`.
3. Вход (`POST /login`):
   1. Проверьте наличие пользователя и правильность пароля.
   2. Сгенерируйте JWT-токен, содержащий: `userId`, `username`, `role`.
   3. Возвратите токен в ответе.
4. Проверка токена (`GET /profile`):
   1. Токен передаётся в заголовке `Authorization: Bearer <token>`.
   2. Если токен валиден — верните информацию о пользователе.
   3. Если нет — статус `401 Unauthorized`.

### Шаг 3. Реализация авторизации (Authorization)
1. Реализуйте middleware, проверяющее JWT (`auth/jwtVerification.js`)
   1. Если токен отсутствует или невалиден → `401 Unauthorized`.
   2. Если токен валиден → запишите объект пользователя в `req.user`.
```js
module.exports = (req, res, next) => {
   try {
      const authHeader = req.headers['authorization'];

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
         return res.status(401).json({ message: 'Authorization token missing or malformed' });
      }

      const token = authHeader.split(' ')[1];
      const secret = process.env.JWT_SECRET;

      if (!secret) {
         console.error('JWT_SECRET not defined in environment variables');
         return res.status(500).json({ message: 'Server configuration error' });
      }
      const decoded = jwtVerification.verify(token, secret);
      req.user = decoded;

      next();
   } catch (err) {
      console.error('JWT verification error:', err.message);
      return res.status(401).json({ message: 'Invalid or expired token' });
   }
};
```
2. Реализуйте ролевую авторизацию:
   1. Middleware `isAdmin` допускает доступ только пользователям с ролью "admin".
   2. Middleware `isOwnerOrAdmin` допускает доступ, если пользователь — владелец ресурса или администратор.