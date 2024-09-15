'use client'

import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"

// Mock data for expense categories
const expenseCategories = [
  { id: 1, name: 'Housing', description: 'Rent, mortgage, utilities, etc.' },
  { id: 2, name: 'Transportation', description: 'Car payments, gas, public transit, etc.' },
  { id: 3, name: 'Food', description: 'Groceries, dining out, etc.' },
  { id: 4, name: 'Healthcare', description: 'Insurance, medications, doctor visits, etc.' },
  { id: 5, name: 'Entertainment', description: 'Movies, concerts, hobbies, etc.' },
]

type Budget = Record<number, number>

export default function BudgetEntry() {
  const [budget, setBudget] = useState<Budget>({})

  const handleBudgetChange = (categoryId: number, amount: string) => {
    setBudget(prev => ({
      ...prev,
      [categoryId]: parseFloat(amount) || 0
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted budget:', budget)
    // Here you would typically send this data to your backend
  }

  const totalBudget = Object.values(budget).reduce((sum, amount) => sum + amount, 0)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Enter Your Budget</h1>
      <form onSubmit={handleSubmit}>
        {expenseCategories.map(category => (
          <Card key={category.id} className="mb-4">
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={budget[category.id] ?? ''}
                  onChange={(e) => handleBudgetChange(category.id, e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-500">$</span>
              </div>
            </CardContent>
          </Card>
        ))}
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