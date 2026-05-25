import type {CategoryExpenseSummary} from "../../hooks/useDashboardData.ts";
import {
    type ActiveElement,
    ArcElement,
    Chart as ChartJS,
    type ChartData,
    type ChartEvent, type ChartOptions, Legend, Tooltip,
    type TooltipItem
} from "chart.js";
import { useMemo, useRef} from "react";
import {Doughnut} from "react-chartjs-2";

interface MonthlySpendingChartProps {
    data: CategoryExpenseSummary[];
    searchByCategory: (categoryId: number, month: Date) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
    'blue': '#60a5fa',
    'yellow': '#fbbf24',
    'purple': '#a78bfa',
    'pink': '#ec4899',
    'orange': '#fd7e14',
    'gray': '#71717a',
    'red': '#f87171',
    'green': '#059669',
    'default': '#3f3f46'
} as const;

const catColorHexCode = (color: string) => CATEGORY_COLORS[color] || CATEGORY_COLORS.default;

export const MonthlySpendingChart = ({data, searchByCategory} : MonthlySpendingChartProps) => {
    ChartJS.register(ArcElement, Tooltip, Legend)
    const chartRef = useRef<ChartJS<"doughnut">>(null);
    const chartData : ChartData<'doughnut'> = useMemo(() =>{
        return { labels: data.map(item => item.name || 'Desconhecida'),
            datasets: [
                {
                    data: data.map(item => item.amount),
                    backgroundColor: data.map(item => {
                        return catColorHexCode(item.color);
                    }),
                    borderColor: '#18181b',
                    borderRadius: 4,
                    borderWidth: 0,
                    spacing: 5,
                    hoverOffset: 10,
                },
            ],
        }}, [data])

    const handleChartClick = (_event:ChartEvent , elements:ActiveElement[]) => {
        if(elements.length > 0) {
            const index = elements[0].index;
            const categoryId = data[index].categoryId;
            const month = data[index].month || new Date();
            searchByCategory(categoryId,month)
        }
    }

    const options:ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        onClick: handleChartClick,
        layout: {
            padding: 10,
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                backgroundColor: "hsl(var(--card, 240 10% 3.9%))", // Tries to match 'bg-card'
                titleColor: "white",
                bodyColor: "hsl(var(--muted-foreground, 240 5% 64.9%))", // Matches 'text-muted-foreground'
                borderColor: "hsl(var(--border, 240 3.7% 15.9%))", // Matches 'border-border'
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                displayColors: true,
                boxPadding: 4,
                footerMarginTop: 8,
                callbacks: {
                    title: function (context: TooltipItem<'doughnut'>[]) {
                        const index = context[0].dataIndex;
                        return data[index]?.name || 'Desconhecida';
                    },
                    label: function (context: TooltipItem<'doughnut'>) {
                        const index = context.dataIndex;
                        const item = data[index];
                        if (!item) return '';

                        const formattedValue = new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        }).format(item.amount);

                        return `${formattedValue}`;
                    },
                    footer: function (context: TooltipItem<"doughnut">[]) {
                        if (context.length > 0) {
                            const index = context[0].dataIndex;
                            const item = data[index];
                            return `${item.percentage.toFixed(1)}% do total`;
                        }
                        return "";
                    },
                    labelColor:function (context: TooltipItem<'doughnut'>) {
                        const index = context.dataIndex;
                        return {
                            borderColor: catColorHexCode(data[index]?.color) || CATEGORY_COLORS.default,
                            backgroundColor: catColorHexCode(data[index]?.color) || CATEGORY_COLORS.default,
                            borderWidth: 2
                        };
                    }
                },
                footerColor:function (ctx) {
                    const tooltipItem = ctx.tooltip?.dataPoints?.[0];
                    if (tooltipItem?.datasetIndex !== undefined && tooltipItem?.dataIndex !== undefined) {
                        const index = tooltipItem.dataIndex;
                        return catColorHexCode(data[index]?.color) || CATEGORY_COLORS.default;
                    }
                    return "hsl(var(--muted-foreground, 240 5% 64.9%))";
                },
                footerFont: {
                    weight: 'bold', // Make percentage slightly bolder
                    size: 12
                },
                animation: {
                    duration: 200,
                    easing: 'easeOutQuart'
                }
            },

        },
        cutout: '70%',
        animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1000,
            easing: 'easeOutQuart'
        },
        interaction: {
            intersect: false,
            mode: 'point',
        },
    }
    if (!data || data.length === 0) {
        return (
            <div
                style={{ width: "100%", height: 300 }}
                className="flex flex-col items-center justify-center rounded-lg border border-dashed"
            >
                <div className="text-muted-foreground text-center">
                    <p className="text-lg font-medium">Nenhuma despesa registrada</p>
                    <p className="text-sm">Adicione transações para ver o gráfico</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{width: "100%", height: 300}}>
            <Doughnut
                ref={chartRef}
                data={chartData}
                options={options}
                aria-label="Gráfico de gastos mensais por categoria"
            />
        </div>
    )
}