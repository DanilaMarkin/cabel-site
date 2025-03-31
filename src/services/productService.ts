import prisma from '../lib/prisma'
import { Product } from '@prisma/client'

export const productService = {
  // Get all products
  getAllProducts: async () => {
    return await prisma.product.findMany({
      include: {
        category: true
      }
    })
  },

  // Get product by id
  getProductById: async (id: string) => {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        category: true
      }
    })
  },

  // Create new product
  createProduct: async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await prisma.product.create({
      data,
      include: {
        category: true
      }
    })
  },

  // Update product
  updateProduct: async (id: string, data: Partial<Product>) => {
    return await prisma.product.update({
      where: { id },
      data,
      include: {
        category: true
      }
    })
  },

  // Delete product
  deleteProduct: async (id: string) => {
    return await prisma.product.delete({
      where: { id }
    })
  },

  // Get products by category
  getProductsByCategory: async (categoryId: string) => {
    return await prisma.product.findMany({
      where: {
        categoryId
      },
      include: {
        category: true
      }
    })
  }
} 