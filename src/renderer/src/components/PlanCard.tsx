
import React from 'react'
import { PlanDetails, CoverageType } from '../constants'
import { CostResult } from '../utils'
import { ProgressBar } from './ProgressBar'
import clsx from 'clsx'

interface PlanCardProps {
    name: string
    details: PlanDetails
    result: CostResult
    rank: 'cheapest' | 'expensive' | 'middle'
    savings?: number
    coverageType: CoverageType
}

export const PlanCard: React.FC<PlanCardProps> = ({ name, details, result, rank, savings, coverageType }) => {
    const oopReached = result.medicalPaid >= details.outOfPocketMax

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)

    const formatCoverage = (type: string) => {
        switch (type) {
            case 'EMPLOYEE_ONLY': return 'Employee Only'
            case 'EMPLOYEE_PLUS_ONE': return 'Employee + 1'
            case 'FAMILY_PLUS_CHILD': return 'Family + 1 Child'
            default: return type
        }
    }

    const bestCase = details.annualPremium
    const worstCase = details.annualPremium + details.outOfPocketMax

    return (
        <div className={clsx('plan-card', rank, { 'oop-max-reached': oopReached && rank !== 'cheapest' })}>
            <div className="plan-header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    {rank === 'cheapest' && <div className="badge badge-success" style={{ margin: 0 }}>Best Value</div>}
                    {rank === 'expensive' && <div className="badge badge-danger" style={{ margin: 0 }}>Most Expensive</div>}
                    {oopReached && <div className="badge badge-danger" style={{ margin: 0 }}>OOP MAX REACHED</div>}
                </div>

                <h2 className="plan-name">{name}</h2>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    {formatCoverage(coverageType)}
                </div>
                <div className="plan-premium">Premium: {formatCurrency(details.annualPremium)} / yr</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
                    Out-of-Pocket Max: {formatCurrency(details.outOfPocketMax)} / yr
                </div>
            </div>

            <div className="cost-details">
                <div className="cost-row">
                    <span>Deductible Paid:</span>
                    <span>{formatCurrency(result.deductiblePaid)}</span>
                </div>
                <div className="cost-row">
                    <span>Coinsurance:</span>
                    <span>{formatCurrency(result.coinsurancePaid)}</span>
                </div>

                <ProgressBar
                    current={result.medicalPaid}
                    max={details.outOfPocketMax}
                    label="Out-of-Pocket Progress"
                />

                <div className="cost-row">
                    <span>Out of Pocket Max:</span>
                    <span>{formatCurrency(result.medicalPaid)}</span>
                </div>
                <div className="cost-row">
                    <span>Annual Premium:</span>
                    <span>{formatCurrency(result.annualPremium)}</span>
                </div>

                <div className={clsx("cost-row total", { "highlight": oopReached })}>
                    <span>TOTAL COST:</span>
                    <span>{formatCurrency(result.totalCost)}</span>
                </div>

                {rank === 'cheapest' && savings && savings > 0 && (
                    <div style={{ color: 'var(--success-color)', fontSize: '0.9rem', textAlign: 'right', marginTop: '0.5rem', fontWeight: 600 }}>
                        Save {formatCurrency(savings)}
                    </div>
                )}
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <p style={{ margin: '0.25rem 0' }}><strong>Best Case:</strong> {formatCurrency(bestCase)}</p>
                <p style={{ margin: '0.25rem 0' }}><strong>Worst Case:</strong> {formatCurrency(worstCase)}</p>
            </div>
        </div>
    )
}
