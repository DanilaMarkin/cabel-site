import express from 'express';
import cors from 'cors';  // Import the CORS package
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const port = 3000;

// Enable CORS for all origins
app.use(cors());  // Use CORS middleware

app.use(express.json());

// Получить все товары
app.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,  // Включить категорию товара (если нужно)
        features: true,  // Включить особенности товара (если нужно)
      },
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving products');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
