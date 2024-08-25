"use client";

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Transaction {
    value: number;
    original_wording: string;
    type: string;
}

interface PieChartProps {
    transactions: Transaction[];
}

export default function PieChart({ transactions }: PieChartProps) {
    const [chartData, setChartData] = useState({
        labels: [] as string[],
        datasets: [{
            data: [] as number[],
            backgroundColor: [] as string[],
            hoverOffset: 4
        }]
    });

    useEffect(() => {
        const data = transactions.reduce((acc, transaction) => {
            const category = transaction.type || 'Autre';
            if (!acc[category]) acc[category] = 0;
            acc[category] += Math.abs(transaction.value);
            return acc;
        }, {} as Record<string, number>);

        const labels = Object.keys(data);
        const values = Object.values(data);
        const colors = labels.map(() => `hsl(${Math.random() * 360}, 100%, 50%)`);

        setChartData({
            labels,
            datasets: [{
                data: values,
                backgroundColor: colors,
                hoverOffset: 4
            }]
        });
    }, [transactions]);

    return <Pie data={chartData} />;
}
