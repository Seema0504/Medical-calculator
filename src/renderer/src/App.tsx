import React, { useState, useMemo } from 'react'
import { PLANS, PLAN_CONFIG, CoverageType } from './constants'
import { calculatePlanCost } from './utils'
import { BillInput } from './components/BillInput'
import { PlanCard } from './components/PlanCard'
import { ComparisonSummary } from './components/ComparisonSummary'
import { CoverageSelector } from './components/CoverageSelector'

function App() {
    const [billAmount, setBillAmount] = useState<number>(0)
    const [isNewYear, setIsNewYear] = useState<boolean>(true)
    const [coverageType, setCoverageType] = useState<CoverageType>('EMPLOYEE_ONLY')

    const results = useMemo(() => {
        return PLANS.map((planInfo) => {
            const result = calculatePlanCost(billAmount, planInfo.id, coverageType, !isNewYear)
            // Retrieve correct details for "Best/Worst Case" display in PlanCard
            const details = PLAN_CONFIG[planInfo.id][coverageType]
            return {
                id: planInfo.id,
                name: planInfo.name,
                details,
                result
            }
        })
    }, [billAmount, isNewYear, coverageType])

    // Find min and max cost
    const costs = results.map(r => r.result.totalCost)
    const minCost = Math.min(...costs)
    const maxCost = Math.max(...costs)

    return (
        <div className="container">
            <h1>Health Plan Cost Comparator</h1>

            <CoverageSelector selected={coverageType} onChange={setCoverageType} />

            <BillInput
                amount={billAmount}
                setAmount={setBillAmount}
                isNewYear={isNewYear}
                setIsNewYear={setIsNewYear}
                onReset={() => {
                    setBillAmount(0)
                    setIsNewYear(true)
                    setCoverageType('EMPLOYEE_ONLY')
                }}
            />



            <div className="results-grid">
                {results.map(({ id, name, details, result }) => {
                    const isCheapest = result.totalCost === minCost
                    const savings = maxCost - result.totalCost

                    let rank: 'cheapest' | 'expensive' | 'middle' = 'middle'
                    if (isCheapest) rank = 'cheapest'
                    // With only 2 plans, we don't flag "Most Expensive" anymore

                    return (
                        <PlanCard
                            key={id}
                            name={name}
                            details={details}
                            result={result}
                            rank={rank}
                            savings={savings}
                            coverageType={coverageType}
                        />
                    )
                })}
            </div>

            <ComparisonSummary results={results} />
        </div>
    )
}

export default App
