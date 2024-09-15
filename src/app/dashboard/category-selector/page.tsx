'use client'

import React, { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { X } from "lucide-react"

const fixedCategories = ['Super Maket', 'Transportation', 'Services', 'Subscriptions', 'Minor Expenses']

export default function CategorySelectorComponent() {
    const [categories, setCategories] = useState<string[]>([''])
    const [customCategory, setCustomCategory] = useState('')

    useEffect(() => {
        if (categories[categories.length - 1] !== '' && categories.length < 5) {
            setCategories([...categories, ''])
        }
    }, [categories])

    const postUserBudget = async (category: string) => {
        try {
            const response = await fetch('/api/post-user-budget', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: 0, // Valor por defecto
                    period: 'Weekly', // Valor por defecto
                    category,
                    isValid: true // Valor por defecto
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to post budget. Status: ${response.status}`);
            }

            console.log('Budget posted successfully');
        } catch (error) {
            console.error('Error posting budget:', error);
        }
    };

    const addCategory = async (index: number, value: string) => {
        if (categories.length <= 5 && !categories.includes(value)) {
            const newCategories = [...categories]
            newCategories[index] = value
            setCategories(newCategories)
            if (value === 'custom') {
                setCustomCategory('')
            } else {
                await postUserBudget(value); // Llama a la API después de agregar la categoría
            }
        }
    }

    const removeCategory = (index: number) => {
        if (categories.length > 1) {
            const newCategories = categories.filter((_, i) => i !== index).filter(cat => cat !== '')
            setCategories([...newCategories, ''])
        }
    }

    const handleCustomCategory = async (index: number, value: string) => {
        if (value && !categories.includes(value)) {
            const newCategories = [...categories]
            newCategories[index] = value
            setCategories(newCategories)
            setCustomCategory('')
            await postUserBudget(value); // Llama a la API después de agregar la categoría personalizada
        }
    }

    const handleCustomCategoryInput = async (index: number, event: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
        if (event.type === 'blur' || (event as React.KeyboardEvent).key === 'Enter') {
            await handleCustomCategory(index, customCategory)
        }
    }

    const availableCategories = (index: number) =>
        [...fixedCategories, 'custom'].filter(cat =>
            !categories.includes(cat) || categories[index] === cat
        )
    
    const updateUserCategoriesInDB = async (newCategories: string[]) => {
        try {
            const response = await fetch('/api/update-user-categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ categories: newCategories })
            });

            if (!response.ok) {
                throw new Error(`Failed to update categories. Status: ${response.status}`);
            }

            console.log('Categories updated successfully');
        } catch (error) {
            console.error('Error updating categories:', error);
        }
    };

    useEffect(() => {
      const updateCategories = async () => {
        await updateUserCategoriesInDB(categories.filter(cat => cat !== ''));
      };
      updateCategories().catch(error => {
        console.error('Error updating categories:', error);
      });
    }, [categories]);
    
    return (
        <div className="space-y-4 p-4 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Select Expense Categories</h2>
          {categories.map((category, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category {categories.filter(cat => cat !== '').length > index ? index + 1 : ''}
                </label>
                <Select
                  value={category}
                  onValueChange={(value) => addCategory(index, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCategories(index).map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {category === 'custom' && (
                <Input
                  type="text"
                  placeholder="Enter custom category"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  onBlur={(e) => handleCustomCategoryInput(index, e)}
                  onKeyDown={(e) => handleCustomCategoryInput(index, e)}
                  className="flex-grow mt-1"
                />
              )}
              {category !== '' && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeCategory(index)}
                  className="mt-6"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )
}