// Tipos para o sistema de intermediação de crédito

export interface ClientProfile {
  id: string
  name: string
  type: 'PF' | 'PJ' // Pessoa Física ou Jurídica
  status: 'pending' | 'verified' | 'rejected'
  creditScore: number
  riskLevel: 'low' | 'medium' | 'high'
  documents: string[]
  createdAt: Date
  updatedAt: Date
}

export interface PersonaFisica extends ClientProfile {
  type: 'PF'
  bi: string // Bilhete de Identidade
  nif: string // Número de Identificação Fiscal
  birthDate: Date
  address: string
  phone: string
  email: string
  monthlyIncome: number
  employmentStatus: 'employed' | 'self_employed' | 'unemployed' | 'retired'
  bankStatements: BankStatement[]
}

export interface PersonaJuridica extends ClientProfile {
  type: 'PJ'
  nifEmpresarial: string
  certidaoComercial: string
  razaoSocial: string
  dataConstituicao: Date
  capitalSocial: number
  setor: string
  numeroFuncionarios: number
  faturamentoAnual: number
  balanco: FinancialStatement[]
}

export interface BankStatement {
  id: string
  clientId: string
  month: string
  year: number
  balance: number
  transactions: Transaction[]
}

export interface Transaction {
  id: string
  date: Date
  description: string
  amount: number
  type: 'credit' | 'debit'
  category: string
}

export interface FinancialStatement {
  id: string
  companyId: string
  year: number
  revenue: number
  expenses: number
  profit: number
  assets: number
  liabilities: number
  equity: number
}

export interface BankProduct {
  id: string
  bank: string
  product: string
  type: 'personal' | 'mortgage' | 'business' | 'vehicle'
  rate: number // Taxa de juros anual
  maxAmount: number
  minAmount: number
  term: number // Prazo em meses
  requirements: string[]
  taxImpact: number // Impacto fiscal em %
  fees: ProductFee[]
  isActive: boolean
}

export interface ProductFee {
  name: string
  amount: number
  type: 'fixed' | 'percentage'
  description: string
}

export interface AIAnalysisResult {
  clientId: string
  financialScore: number
  legalCompliance: number
  taxOptimization: number
  riskAssessment: 'low' | 'medium' | 'high'
  recommendations: Recommendation[]
  analysisDate: Date
}

export interface Recommendation {
  id: string
  type: 'product' | 'tax' | 'legal' | 'financial'
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  potentialSavings?: number
  productId?: string
}

export interface LegalAnalysis {
  contractId: string
  clientId: string
  analysisDate: Date
  abusiveClauses: AbusiveClause[]
  complianceScore: number
  recommendations: string[]
  status: 'compliant' | 'needs_review' | 'non_compliant'
}

export interface AbusiveClause {
  id: string
  clause: string
  severity: 'low' | 'medium' | 'high'
  description: string
  suggestion: string
  legalReference: string
}

export interface TaxCalculation {
  clientId: string
  loanAmount: number
  monthlyIncome: number
  irt: number // Imposto sobre Rendimento do Trabalho
  iva: number // Imposto sobre Valor Acrescentado
  is?: number // Imposto sobre Sociedades (para PJ)
  totalTaxImpact: number
  potentialSavings: number
  calculationDate: Date
}

export interface KYCDocument {
  id: string
  clientId: string
  type: 'bi' | 'nif' | 'income_proof' | 'bank_statement' | 'commercial_certificate' | 'balance_sheet'
  fileName: string
  fileUrl: string
  status: 'pending' | 'verified' | 'rejected'
  verificationDate?: Date
  verificationNotes?: string
}

export interface ComplianceCheck {
  id: string
  clientId: string
  checkType: 'kyc' | 'aml' | 'bna' | 'agt'
  status: 'passed' | 'failed' | 'pending'
  score: number
  details: string
  checkDate: Date
  expiryDate?: Date
}

export interface CreditApplication {
  id: string
  clientId: string
  productId: string
  requestedAmount: number
  requestedTerm: number
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected'
  aiAnalysis?: AIAnalysisResult
  legalAnalysis?: LegalAnalysis
  taxCalculation?: TaxCalculation
  bankResponse?: BankResponse
  createdAt: Date
  updatedAt: Date
}

export interface BankResponse {
  bankId: string
  applicationId: string
  status: 'approved' | 'rejected' | 'counter_offer'
  approvedAmount?: number
  approvedRate?: number
  approvedTerm?: number
  conditions: string[]
  responseDate: Date
  validUntil: Date
}

export interface SystemMetrics {
  totalClients: number
  activeApplications: number
  approvalRate: number
  averageProcessingTime: number
  complianceScore: number
  totalVolumeProcessed: number
}

// Enums para melhor tipagem
export enum ClientType {
  PF = 'PF',
  PJ = 'PJ'
}

export enum DocumentType {
  BI = 'bi',
  NIF = 'nif',
  INCOME_PROOF = 'income_proof',
  BANK_STATEMENT = 'bank_statement',
  COMMERCIAL_CERTIFICATE = 'commercial_certificate',
  BALANCE_SHEET = 'balance_sheet'
}

export enum ApplicationStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}