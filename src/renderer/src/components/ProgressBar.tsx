import React from 'react'
import clsx from 'clsx'

interface ProgressBarProps {
    current: number
    max: number
    label?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, max, label }) => {
    const percentage = Math.min((current / max) * 100, 100)

    let colorClass = 'bg-blue-500' // Using CSS variables instead: var(--primary-color)
    if (percentage >= 100) colorClass = 'bg-danger'
    else if (percentage >= 50) colorClass = 'bg-warning'
    else colorClass = 'bg-primary'

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)

    return (
        <div className="progress-container">
            {label && (
                <div className="progress-header">
                    <span className="progress-label">{label}</span>
                    <span className="progress-value">
                        {formatCurrency(current)} / {formatCurrency(max)}
                    </span>
                </div>
            )}
            <div className="progress-track">
                <div
                    className={clsx('progress-fill', colorClass)}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}
