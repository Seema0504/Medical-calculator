export type CoverageType = 'EMPLOYEE_ONLY' | 'EMPLOYEE_PLUS_ONE' | 'FAMILY_PLUS_CHILD'

export interface PlanDetails {
    deductible: number
    coinsurance: number
    outOfPocketMax: number
    annualPremium: number
}

export interface PlanIdentifier {
    id: keyof typeof PLAN_CONFIG
    name: string
}

export const PLAN_CONFIG = {
    CORE: {
        EMPLOYEE_ONLY: {
            deductible: 7200,
            outOfPocketMax: 7200,
            coinsurance: 0,
            annualPremium: 702
        },
        EMPLOYEE_PLUS_ONE: {
            deductible: 14400,
            outOfPocketMax: 14400,
            coinsurance: 0,
            annualPremium: 1560
        },
        FAMILY_PLUS_CHILD: {
            deductible: 14400,
            outOfPocketMax: 14400,
            coinsurance: 0,
            annualPremium: 2470
        }
    },
    CDHP: {
        EMPLOYEE_ONLY: {
            deductible: 2000,
            outOfPocketMax: 4500,
            coinsurance: 0.20,
            annualPremium: 2028
        },
        EMPLOYEE_PLUS_ONE: {
            deductible: 4000,
            outOfPocketMax: 9000,
            coinsurance: 0.20,
            annualPremium: 4342
        },
        FAMILY_PLUS_CHILD: {
            deductible: 4000,
            outOfPocketMax: 9000,
            coinsurance: 0.20,
            annualPremium: 7410
        }
    },
}

export const PLANS: PlanIdentifier[] = [
    { id: 'CORE', name: 'CORE' },
    { id: 'CDHP', name: 'CDHP Premium' }
]
