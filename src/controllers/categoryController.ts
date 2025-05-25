// controllers/categoryController.ts
import { Response } from 'express';
import asyncHandler from '@app/middleware/asyncHandler/asyncHandler';
import { UserRequest } from '@app/utils/types/userTypes';
import * as CategoryModel from '@app/models/categoryModel';

// Get all categories
export const getCategories = asyncHandler(async (_req: UserRequest, res: Response) => {
  const categories = await CategoryModel.getAllCategories();
  res.status(200).json(categories);
});

// Get a single category by ID
export const getCategory = asyncHandler(async (req: UserRequest, res: Response) => {
  const id = parseInt(req.params.id);
  const category = await CategoryModel.getCategoryById(id);

  if (!category) {
    res.status(404).json({ message: 'Category not found' });
    return;
  }

  res.status(200).json(category);
});

// Create a new category
export const createCategory = asyncHandler(async (req: UserRequest, res: Response) => {
  const { name, description } = req.body;

  if (!name) {
    res.status(400).json({ message: 'Category name is required' });
    return;
  }

  const category = await CategoryModel.addCategory({ name, description });
  res.status(201).json({ message: 'Category created successfully', category });
});

// Update category
export const updateCategory = asyncHandler(async (req: UserRequest, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;

  const category = await CategoryModel.updateCategory(id, { name, description });

  if (!category) {
    res.status(404).json({ message: 'Category not found' });
    return;
  }

  res.status(200).json({ message: 'Category updated successfully', category });
});

// Delete category
export const deleteCategory = asyncHandler(async (req: UserRequest, res: Response) => {
  const id = parseInt(req.params.id);
  await CategoryModel.deleteCategory(id);

  res.status(200).json({ message: 'Category deleted successfully' });
});
