# Health Plan Cost Comparator - Project Report

## 1. Project Overview
The **Health Plan Cost Comparator** is a dual-platform application (Desktop & Web) designed to help employees make informed decisions about their health insurance options. It calculates and visualizes the total annual cost (Premiums + Out-of-Pocket costs) for different health plans based on anticipated medical expenses.

## 2. Technology Stack

### Core Frameworks
-   **React (v19.2+)**: Used for building the user interface with a component-based architecture.
-   **TypeScript (v5.9)**: Ensures type safety and code maintainability across the entire project.
-   **Vite (v7.3)**: High-performance build tool and development server for the web version.
-   **Electron (v39.2)**: Framework for wrapping the application as a native desktop executable (Windows/macOS/Linux).

### Key Libraries
-   **clsx**: Utility for constructing dynamic class names conditionally.
-   **Electron-Vite**: Optimized build tool specifically for Electron + React integration.

### Infrastructure & Deployment
-   **Git**: Version control system.
-   **Vercel** (Recommended): Platform for hosting the web version of the application.
-   **GitHub**: Source code repository hosting.

## 3. Key Functionality

### 3.1 Cost Calculation Engine
The application processes three primary health plans:
1.  **CORE**: Low premium, high deductible.
2.  **CDHP Premium** (Consumer Driven Health Plan): Balanced structure with HSA potential.
3.  **PPO Premium**: Higher premium, lower deductible/OOP max.

**Calculation Logic:**
-   **Deductible Handling**: Calculates amount paid by user until deductible is met.
-   **Coinsurance**: Applies plan-specific percentages (e.g., 20%) after deductible.
-   **Out-of-Pocket (OOP) Max**: Caps the user's total medical spend at the plan's specific limit.
-   **Total Cost**: `Annual Premium + Medical Costs (Paid)`.

### 3.2 Interactive User Interface
-   **Coverage Selection**: Switch between *Employee Only*, *Employee + 1*, and *Family + 1 Child* tiers, automatically updating premiums and limits.
-   **Bill Simulator**:
    -   **Slider**: Drag-to-adjust medical bill input ($0 - $100,000) with touch-friendly mobile support.
    -   **Numeric Input**: Precise dollar amount entry.
-   **New Year Toggle**: Simulates costs for a fresh plan year (Deductible not met).

### 3.3 Visualization & Analytics
-   **Plan Cards**: Detailed breakdown of costs (Deductible, Coinsurance, Premium).
-   **Progress Bars**: Visual indicator of progress toward the OOP Max, color-coded (Blue -> Yellow -> Red).
-   **Badges & Highlights**:
    -   "Best Value" / "Most Expensive" indicators.
    -   "OOP MAX REACHED" warning when the limit is hit.
-   **Comparison Summary**: A dedicated section textually summarizing the cheapest option and potential savings.

### 3.4 Responsiveness
-   **Mobile-First Design**: Fully responsive layout that adapts to smartphones.
-   **Touch Enhancements**: Enhanced slider controls designed specifically for finger interaction on mobile devices.

## 4. Project Structure
-   `src/renderer`: Contains the React frontend logic.
    -   `components/`: Reusable UI elements (`PlanCard`, `BillInput`, `ProgressBar`).
    -   `constants.ts`: Configuration for Plan details (Premiums, Limits).
    -   `utils.ts`: Core calculation algorithms.
    -   `styles.css`: Global styling and responsive media queries.
-   `src/main`: Electron main process configuration.
-   `vite.config.ts`: Configuration for web builds.

## 5. Deployment
-   **Web**: Configured for standard static web hosting (Vercel/Netlify) via `npm run build:web`.
-   **Desktop**: Configured for Electron executables via `npm run build`.
