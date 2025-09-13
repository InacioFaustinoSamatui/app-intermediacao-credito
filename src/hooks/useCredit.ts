import { useState, useEffect } from 'react'
import { ClientProfile, AIAnalysisResult, BankProduct, TaxCalculation } from '@/lib/types'
import { calculateCreditScore, getRiskLevel, calculateIRT } from '@/lib/utils'

// Hook para gerenciar perfis de clientes
export function useClientProfiles() {
  const [clients, setClients] = useState<ClientProfile[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addClient = async (clientData: Partial<ClientProfile>) => {
    setLoading(true)
    try {
      const newClient: ClientProfile = {
        id: crypto.randomUUID(),
        name: clientData.name || '',
        type: clientData.type || 'PF',
        status: 'pending',
        creditScore: 0,
        riskLevel: 'medium',
        documents: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        ...clientData
      }
      
      setClients(prev => [...prev, newClient])
      return newClient
    } catch (err) {
      setError('Erro ao adicionar cliente')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateClient = async (id: string, updates: Partial<ClientProfile>) => {
    setLoading(true)
    try {
      setClients(prev => prev.map(client => 
        client.id === id 
          ? { ...client, ...updates, updatedAt: new Date() }
          : client
      ))
    } catch (err) {
      setError('Erro ao atualizar cliente')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteClient = async (id: string) => {
    setLoading(true)
    try {
      setClients(prev => prev.filter(client => client.id !== id))
    } catch (err) {
      setError('Erro ao remover cliente')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    clients,
    loading,
    error,
    addClient,
    updateClient,
    deleteClient
  }
}

// Hook para análise com IA
export function useAIAnalysis() {
  const [analysisResults, setAnalysisResults] = useState<AIAnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const performAnalysis = async (clientId: string, clientData: any) => {
    setLoading(true)
    setError(null)
    
    try {
      // Simulação de análise com IA
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const financialScore = calculateCreditScore(
        clientData.monthlyIncome || 200000,
        clientData.monthlyExpenses || 100000,
        clientData.existingDebt || 50000,
        Math.random() * 100
      )
      
      const result: AIAnalysisResult = {
        clientId,
        financialScore,
        legalCompliance: Math.floor(Math.random() * 30) + 70,
        taxOptimization: Math.floor(Math.random() * 25) + 75,
        riskAssessment: getRiskLevel(financialScore),
        recommendations: [
          {
            id: crypto.randomUUID(),
            type: 'product',
            title: 'Crédito Habitação Recomendado',
            description: 'Baseado no seu perfil, recomendamos o produto de crédito habitação do BFA',
            priority: 'high',
            potentialSavings: 50000
          },
          {
            id: crypto.randomUUID(),
            type: 'tax',
            title: 'Otimização Fiscal',
            description: 'Possível economia de 15% no IRT através de deduções',
            priority: 'medium',
            potentialSavings: 30000
          }
        ],
        analysisDate: new Date()
      }
      
      setAnalysisResults(result)
      return result
    } catch (err) {
      setError('Erro na análise com IA')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const clearAnalysis = () => {
    setAnalysisResults(null)
    setError(null)
  }

  return {
    analysisResults,
    loading,
    error,
    performAnalysis,
    clearAnalysis
  }
}

// Hook para produtos bancários
export function useBankProducts() {
  const [products, setProducts] = useState<BankProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Carregar produtos bancários iniciais
    const initialProducts: BankProduct[] = [
      {
        id: '1',
        bank: 'Banco de Fomento Angola',
        product: 'Crédito Habitação',
        type: 'mortgage',
        rate: 12.5,
        maxAmount: 50000000,
        minAmount: 1000000,
        term: 240,
        requirements: ['Entrada 20%', 'Rendimento 3x prestação'],
        taxImpact: 2.1,
        fees: [
          { name: 'Comissão de Abertura', amount: 1.5, type: 'percentage', description: '1.5% do valor' },
          { name: 'Seguro Vida', amount: 0.8, type: 'percentage', description: '0.8% anual' }
        ],
        isActive: true
      },
      {
        id: '2',
        bank: 'BAI',
        product: 'Crédito Empresarial',
        type: 'business',
        rate: 15.8,
        maxAmount: 100000000,
        minAmount: 500000,
        term: 120,
        requirements: ['Garantias', 'Balanço positivo'],
        taxImpact: 3.2,
        fees: [
          { name: 'Comissão de Análise', amount: 50000, type: 'fixed', description: 'Taxa fixa' },
          { name: 'Comissão de Gestão', amount: 0.5, type: 'percentage', description: '0.5% anual' }
        ],
        isActive: true
      },
      {
        id: '3',
        bank: 'BIC',
        product: 'Crédito Pessoal',
        type: 'personal',
        rate: 18.2,
        maxAmount: 5000000,
        minAmount: 50000,
        term: 60,
        requirements: ['Comprovativo rendimento', 'Fiador'],
        taxImpact: 1.8,
        fees: [
          { name: 'Comissão de Abertura', amount: 2.0, type: 'percentage', description: '2% do valor' }
        ],
        isActive: true
      }
    ]
    
    setProducts(initialProducts)
  }, [])

  const getRecommendedProducts = (clientProfile: ClientProfile, loanAmount: number) => {
    return products.filter(product => {
      if (loanAmount < product.minAmount || loanAmount > product.maxAmount) {
        return false
      }
      
      // Lógica de recomendação baseada no perfil
      if (clientProfile.type === 'PF' && product.type === 'business') {
        return false
      }
      
      if (clientProfile.riskLevel === 'high' && product.rate < 15) {
        return false
      }
      
      return product.isActive
    }).sort((a, b) => a.rate - b.rate) // Ordenar por taxa
  }

  return {
    products,
    loading,
    error,
    getRecommendedProducts
  }
}

// Hook para cálculos fiscais
export function useTaxCalculations() {
  const [calculations, setCalculations] = useState<TaxCalculation[]>([])
  const [loading, setLoading] = useState(false)

  const calculateTaxImpact = async (
    clientId: string,
    loanAmount: number,
    monthlyIncome: number
  ): Promise<TaxCalculation> => {
    setLoading(true)
    
    try {
      const irt = calculateIRT(monthlyIncome)
      const iva = loanAmount * 0.14 // 14% IVA sobre serviços financeiros
      
      const calculation: TaxCalculation = {
        clientId,
        loanAmount,
        monthlyIncome,
        irt,
        iva,
        totalTaxImpact: irt + iva,
        potentialSavings: irt * 0.15, // 15% de economia potencial
        calculationDate: new Date()
      }
      
      setCalculations(prev => [...prev, calculation])
      return calculation
    } finally {
      setLoading(false)
    }
  }

  const getCalculationHistory = (clientId: string) => {
    return calculations.filter(calc => calc.clientId === clientId)
  }

  return {
    calculations,
    loading,
    calculateTaxImpact,
    getCalculationHistory
  }
}

// Hook para verificação de conformidade
export function useCompliance() {
  const [complianceStatus, setComplianceStatus] = useState({
    bna: false,
    agt: false,
    kyc: false,
    aml: false
  })
  const [loading, setLoading] = useState(false)

  const checkCompliance = async (clientData: any) => {
    setLoading(true)
    
    try {
      // Simulação de verificações de conformidade
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const status = {
        bna: Math.random() > 0.1, // 90% de aprovação BNA
        agt: Math.random() > 0.05, // 95% de aprovação AGT
        kyc: Math.random() > 0.02, // 98% de aprovação KYC
        aml: Math.random() > 0.03  // 97% de aprovação AML
      }
      
      setComplianceStatus(status)
      return status
    } finally {
      setLoading(false)
    }
  }

  const getComplianceScore = () => {
    const checks = Object.values(complianceStatus)
    const passed = checks.filter(Boolean).length
    return (passed / checks.length) * 100
  }

  return {
    complianceStatus,
    loading,
    checkCompliance,
    getComplianceScore
  }
}

// Hook para processamento de documentos
export function useDocumentProcessing() {
  const [processing, setProcessing] = useState(false)
  const [extractedData, setExtractedData] = useState<any>(null)

  const processDocument = async (file: File, documentType: string) => {
    setProcessing(true)
    
    try {
      // Simulação de OCR e processamento
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const mockData = {
        bi: {
          number: '123456789BA123',
          name: 'João Silva Santos',
          birthDate: '1985-03-15',
          issueDate: '2020-01-10',
          expiryDate: '2030-01-10'
        },
        nif: {
          number: '123456789',
          name: 'João Silva Santos',
          status: 'Ativo'
        },
        income_proof: {
          employer: 'Empresa ABC Lda',
          position: 'Gestor',
          monthlyIncome: 350000,
          issueDate: new Date().toISOString()
        }
      }
      
      setExtractedData(mockData[documentType as keyof typeof mockData] || null)
      return mockData[documentType as keyof typeof mockData]
    } finally {
      setProcessing(false)
    }
  }

  const clearExtractedData = () => {
    setExtractedData(null)
  }

  return {
    processing,
    extractedData,
    processDocument,
    clearExtractedData
  }
}