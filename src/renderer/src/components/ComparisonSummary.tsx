import React from 'react'
import { CostResult } from '../utils'

interface SummaryItem {
    id: string
    name: string
    result: CostResult
}

interface ComparisonSummaryProps {
    results: SummaryItem[]
}

export const ComparisonSummary: React.FC<ComparisonSummaryProps> = ({ results }) => {
    const sorted = [...results].sort((a, b) => a.result.totalCost - b.result.totalCost)
    const cheapest = sorted[0]
    const expensive = sorted[sorted.length - 1]
    const savings = expensive.result.totalCost - cheapest.result.totalCost

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)

    return (
        <div className="comparison-box">
            <div className="stat-box">
                <div className="stat-label">Best Value Plan</div>
                <div className="stat-value" style={{ color: 'var(--success-color)' }}>{cheapest.name}</div>
            </div>
            <div className="stat-box">
                <div className="stat-label">Potential Savings</div>
                <div className="stat-value" style={{ color: 'var(--success-color)' }}>{formatCurrency(savings)}</div>
            </div>
            <div className="stat-box">
                <div className="stat-label">Lowest Total Cost</div>
                <div className="stat-value">{formatCurrency(cheapest.result.totalCost)}</div>
            </div>
        </div>
    )
}
