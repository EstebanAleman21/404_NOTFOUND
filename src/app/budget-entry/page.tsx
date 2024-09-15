'use client'

import { useState, useEffect } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "~/components/ui/card"

type Budget = Record<number, number>

export default function BudgetEntry() {
  const [categories, setCategories] = useState<string[]>([])
  const [budget, setBudget] = useState<Budget>({})

  const fetchUserCategories = async () => {
    try {
      const response = await fetch('/api/get-user-categories')
      if (!response.ok) {
        throw new Error(`Failed to fetch categories. Status: ${response.status}`)
      }
      const data: { categories: string[] } = await response.json()
      setCategories(data.categories)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => {
    fetchUserCategories().catch(error => {
      console.error('Error fetching categories:', error)
    });
  }, [])

  const handleBudgetChange = (categoryId: number, amount: string) => {
    setBudget(prev => ({
      ...prev,
      [categoryId]: parseFloat(amount) || 0
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted budget:', budget)
    // Aquí normalmente enviarías estos datos a tu backend
  }

  const totalBudget = Object.values(budget).reduce((sum, amount) => sum + amount, 0)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Enter Your Budget</h1>
      <form onSubmit={handleSubmit}>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category, index) => (
            <Card key={index} className="mb-4">
              <CardHeader>
                <CardTitle>{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={budget[index] ?? ''}
                    onChange={(e) => handleBudgetChange(index, e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-500">$</span>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No categories available</p>
        )}
        <Card>
          <CardContent className="flex justify-between items-center">
            <CardTitle>Total Budget</CardTitle>
            <span className="text-xl font-bold">${totalBudget.toFixed(2)}</span>
          </CardContent>
        </Card>
        <CardFooter className="flex justify-end mt-4">
          <Button type="submit">Save Budget</Button>
        </CardFooter>
      </form>
    </div>
  )
}