import React from 'react'
import { CoverageType } from '../constants'

interface CoverageSelectorProps {
    selected: CoverageType
    onChange: (type: CoverageType) => void
}

export const CoverageSelector: React.FC<CoverageSelectorProps> = ({ selected, onChange }) => {
    return (
        <div className="coverage-selector">
            <h3>Coverage Type</h3>
            <div className="radio-group">
                <label>
                    <input
                        type="radio"
                        name="coverage"
                        value="EMPLOYEE_ONLY"
                        checked={selected === 'EMPLOYEE_ONLY'}
                        onChange={() => onChange('EMPLOYEE_ONLY')}
                    />
                    Employee Only
                </label>
                <label>
                    <input
                        type="radio"
                        name="coverage"
                        value="EMPLOYEE_PLUS_ONE"
                        checked={selected === 'EMPLOYEE_PLUS_ONE'}
                        onChange={() => onChange('EMPLOYEE_PLUS_ONE')}
                    />
                    Employee + 1
                </label>
                <label>
                    <input
                        type="radio"
                        name="coverage"
                        value="FAMILY_PLUS_CHILD"
                        checked={selected === 'FAMILY_PLUS_CHILD'}
                        onChange={() => onChange('FAMILY_PLUS_CHILD')}
                    />
                    Family + 1 Child
                </label>
            </div>
        </div>
    )
}
