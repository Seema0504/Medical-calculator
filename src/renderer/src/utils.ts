import { PLAN_CONFIG, CoverageType, PlanIdentifier } from './constants'

export interface CostResult {
    deductiblePaid: number
    coinsurancePaid: number
    medicalPaid: number
    annualPremium: number
    totalCost: number
}

export function calculatePlanCost(
    billAmount: number,
    planId: PlanIdentifier['id'],
    coverageType: CoverageType,
    deductibleMet: boolean = false
): CostResult {
    const plan = PLAN_CONFIG[planId][coverageType]

    // If deductible is already met, the amount we still need to pay towards deductible is 0.
    // Otherwise, it's the full deductible amount.
    const remainingDeductibleToPay = deductibleMet ? 0 : plan.deductible

    // Amount of the bill that goes towards the deductible
    const deductiblePayment = Math.min(billAmount, remainingDeductibleToPay)

    // Remaining bill after deductible
    const remainingBill = billAmount - deductiblePayment

    // Coinsurance payment
    const coinsurancePayment = remainingBill * plan.coinsurance

    // Total medical paid by employee (before OOP max cap)
    let totalMedicalPaid = deductiblePayment + coinsurancePayment

    // Cap at Out-of-Pocket Max
    const effectiveOOPMax = deductibleMet
        ? Math.max(0, plan.outOfPocketMax - plan.deductible)
        : plan.outOfPocketMax

    totalMedicalPaid = Math.min(totalMedicalPaid, effectiveOOPMax)

    return {
        deductiblePaid: deductiblePayment,
        coinsurancePaid: coinsurancePayment,
        medicalPaid: totalMedicalPaid,
        annualPremium: plan.annualPremium,
        totalCost: totalMedicalPaid + plan.annualPremium
    }
}
