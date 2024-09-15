/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
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
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useSession } from "next-auth/react"; // Import useSession from NextAuth

export default function MinimalistCardDashboard() {
  const { data: session } = useSession(); // Fetch session data using useSession from NextAuth
  const [balance, setBalance] = useState(0); // State to store the fetched balance
  const [rewards, setRewards] = useState(0); // State to store the fetched rewards
  const [loading, setLoading] = useState(true); // State to handle loading
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null); // State to store the hovered segment

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

          // Fetch transactions
          const transactionsResponse = await fetch(
            `/api/get-transactions?accountId=${accountId}`,
          );

          if (!transactionsResponse.ok) {
            throw new Error(
              `Failed to fetch transactions. Status: ${transactionsResponse.status}`,
            );
          }

          const transactionsData = await transactionsResponse.json();
          setRecentTransactions(transactionsData);

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

  // Handle mouse enter to update the hovered segment and value
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePieEnter = (entry: any) => {
    setHoveredSegment(entry.name);
    setHoveredValue(entry.value); // Access the correct value of the hovered segment
  };

  // Handle mouse leave to reset the hovered segment and value
  const handlePieLeave = () => {
    setHoveredSegment(null);
    setHoveredValue(null);
  };

  // Mock data for the revenue chart
  const revenueData = [
    { name: "Jun", total: 10000 },
    { name: "Jul", total: 17500 },
    { name: "Aug", total: 15300 },
  ];

  // Mock data for pie chart with income and expenses
  const data = [
    { name: "Transportation", value: 40000 }, // Example income
    { name: "Services", value: 25000 },
    { name: "Subscriptions", value: 20000 },
    { name: "Minor Expenses", value: 5000 }, // Example expenses
  ];
  const COLORS = ["#00823E", "#00C49F", "#FFBB28", "#FF8042"];

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
              Saved Amount this month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-light text-gray-800">10%</div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <div className="mb-12 grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card className="mb-12 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-light text-gray-800">
              Total expenses
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
                  <Bar dataKey="total" fill="#84CDEE" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-12 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-light text-gray-800">
              Expenses Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex h-[400px] items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart
                  width={400}
                  height={400}
                  onMouseEnter={handlePieEnter}
                  onMouseLeave={handlePieLeave}
                >
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={120}
                    outerRadius={160}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    onMouseEnter={handlePieEnter}
                    onMouseLeave={handlePieLeave}
                  >
                    {/* Conditionally render the labels based on hover state */}
                    <Label
                      value={
                        hoveredSegment
                          ? `${hoveredSegment}: $${hoveredValue}`
                          : `Income: $${totalIngresos}`
                      }
                      position="centerTop"
                      dy={-20}
                      style={{
                        fill: hoveredSegment ? "#000" : "#0088FE",
                        fontSize: "18px",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    />
                    <Label
                      value={hoveredSegment ? "" : `Expenses: $${totalGastos}`}
                      position="centerBottom"
                      dy={20}
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
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                  />
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
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm text-gray-800">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {transaction.status === "executed" ? "Paid" : "Pending"}
                    </p>
                  </div>
                  <div
                    className={`font-light ${
                      transaction.status === "executed"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    ${transaction.amount}
                  </div>
                </div>
              ))
            ) : (
              <p>No recent transactions available.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
