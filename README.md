# Лабораторная работа №4. Обработка ошибок, валидация и логгирование
Студент: Алексеев Сергей. <br>
Группа: IA-2303
***
## Цель работы

Целью данной лабораторной работы является изучение методов обработки ошибок, валидации данных и логгирования в приложениях на Node.JS с использованием Express.

### Шаг 1. Обработка ошибок

1. Реализуйте централизованный обработчик ошибок в вашем приложении Express.
   - Рекомендуется создать пользовательские классы ошибок для различных типов ошибок (например, `NotFoundError`, `ValidationError`, `DatabaseError` и т.д.).
```js
class AppError extends Error {
   constructor(message, statusCode = 500) {
      super(message);
      this.statusCode = statusCode;
      this.status = 'error';
   }
}

class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

class ValidationError extends AppError {
    constructor(message = 'Validation failed') {
        super(message, 400);
    }
}

class DatabaseError extends AppError {
    constructor(message = 'Database error') {
        super(message, 500);
    }
}

```
2. Все ошибки должны корректно перехватываться и преобразовываться в унифицированный формат ответа клиенту:
   ```json
   {
     "status": "error",
     "message": "Описание ошибки"
   }
   ```
3. Для асинхронных маршрутов рекомендуется использовать подход, который предотвращает "потерю" ошибок, например, обертка над async-функциями.
```js
module.exports = function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };
}
```

### Шаг 2. Валидация данных

1. Используйте библиотеку `express-validator` или `Joi`, добавьте в ваше приложение валидацию входящих данных для всех маршрутов, которые принимают данные от клиента (например, создание или обновление ресурсов).
2. В случае ошибки валидации возвращайте клиенту ответ с кодом состояния `400` и подробным описанием ошибок валидации.
   ```json
   {
     "status": "error",
     "message": "Ошибка валидации данных",
     "errors": [
       {
         "field": "имя_поля",
         "message": "описание ошибки"
       }
     ]
   }
   ```
3. Используйте глобальный обработчик ошибок для обработки ошибок валидации.

