require('dotenv').config();
const { sequelize, Category, Todo } = require('./models');

async function seed() {
    try {
        await sequelize.authenticate();
        console.log(' Database connected');

        // Очистим таблицы (опционально)
        await Todo.destroy({ where: {} });
        await Category.destroy({ where: {} });

        console.log(' Tables cleared');

        // Добавляем категории
        const categoriesData = [
            { name: 'Покупки' },
            { name: 'Работа' },
            { name: 'Учёба' },
            { name: 'Дом' },
            { name: 'Спорт' },
            { name: 'Хобби' },
            { name: 'Путешествия' },
            { name: 'Финансы' },
            { name: 'Здоровье' },
            { name: 'Развлечения' }
        ];

        const categories = await Category.bulkCreate(categoriesData, { returning: true });
        console.log(` Added ${categories.length} categories`);

        // Добавляем задачи
        const todosData = [
            { title: 'Купить молоко', category_id: categories[0].id },
            { title: 'Закончить отчёт', category_id: categories[1].id },
            { title: 'Подготовиться к экзамену', category_id: categories[2].id },
            { title: 'Убрать в комнате', category_id: categories[3].id },
            { title: 'Сходить в спортзал', category_id: categories[4].id },
            { title: 'Порисовать вечером', category_id: categories[5].id },
            { title: 'Спланировать поездку', category_id: categories[6].id },
            { title: 'Проверить банковский счёт', category_id: categories[7].id },
            { title: 'Сделать зарядку', category_id: categories[8].id },
            { title: 'Посмотреть фильм', category_id: categories[9].id }
        ];

        const todos = await Todo.bulkCreate(todosData, { returning: true });
        console.log(`Added ${todos.length} todos`);

        console.log('🎉 Seeding completed successfully!');
        await sequelize.close();
    } catch (error) {
        console.error(' Error while seeding:', error);
    }
}

seed();
