/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  Label,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useSession } from "next-auth/react"; // Import useSession from NextAuth

export default function MinimalistCardDashboard() {
  const { data: session } = useSession(); // Fetch session data using useSession from NextAuth
  const [balance, setBalance] = useState(0); // State to store the fetched balance
  const [rewards, setRewards] = useState(0); // State to store the fetched rewards
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch the balance when the accountId is available
  useEffect(() => {
    async function fetchBalance() {
      if (session?.user?.account_id) {
        console.log("Account ID being used:", session.user.account_id); // Add this line
        try {
          const accountId = session.user.account_id;
          const response = await fetch(
            `/api/get-balance?accountId=${accountId}`,
          );

          if (!response.ok) {
            throw new Error(
              `Failed to fetch balance. Status: ${response.status}`,
            );
          }

          const balanceData = await response.json();
          setBalance(balanceData.balance || 0);
        } catch (error) {
          console.error("Failed to fetch balance:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    // Fetch the rewards when the accountId is available
    async function fetchRewards() {
      if (session?.user?.account_id) {
        console.log("Account ID being used:", session.user.account_id); // Add this line
        try {
          const accountId = session.user.account_id;
          const response = await fetch(
            `/api/get-balance?accountId=${accountId}`,
          );

          if (!response.ok) {
            throw new Error(
              `Failed to fetch rewards. Status: ${response.status}`,
            );
          }

          const rewardsData = await response.json();
          setRewards(rewardsData.rewards ?? 0);
        } catch (error) {
          console.error("Failed to fetch rewards:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    void fetchBalance();
    void fetchRewards();
  }, [session?.user?.account_id]);

  const handlePieEnter = () => {
    // Handle event here, if needed
  };

  const recentTransactions = [
    { id: 1, name: "Payment to John Doe", amount: 500, type: "debit" },
    { id: 2, name: "Payment to Jane Doe", amount: 700, type: "debit" },
    { id: 3, name: "Payment from Acme Inc", amount: 1200, type: "credit" },
    { id: 4, name: "Payment to XYZ Corp", amount: 300, type: "debit" },
    { id: 5, name: "Payment to ABC Ltd", amount: 800, type: "debit" },
  ]; // Mock data for recent transactions

  // Mock data for the revenue chart
  const revenueData = [
    { name: "Apr", total: 25000 },
    { name: "May", total: 30000 },
    { name: "Jun", total: 28000 },
  ];

  // Mock data for pie chart with income and expenses
  const data = [
    { name: "Ingresos", value: 40000 }, // Example income
    { name: "Gastos", value: 25000 }, // Example expenses
  ];
  const COLORS = ["#0088FE", "#FF8042"];

  // Total income and expenses with optional chaining and fallback to 0 if undefined
  const totalIngresos = data?.[0]?.value ?? 0;
  const totalGastos = data?.[1]?.value ?? 0;

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <h1 className="mb-8 text-3xl font-light text-gray-800">
        Financial Overview
      </h1>

      {/* Summary Cards */}
      <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-gray-500">
              Total balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-light text-gray-800">
              {loading ? "Loading..." : `$${balance.toFixed(2)}`}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-gray-500">
              Rewards Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-light text-gray-800">
              {loading ? "Loading..." : `$${rewards.toFixed(2)}`}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-gray-500">
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-light text-gray-800">573</div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <div className="mb-12 grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card className="mb-12 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-light text-gray-800">
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Bar dataKey="total" fill="#e0e0e0" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-12 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-light text-gray-800">
              Gastos e Ingresos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex h-[400px] items-center justify-center">
              {" "}
              {/* Make the pie chart container bigger */}
              <ResponsiveContainer width="100%" height="100%">
                <PieChart
                  width={400}
                  height={400}
                  onMouseEnter={handlePieEnter}
                >
                  <Pie
                    data={data}
                    cx="50%" // Center the PieChart horizontally
                    cy="50%" // Center the PieChart vertically
                    innerRadius={120} // Increase the size of the inner radius
                    outerRadius={160} // Increase the size of the outer radius
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {/* Add Labels for Ingresos and Gastos */}
                    <Label
                      value={`Ingresos: $${totalIngresos}`}
                      position="centerTop" // Position for the top label
                      dy={-20} // Move the label upwards to add space
                      style={{
                        fill: "#0088FE",
                        fontSize: "18px",
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "green",
                      }}
                    />
                    <Label
                      value={`Gastos: $${totalGastos}`}
                      position="centerBottom" // Position for the bottom label
                      dy={20} // Move the label downwards to add space
                      style={{
                        fill: "#FF8042",
                        fontSize: "18px",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    />
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                  />{" "}
                  {/* Add the Legend */}
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-light text-gray-800">
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
              >
                <div>
                  <p className="text-sm text-gray-800">{transaction.name}</p>
                  <p className="text-xs text-gray-500">
                    {transaction.type === "credit" ? "Received" : "Paid"}
                  </p>
                </div>
                <div
                  className={`font-light ${
                    transaction.type === "credit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "credit" ? "+" : "-"}$
                  {transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
