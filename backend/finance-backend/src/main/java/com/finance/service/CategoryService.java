package com.finance.service;

import com.finance.dto.CategoryRequest;
import com.finance.entity.Category;
import com.finance.exception.ResourceNotFoundException;
import com.finance.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category createCategory(CategoryRequest request) {

        Category category = new Category();

        category.setName(request.getName());

        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {

        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long id) {

        return categoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Category not found with id: " + id));
    }

    public Category updateCategory(Long id, CategoryRequest request) {

        Category category = getCategoryById(id);

        category.setName(request.getName());

        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {

        Category category = getCategoryById(id);

        categoryRepository.delete(category);
    }
}