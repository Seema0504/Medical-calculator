import React from 'react'

interface BillInputProps {
    amount: number
    setAmount: (amount: number) => void
    isNewYear: boolean
    setIsNewYear: (isNew: boolean) => void
    onReset: () => void
}

export const BillInput: React.FC<BillInputProps> = ({
    amount,
    setAmount,
    isNewYear,
    setIsNewYear,
    onReset
}) => {
    return (
        <div className="controls">
            <div className="input-group">
                <label htmlFor="bill-amount">Medical Bill Amount ($)</label>
                <input
                    id="bill-amount"
                    type="number"
                    min="0"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="0.00"
                />
                <input
                    type="range"
                    min="0"
                    max="100000"
                    step="100"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    aria-label="Medical Bill Amount"
                    style={{
                        background: `linear-gradient(to right, 
                            ${amount > 60000 ? '#ef4444' : amount > 30000 ? '#f59e0b' : '#3b82f6'} 0%, 
                            ${amount > 60000 ? '#ef4444' : amount > 30000 ? '#f59e0b' : '#3b82f6'} ${(amount / 100000) * 100}%, 
                            #e5e7eb ${(amount / 100000) * 100}%, 
                            #e5e7eb 100%)`
                    }}
                />
            </div>

            <div className="input-group" style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center', gap: '1.5rem' }}>
                <label className="toggle-label" style={{ marginBottom: 0 }}>
                    <input
                        type="checkbox"
                        checked={isNewYear}
                        onChange={(e) => setIsNewYear(e.target.checked)}
                    />
                    New Year – Deductible Not Met Yet
                </label>

                <button
                    onClick={onReset}
                    style={{
                        padding: '0.4rem 1rem',
                        backgroundColor: '#e5e7eb',
                        color: '#374151',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 600
                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    )
}
