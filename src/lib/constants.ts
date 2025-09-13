// Constantes para o sistema de intermediação de crédito angolano

// Taxas e limites do sistema bancário angolano
export const BANKING_CONSTANTS = {
  // Taxas de referência do BNA
  TAXA_BNA: 20.0, // Taxa de referência do Banco Nacional de Angola
  
  // Limites de crédito por tipo
  CREDIT_LIMITS: {
    PERSONAL: {
      MIN: 50000, // 50 mil AOA
      MAX: 10000000, // 10 milhões AOA
      MAX_TERM: 84 // 7 anos
    },
    MORTGAGE: {
      MIN: 1000000, // 1 milhão AOA
      MAX: 100000000, // 100 milhões AOA
      MAX_TERM: 360, // 30 anos
      MIN_DOWN_PAYMENT: 0.20 // 20% entrada mínima
    },
    BUSINESS: {
      MIN: 500000, // 500 mil AOA
      MAX: 500000000, // 500 milhões AOA
      MAX_TERM: 240 // 20 anos
    },
    VEHICLE: {
      MIN: 1000000, // 1 milhão AOA
      MAX: 50000000, // 50 milhões AOA
      MAX_TERM: 96 // 8 anos
    }
  },
  
  // Ratios de conformidade BNA
  COMPLIANCE_RATIOS: {
    MAX_DEBT_TO_INCOME: 0.40, // 40% máximo
    MAX_LOAN_TO_VALUE: 0.80, // 80% máximo para habitação
    MIN_CREDIT_SCORE: 500
  }
}

// Sistema tributário angolano
export const TAX_SYSTEM = {
  // IRT - Imposto sobre Rendimento do Trabalho
  IRT_BRACKETS: [
    { min: 0, max: 70000, rate: 0 },
    { min: 70001, max: 100000, rate: 0.10 },
    { min: 100001, max: 150000, rate: 0.13 },
    { min: 150001, max: 200000, rate: 0.16 },
    { min: 200001, max: 300000, rate: 0.18 },
    { min: 300001, max: 500000, rate: 0.19 },
    { min: 500001, max: Infinity, rate: 0.20 }
  ],
  
  // IVA - Imposto sobre Valor Acrescentado
  IVA: {
    GENERAL_RATE: 0.14, // 14%
    REDUCED_RATE: 0.05, // 5% para bens essenciais
    EXEMPT_RATE: 0 // Isento para alguns serviços
  },
  
  // IS - Imposto sobre Sociedades
  IS: {
    GENERAL_RATE: 0.25, // 25%
    SMALL_BUSINESS_RATE: 0.20, // 20% para pequenas empresas
    THRESHOLD: 50000000 // Limite para pequenas empresas
  },
  
  // Benefícios fiscais
  TAX_BENEFITS: {
    MORTGAGE_DEDUCTION: 0.20, // 20% dedução no IRT
    EDUCATION_DEDUCTION: 0.15, // 15% dedução para educação
    HEALTH_DEDUCTION: 0.15 // 15% dedução para saúde
  }
}

// Bancos parceiros e seus produtos
export const PARTNER_BANKS = {
  BFA: {
    name: 'Banco de Fomento Angola',
    code: 'BFA',
    api_endpoint: '/api/banks/bfa',
    products: ['mortgage', 'personal', 'business'],
    base_rates: {
      mortgage: 12.5,
      personal: 18.0,
      business: 15.8
    }
  },
  BAI: {
    name: 'Banco Angolano de Investimentos',
    code: 'BAI',
    api_endpoint: '/api/banks/bai',
    products: ['mortgage', 'personal', 'business', 'vehicle'],
    base_rates: {
      mortgage: 13.2,
      personal: 19.5,
      business: 16.2,
      vehicle: 17.8
    }
  },
  BIC: {
    name: 'Banco BIC',
    code: 'BIC',
    api_endpoint: '/api/banks/bic',
    products: ['personal', 'business', 'vehicle'],
    base_rates: {
      personal: 18.2,
      business: 15.5,
      vehicle: 16.9
    }
  },
  MILLENNIUM: {
    name: 'Banco Millennium Angola',
    code: 'MILLENNIUM',
    api_endpoint: '/api/banks/millennium',
    products: ['mortgage', 'personal', 'business'],
    base_rates: {
      mortgage: 12.8,
      personal: 17.5,
      business: 15.2
    }
  }
}

// Documentos necessários por tipo de cliente
export const REQUIRED_DOCUMENTS = {
  PF: [
    {
      type: 'bi',
      name: 'Bilhete de Identidade',
      required: true,
      description: 'Documento de identificação válido'
    },
    {
      type: 'nif',
      name: 'Cartão de Contribuinte (NIF)',
      required: true,
      description: 'Número de Identificação Fiscal'
    },
    {
      type: 'income_proof',
      name: 'Comprovativo de Rendimento',
      required: true,
      description: 'Declaração de salário ou recibos'
    },
    {
      type: 'bank_statement',
      name: 'Extracto Bancário',
      required: true,
      description: 'Últimos 3 meses de movimentação'
    },
    {
      type: 'address_proof',
      name: 'Comprovativo de Residência',
      required: true,
      description: 'Conta de água, luz ou telefone'
    }
  ],
  PJ: [
    {
      type: 'commercial_certificate',
      name: 'Certidão Comercial',
      required: true,
      description: 'Certidão do registo comercial'
    },
    {
      type: 'nif_empresarial',
      name: 'NIF Empresarial',
      required: true,
      description: 'Cartão de contribuinte da empresa'
    },
    {
      type: 'balance_sheet',
      name: 'Balanço e Demonstrações',
      required: true,
      description: 'Últimos 2 anos auditados'
    },
    {
      type: 'iva_declaration',
      name: 'Declaração de IVA',
      required: true,
      description: 'Últimos 12 meses'
    },
    {
      type: 'company_statutes',
      name: 'Estatutos da Empresa',
      required: true,
      description: 'Estatutos atualizados'
    }
  ]
}

