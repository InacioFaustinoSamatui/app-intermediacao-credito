import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utilitários para formatação de valores angolanos
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(number: number): string {
  return new Intl.NumberFormat('pt-AO').format(number)
}

// Utilitários para cálculos financeiros
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  termInMonths: number
): number {
  const monthlyRate = annualRate / 100 / 12
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, termInMonths)) / 
                  (Math.pow(1 + monthlyRate, termInMonths) - 1)
  return payment
}

export function calculateTotalInterest(
  principal: number,
  annualRate: number,
  termInMonths: number
): number {
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, termInMonths)
  return (monthlyPayment * termInMonths) - principal
}

// Cálculos de impostos angolanos
export function calculateIRT(monthlyIncome: number): number {
  // Tabela simplificada do IRT em Angola
  if (monthlyIncome <= 70000) return 0
  if (monthlyIncome <= 100000) return monthlyIncome * 0.10
  if (monthlyIncome <= 150000) return monthlyIncome * 0.13
  if (monthlyIncome <= 200000) return monthlyIncome * 0.16
  if (monthlyIncome <= 300000) return monthlyIncome * 0.18
  if (monthlyIncome <= 500000) return monthlyIncome * 0.19
  return monthlyIncome * 0.20
}

export function calculateIVA(amount: number, rate: number = 14): number {
  return amount * (rate / 100)
}

export function calculateIS(profit: number): number {
  // Imposto sobre Sociedades - 25% sobre lucros
  return profit * 0.25
}

// Utilitários para análise de risco
export function calculateCreditScore(
  income: number,
  expenses: number,
  existingDebt: number,
  paymentHistory: number // 0-100
): number {
  const debtToIncomeRatio = existingDebt / income
  const expenseRatio = expenses / income
  
  let score = 300 // Score base
  
  // Histórico de pagamentos (40% do score)
  score += paymentHistory * 3.5
  
  // Relação dívida/renda (30% do score)
  if (debtToIncomeRatio < 0.3) score += 150
  else if (debtToIncomeRatio < 0.5) score += 100
  else if (debtToIncomeRatio < 0.7) score += 50
  
  // Relação despesas/renda (20% do score)
  if (expenseRatio < 0.5) score += 100
  else if (expenseRatio < 0.7) score += 70
  else if (expenseRatio < 0.9) score += 40
  
  // Renda absoluta (10% do score)
  if (income > 500000) score += 50
  else if (income > 200000) score += 30
  else if (income > 100000) score += 20
  
  return Math.min(Math.max(score, 300), 850)
}

export function getRiskLevel(creditScore: number): 'low' | 'medium' | 'high' {
  if (creditScore >= 700) return 'low'
  if (creditScore >= 600) return 'medium'
  return 'high'
}

// Utilitários para validação de documentos angolanos
export function validateBI(bi: string): boolean {
  // Validação básica do formato do BI angolano
  const biRegex = /^\d{9}[A-Z]{2}\d{3}$/
  return biRegex.test(bi)
}

export function validateNIF(nif: string): boolean {
  // Validação básica do NIF angolano
  const nifRegex = /^\d{9}$/
  return nifRegex.test(nif)
}

// Utilitários para datas
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-AO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}

export function addMonths(date: Date, months: number): Date {
  const result = new Date(date)
  result.setMonth(result.getMonth() + months)
  return result
}

// Utilitários para análise de conformidade
export function checkBNACompliance(
  loanAmount: number,
  clientIncome: number,
  loanToValueRatio: number
): { compliant: boolean; issues: string[] } {
  const issues: string[] = []
  
  // Verificações básicas do BNA
  if (loanToValueRatio > 0.8) {
    issues.push('Relação empréstimo/valor excede 80%')
  }
  
  const monthlyPayment = calculateMonthlyPayment(loanAmount, 15, 240) // Exemplo
  const paymentToIncomeRatio = monthlyPayment / clientIncome
  
  if (paymentToIncomeRatio > 0.4) {
    issues.push('Relação prestação/rendimento excede 40%')
  }
  
  return {
    compliant: issues.length === 0,
    issues
  }
}

// Utilitários para OCR e processamento de documentos
export function extractTextFromDocument(file: File): Promise<string> {
  // Placeholder para integração com serviço de OCR
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Texto extraído do documento via OCR')
    }, 2000)
  })
}

// Utilitários para integração com APIs bancárias
export function formatBankAPIRequest(clientData: any, productId: string) {
  return {
    client: {
      name: clientData.name,
      document: clientData.bi || clientData.nifEmpresarial,
      income: clientData.monthlyIncome || clientData.faturamentoAnual,
      type: clientData.type
    },
    product: productId,
    timestamp: new Date().toISOString()
  }
}

// Utilitários para relatórios
export function generateReportData(clients: any[], applications: any[]) {
  const totalClients = clients.length
  const approvedApplications = applications.filter(app => app.status === 'approved').length
  const approvalRate = (approvedApplications / applications.length) * 100
  
  return {
    totalClients,
    totalApplications: applications.length,
    approvedApplications,
    approvalRate: Math.round(approvalRate * 100) / 100,
    averageAmount: applications.reduce((sum, app) => sum + app.requestedAmount, 0) / applications.length
  }
}

// Utilitários para notificações e alertas
export function createComplianceAlert(type: string, message: string, severity: 'low' | 'medium' | 'high') {
  return {
    id: crypto.randomUUID(),
    type,
    message,
    severity,
    timestamp: new Date(),
    read: false
  }
}