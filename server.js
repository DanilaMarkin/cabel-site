import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/api/products', async (req, res) => {
    try {
        let { page, limit, category } = req.query;
        console.log('Category from query:', category); // Отладочный лог

        // Проверка и установка значений для пагинации
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);
        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 20;

        const skip = (page - 1) * limit;

        // Если нужен нечувствительный поиск, можно предварительно нормализовать строку:
        if (category) {
            category = category.toLowerCase();
        }

        const categoryFilter = category ? { category } : {};

        const products = await prisma.product.findMany({
            where: categoryFilter,
            skip,
            take: limit,
        });

        const total = await prisma.product.count({
            where: categoryFilter,
        });

        res.json({
            products,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        res.status(500).json({ error: 'Ошибка получения данных' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
