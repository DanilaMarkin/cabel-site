import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/api/products", async (req, res) => {
  try {
    let { page, limit, category, search, sortType, maxPrice } = req.query;
    console.log("Category from query:", category); // Отладочный лог
    console.log("Search query:", search); // Отладочный лог
    console.log("Sort type:", sortType); // Отладочный лог
    console.log("Max Price:", maxPrice); // Отладочный лог

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

    // Фильтрация по запросу поиска
    const searchFilter = search
      ? {
          name: {
            contains: search, // Нечувствительный поиск по части имени
            mode: "insensitive", // Не учитываем регистр
          },
        }
      : {};

    // Проверка на максимальную цену
    const maxPriceFilter = maxPrice
      ? {
          cost: {
            lte: maxPrice.toString(), // Преобразуем значение в строку
          },
        }
      : {};

    // Обработка сортировки
    const sortOrder =
      sortType === "price-asc"
        ? { cost: "asc" }
        : sortType === "price-desc"
        ? { cost: "desc" }
        : {};

    const products = await prisma.product.findMany({
      where: {
        ...categoryFilter,
        name: search
          ? {
              contains: search.toLowerCase(), // Convert the search query to lowercase
            }
          : undefined,
          ...maxPriceFilter, // Добавляем фильтрацию по maxPrice
        cost: {
          not: "По запросу", // Исключаем товары с этим значением
        },
      },
      skip,
      take: limit,
      orderBy: sortOrder, // Добавили сортировку по цене
    });

    const total = await prisma.product.count({
      where: {
        ...categoryFilter,
        name: search
          ? {
              contains: search.toLowerCase(), // Same filtering logic as findMany
            }
          : undefined,
      },
    });

    res.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    res.status(500).json({ error: "Ошибка получения данных" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
