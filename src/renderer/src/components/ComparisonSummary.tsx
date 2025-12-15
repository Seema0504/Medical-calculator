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
        <div className="comparison-box" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '1rem', background: 'white', borderRadius: '8px', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-main)' }}>
                Based on your inputs, <span style={{ color: 'var(--primary-color)' }}>{cheapest.name}</span> is cheaper than {expensive.name} by{' '}
                <span style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>{formatCurrency(savings)}</span>/yr
            </h3>
            <p style={{ margin: '0.5rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Lowest Total Cost: <strong>{formatCurrency(cheapest.result.totalCost)}</strong>
            </p>
        </div>
    )
}
