/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import { useState, useEffect } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "~/components/ui/card"
import { getSession } from 'next-auth/react'

type Budget = {
  id: string;
  amount: number;
  period: string;
  category: string;
}

export default function BudgetEntry() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [balance, setBalance] = useState<number>(0)

  const fetchActiveBudgets = async () => {
    try {
      const response = await fetch('/api/get-active-budgets')
      if (!response.ok) {
        throw new Error(`Failed to fetch budgets. Status: ${response.status}`)
      }
      const data: Budget[] = await response.json()
      setBudgets(data)
    } catch (error) {
      console.error('Error fetching budgets:', error)
    }
  }

  const fetchBalance = async () => {
    const session = await getSession()
    try {
      const response = await fetch(`/api/get-balance?accountId=${session?.user.account_id}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch balance. Status: ${response.status}`)
      }
      const data = await response.json()
      setBalance(data.balance.toFixed(2))
    } catch (error) {
      console.error('Error fetching balance:', error)
    }
  }

  const updateBudgetStatus = async () => {
    try {
      const response = await fetch('/api/update-budget-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error(`Failed to update budget status. Status: ${response.status}`)
      }
      console.log('Budget status updated successfully')
    } catch (error) {
      console.error('Error updating budget status:', error)
    }
  }

  useEffect(() => {
    const updateAndFetchData = async () => {
      await updateBudgetStatus()
      await fetchActiveBudgets()
      await fetchBalance()
    }
    updateAndFetchData().catch(error => {
      console.error('Error updating and fetching data:', error)
    });
  }, [])

  const handleBudgetChange = (budgetId: string, amount: string) => {
    setBudgets(prev => prev.map(budget => 
      budget.id === budgetId ? { ...budget, amount: parseFloat(amount) || 0 } : budget
    ))
  }

  const handleBlurOrEnter = async (budgetId: string, amount: string) => {
    try {
      const response = await fetch('/api/set-budget-amount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ budgetId, amount: parseFloat(amount) || 0 })
      })
      if (!response.ok) {
        throw new Error(`Failed to set budget amount. Status: ${response.status}`)
      }
      console.log('Budget amount set successfully')
    } catch (error) {
      console.error('Error setting budget amount:', error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted budgets:', budgets)
    // Aquí normalmente enviarías estos datos a tu backend
  }

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0)
  const remainingBalance = balance - totalBudget

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Enter Your Budget</h1>
      <form onSubmit={handleSubmit}>
        {budgets.length > 0 ? (
          budgets.map((budget) => (
            <Card key={budget.id} className="mb-4">
              <CardHeader>
                <CardTitle>{budget.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Input
                    type="number"
                    placeholder={budget.amount.toString()}
                    onChange={(e) => handleBudgetChange(budget.id, e.target.value)}
                    onBlur={(e) => handleBlurOrEnter(budget.id, e.target.value)}
                    onKeyPress={async (e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        await handleBlurOrEnter(budget.id, e.currentTarget.value)
                      }
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-500">$</span>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No budgets available</p>
        )}
        <Card>
          <CardContent className="flex justify-between items-center">
            <CardTitle>Total Budget</CardTitle>
            <span className="text-xl font-bold">${totalBudget.toFixed(2)}</span>
          </CardContent>
        </Card>
        <Card className='mt-7'>
          <CardContent className="flex justify-between items-center">
            <CardTitle>Remaining Balance</CardTitle>
            <span className="text-xl font-bold">${remainingBalance.toFixed(2)}</span>
          </CardContent>
        </Card>
        <CardFooter className="flex justify-end mt-4">
          <Button type="submit">Save Budget</Button>
        </CardFooter>
      </form>
    </div>
  )
}