// Critérios de análise de risco
export const RISK_CRITERIA = {
  CREDIT_SCORE_WEIGHTS: {
    PAYMENT_HISTORY: 0.35, // 35%
    DEBT_TO_INCOME: 0.30, // 30%
    CREDIT_UTILIZATION: 0.15, // 15%
    CREDIT_HISTORY_LENGTH: 0.10, // 10%
    CREDIT_MIX: 0.10 // 10%
  },
  
  RISK_LEVELS: {
    LOW: { min: 700, max: 850, color: 'green' },
    MEDIUM: { min: 600, max: 699, color: 'yellow' },
    HIGH: { min: 300, max: 599, color: 'red' }
  },
  
  INDUSTRY_RISK_MULTIPLIERS: {
    'technology': 0.8,
    'healthcare': 0.9,
    'education': 0.9,
    'retail': 1.0,
    'construction': 1.2,
    'hospitality': 1.3,
    'oil_gas': 1.1,
    'agriculture': 1.1
  }
}

// Configurações de conformidade regulatória
export const COMPLIANCE_CONFIG = {
  BNA_REQUIREMENTS: {
    MIN_CAPITAL_RATIO: 0.10, // 10%
    MAX_SINGLE_EXPOSURE: 0.25, // 25%
    LIQUIDITY_RATIO: 0.15, // 15%
    PROVISIONING_RATES: {
      NORMAL: 0.01, // 1%
      WATCH: 0.05, // 5%
      SUBSTANDARD: 0.20, // 20%
      DOUBTFUL: 0.50, // 50%
      LOSS: 1.00 // 100%
    }
  },
  
  AGT_REQUIREMENTS: {
    TAX_CLEARANCE_VALIDITY: 365, // dias
    MANDATORY_DECLARATIONS: ['IRT', 'IVA', 'IS'],
    PENALTY_RATES: {
      LATE_PAYMENT: 0.02, // 2% ao mês
      NON_DECLARATION: 0.05 // 5% do valor devido
    }
  },
  
  KYC_LEVELS: {
    BASIC: {
      max_amount: 1000000, // 1M AOA
      documents: ['bi', 'address_proof']
    },
    ENHANCED: {
      max_amount: 10000000, // 10M AOA
      documents: ['bi', 'nif', 'income_proof', 'bank_statement']
    },
    FULL: {
      max_amount: Infinity,
      documents: ['bi', 'nif', 'income_proof', 'bank_statement', 'address_proof', 'references']
    }
  }
}

// Configurações de IA e análise
export const AI_CONFIG = {
  ANALYSIS_MODELS: {
    CREDIT_SCORING: 'credit-score-v2',
    FRAUD_DETECTION: 'fraud-detect-v1',
    DOCUMENT_OCR: 'ocr-angola-v1',
    LEGAL_ANALYSIS: 'legal-contract-v1'
  },
  
  CONFIDENCE_THRESHOLDS: {
    HIGH: 0.85,
    MEDIUM: 0.70,
    LOW: 0.50
  },
  
  PROCESSING_TIMEOUTS: {
    OCR: 30000, // 30 segundos
    ANALYSIS: 60000, // 1 minuto
    LEGAL_REVIEW: 120000 // 2 minutos
  }
}

// Mensagens e textos do sistema
export const SYSTEM_MESSAGES = {
  ERRORS: {
    INVALID_DOCUMENT: 'Documento inválido ou não reconhecido',
    INSUFFICIENT_INCOME: 'Rendimento insuficiente para o valor solicitado',
    HIGH_RISK_CLIENT: 'Cliente apresenta alto risco de crédito',
    COMPLIANCE_FAILURE: 'Falha na verificação de conformidade regulatória'
  },
  
  SUCCESS: {
    DOCUMENT_VERIFIED: 'Documento verificado com sucesso',
    APPLICATION_APPROVED: 'Pedido de crédito aprovado',
    COMPLIANCE_PASSED: 'Verificação de conformidade aprovada'
  },
  
  WARNINGS: {
    DOCUMENT_EXPIRING: 'Documento próximo do vencimento',
    HIGH_DEBT_RATIO: 'Relação dívida/rendimento elevada',
    MISSING_DOCUMENTS: 'Documentos em falta para análise completa'
  }
}

// URLs e endpoints de APIs externas
export const EXTERNAL_APIS = {
  BNA: {
    base_url: 'https://api.bna.ao',
    endpoints: {
      exchange_rates: '/rates',
      compliance_check: '/compliance',
      bank_registry: '/banks'
    }
  },
  
  AGT: {
    base_url: 'https://portal.agt.gov.ao/api',
    endpoints: {
      tax_status: '/taxpayer/status',
      declarations: '/declarations',
      certificates: '/certificates'
    }
  },
  
  CREDIT_BUREAU: {
    base_url: 'https://api.creditbureau.ao',
    endpoints: {
      credit_report: '/report',
      score: '/score',
      history: '/history'
    }
  }
}