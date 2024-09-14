"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "1 Mar", income: 4000, spending: 2400 },
  { name: "2 Mar", income: 3000, spending: 1398 },
  { name: "3 Mar", income: 2000, spending: 9800 },
  { name: "4 Mar", income: 2780, spending: 3908 },
  { name: "5 Mar", income: 1890, spending: 4800 },
];

const BalanceSummaryChart = () => (
  <ResponsiveContainer width="100%" height={200}>
    <LineChart data={data}>
      <CartesianGrid stroke="#eee" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="income" stroke="#8884d8" />
      <Line type="monotone" dataKey="spending" stroke="#82ca9d" />
    </LineChart>
  </ResponsiveContainer>
);

export default BalanceSummaryChart;
