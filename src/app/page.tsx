"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { 
  Building2, 
  User, 
  Shield, 
  TrendingUp, 
  FileText, 
  Calculator,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Banknote,
  Globe,
  Smartphone,
  Monitor,
  Brain,
  Scale,
  Receipt
} from 'lucide-react'

interface ClientProfile {
  id: string
  name: string
  type: 'PF' | 'PJ'
  status: 'pending' | 'verified' | 'rejected'
  creditScore: number
  riskLevel: 'low' | 'medium' | 'high'
  documents: string[]
}

interface BankProduct {
  id: string
  bank: string
  product: string
  rate: number
  maxAmount: number
  term: number
  requirements: string[]
  taxImpact: number
}

export default function CreditIntermediationApp() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [clients, setClients] = useState<ClientProfile[]>([
    {
      id: '1',
      name: 'João Silva',
      type: 'PF',
      status: 'verified',
      creditScore: 750,
      riskLevel: 'low',
      documents: ['BI', 'Comprovativo de Rendimento', 'Extracto Bancário']
    },
    {
      id: '2',
      name: 'Empresa ABC Lda',
      type: 'PJ',
      status: 'pending',
      creditScore: 680,
      riskLevel: 'medium',
      documents: ['Certidão Comercial', 'Balanço', 'IVA']
    }
  ])

  const [bankProducts] = useState<BankProduct[]>([
    {
      id: '1',
      bank: 'Banco de Fomento Angola',
      product: 'Crédito Habitação',
      rate: 12.5,
      maxAmount: 50000000,
      term: 240,
      requirements: ['Entrada 20%', 'Rendimento 3x prestação'],
      taxImpact: 2.1
    },
    {
      id: '2',
      bank: 'BAI',
      product: 'Crédito Empresarial',
      rate: 15.8,
      maxAmount: 100000000,
      term: 120,
      requirements: ['Garantias', 'Balanço positivo'],
      taxImpact: 3.2
    },
    {
      id: '3',
      bank: 'BIC',
      product: 'Crédito Pessoal',
      rate: 18.2,
      maxAmount: 5000000,
      term: 60,
      requirements: ['Comprovativo rendimento', 'Fiador'],
      taxImpact: 1.8
    }
  ])

  const [analysisResults, setAnalysisResults] = useState({
    financialScore: 0,
    legalCompliance: 0,
    taxOptimization: 0,
    riskAssessment: 'medium' as 'low' | 'medium' | 'high'
  })

  const performAIAnalysis = () => {
    // Simulação de análise com IA
    setTimeout(() => {
      setAnalysisResults({
        financialScore: Math.floor(Math.random() * 100) + 650,
        legalCompliance: Math.floor(Math.random() * 30) + 70,
        taxOptimization: Math.floor(Math.random() * 25) + 75,
        riskAssessment: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any
      })
    }, 2000)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'high': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-50'
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'rejected': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Crédito Inteligente Angola
                </h1>
                <p className="text-sm text-gray-500">
                  Intermediação de Crédito com IA
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Globe className="w-3 h-3 mr-1" />
                Web
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Smartphone className="w-3 h-3 mr-1" />
                Mobile
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                <Monitor className="w-3 h-3 mr-1" />
                Desktop
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="kyc" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">KYC/AML</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Análise IA</span>
            </TabsTrigger>
            <TabsTrigger value="legal" className="flex items-center space-x-2">
              <Scale className="w-4 h-4" />
              <span className="hidden sm:inline">Jurídico</span>
            </TabsTrigger>
            <TabsTrigger value="tax" className="flex items-center space-x-2">
              <Receipt className="w-4 h-4" />
              <span className="hidden sm:inline">Tributário</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center space-x-2">
              <Banknote className="w-4 h-4" />
              <span className="hidden sm:inline">Produtos</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Clientes Ativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,247</div>
                  <p className="text-blue-100 text-sm">+12% este mês</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Créditos Aprovados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">892</div>
                  <p className="text-green-100 text-sm">Taxa 71.5%</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Volume Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2.8B</div>
                  <p className="text-purple-100 text-sm">AOA processados</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Conformidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">98.2%</div>
                  <p className="text-orange-100 text-sm">BNA + AGT</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span>Análise de Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Taxa de Aprovação</span>
                      <span className="font-medium">71.5%</span>
                    </div>
                    <Progress value={71.5} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Conformidade Regulatória</span>
                      <span className="font-medium">98.2%</span>
                    </div>
                    <Progress value={98.2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Satisfação do Cliente</span>
                      <span className="font-medium">94.8%</span>
                    </div>
                    <Progress value={94.8} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Clientes Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clients.map((client) => (
                      <div key={client.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {client.type === 'PF' ? (
                            <User className="w-8 h-8 text-blue-600" />
                          ) : (
                            <Building2 className="w-8 h-8 text-purple-600" />
                          )}
                          <div>
                            <p className="font-medium text-gray-900">{client.name}</p>
                            <p className="text-sm text-gray-500">Score: {client.creditScore}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getRiskColor(client.riskLevel)}>
                            {client.riskLevel}
                          </Badge>
                          <Badge className={`ml-2 ${getStatusColor(client.status)}`}>
                            {client.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* KYC/AML */}
          <TabsContent value="kyc" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>Verificação de Identidade (KYC/AML)</span>
                </CardTitle>
                <CardDescription>
                  Sistema integrado de verificação conforme regulamentações do BNA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Cadastro Pessoa Física</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="pf-name">Nome Completo</Label>
                        <Input id="pf-name" placeholder="Nome completo do cliente" />
                      </div>
                      <div>
                        <Label htmlFor="pf-bi">Bilhete de Identidade</Label>
                        <Input id="pf-bi" placeholder="Número do BI" />
                      </div>
                      <div>
                        <Label htmlFor="pf-nif">NIF</Label>
                        <Input id="pf-nif" placeholder="Número de Identificação Fiscal" />
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        <Shield className="w-4 h-4 mr-2" />
                        Iniciar Verificação KYC
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Cadastro Pessoa Jurídica</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="pj-name">Razão Social</Label>
                        <Input id="pj-name" placeholder="Nome da empresa" />
                      </div>
                      <div>
                        <Label htmlFor="pj-nif">NIF Empresarial</Label>
                        <Input id="pj-nif" placeholder="NIF da empresa" />
                      </div>
                      <div>
                        <Label htmlFor="pj-certidao">Certidão Comercial</Label>
                        <Input id="pj-certidao" type="file" accept=".pdf,.jpg,.png" />
                      </div>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        <Building2 className="w-4 h-4 mr-2" />
                        Verificar Empresa
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Documentos Necessários</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-blue-800">Pessoa Física:</p>
                      <ul className="list-disc list-inside text-blue-700 space-y-1">
                        <li>Bilhete de Identidade</li>
                        <li>Comprovativo de Rendimento</li>
                        <li>Extracto Bancário (3 meses)</li>
                        <li>Comprovativo de Residência</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-blue-800">Pessoa Jurídica:</p>
                      <ul className="list-disc list-inside text-blue-700 space-y-1">
                        <li>Certidão Comercial</li>
                        <li>Balanço e Demonstrações</li>
                        <li>Declaração de IVA</li>
                        <li>Estatutos da Empresa</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Análise com IA */}
          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span>Análise Financeira com Inteligência Artificial</span>
                </CardTitle>
                <CardDescription>
                  Sistema avançado de análise de risco e recomendações personalizadas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Button 
                    onClick={performAIAnalysis}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    size="lg"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Executar Análise Completa
                  </Button>
                </div>

                {analysisResults.financialScore > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-blue-900">Score Financeiro</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {analysisResults.financialScore}
                        </div>
                        <Progress value={(analysisResults.financialScore - 300) / 7} className="h-2" />
                        <p className="text-sm text-blue-700 mt-2">
                          {analysisResults.financialScore > 700 ? 'Excelente' : 
                           analysisResults.financialScore > 600 ? 'Bom' : 'Regular'}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-green-900">Conformidade Legal</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          {analysisResults.legalCompliance}%
                        </div>
                        <Progress value={analysisResults.legalCompliance} className="h-2" />
                        <p className="text-sm text-green-700 mt-2">
                          {analysisResults.legalCompliance > 90 ? 'Conforme' : 'Atenção necessária'}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-yellow-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-orange-900">Otimização Fiscal</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-orange-600 mb-2">
                          {analysisResults.taxOptimization}%
                        </div>
                        <Progress value={analysisResults.taxOptimization} className="h-2" />
                        <p className="text-sm text-orange-700 mt-2">
                          Economia potencial identificada
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-3">Recursos de IA Disponíveis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Análise de Comportamento</p>
                        <p className="text-sm text-gray-600">Padrões de gastos e histórico financeiro</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Previsão de Risco</p>
                        <p className="text-sm text-gray-600">Modelos preditivos avançados</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Recomendações Personalizadas</p>
                        <p className="text-sm text-gray-600">Produtos ideais para cada perfil</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Detecção de Fraudes</p>
                        <p className="text-sm text-gray-600">Algoritmos anti-fraude em tempo real</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Análise Jurídica */}
          <TabsContent value="legal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Scale className="w-5 h-5 text-indigo-600" />
                  <span>Análise Jurídica de Contratos</span>
                </CardTitle>
                <CardDescription>
                  Detecção automática de cláusulas abusivas e conformidade legal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Upload de Contrato
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Arraste e solte o contrato ou clique para selecionar
                  </p>
                  <Button variant="outline">
                    Selecionar Arquivo
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-red-50 border-red-200">
                    <CardHeader>
                      <CardTitle className="text-red-800 flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5" />
                        <span>Cláusulas Identificadas</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-red-100 rounded-lg">
                          <p className="font-medium text-red-800">Taxa de Juros Variável</p>
                          <p className="text-sm text-red-600">
                            Cláusula permite alteração unilateral das taxas
                          </p>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-lg">
                          <p className="font-medium text-yellow-800">Garantias Excessivas</p>
                          <p className="text-sm text-yellow-600">
                            Garantias podem ser desproporcionais ao valor
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-800 flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Conformidade Legal</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Lei do Consumidor</span>
                          <Badge className="bg-green-100 text-green-800">Conforme</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Regulamentação BNA</span>
                          <Badge className="bg-green-100 text-green-800">Conforme</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Código Civil</span>
                          <Badge className="bg-yellow-100 text-yellow-800">Revisar</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-indigo-900 mb-3">Análise Jurídica Automatizada</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                        <FileText className="w-6 h-6 text-indigo-600" />
                      </div>
                      <p className="font-medium text-indigo-900">OCR Avançado</p>
                      <p className="text-sm text-indigo-700">Extração de texto precisa</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Brain className="w-6 h-6 text-indigo-600" />
                      </div>
                      <p className="font-medium text-indigo-900">IA Jurídica</p>
                      <p className="text-sm text-indigo-700">Análise inteligente de cláusulas</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Scale className="w-6 h-6 text-indigo-600" />
                      </div>
                      <p className="font-medium text-indigo-900">Conformidade</p>
                      <p className="text-sm text-indigo-700">Verificação regulatória</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sistema Tributário */}
          <TabsContent value="tax" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Receipt className="w-5 h-5 text-green-600" />
                  <span>Integração Sistema Tributário Angolano</span>
                </CardTitle>
                <CardDescription>
                  Análise de impacto fiscal e otimização tributária (AGT)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-green-900">IRT</CardTitle>
                      <CardDescription className="text-green-700">
                        Imposto sobre Rendimento do Trabalho
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600 mb-2">12.5%</div>
                      <p className="text-sm text-green-700">Taxa aplicável</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-blue-900">IVA</CardTitle>
                      <CardDescription className="text-blue-700">
                        Imposto sobre Valor Acrescentado
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600 mb-2">14%</div>
                      <p className="text-sm text-blue-700">Taxa geral</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-indigo-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-purple-900">IS</CardTitle>
                      <CardDescription className="text-purple-700">
                        Imposto sobre Sociedades
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-600 mb-2">25%</div>
                      <p className="text-sm text-purple-700">Taxa empresarial</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-3 flex items-center space-x-2">
                    <Calculator className="w-5 h-5" />
                    <span>Simulador de Impacto Fiscal</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="loan-amount">Valor do Crédito (AOA)</Label>
                      <Input id="loan-amount" placeholder="Ex: 5.000.000" />
                    </div>
                    <div>
                      <Label htmlFor="income">Rendimento Mensal (AOA)</Label>
                      <Input id="income" placeholder="Ex: 500.000" />
                    </div>
                  </div>
                  <Button className="mt-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                    <Calculator className="w-4 h-4 mr-2" />
                    Calcular Impacto Fiscal
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-green-800">Benefícios Fiscais</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Crédito Habitação</p>
                            <p className="text-sm text-gray-600">Dedução até 20% do IRT</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Investimento Empresarial</p>
                            <p className="text-sm text-gray-600">Incentivos fiscais disponíveis</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-red-800">Obrigações Fiscais</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Declaração Anual</p>
                            <p className="text-sm text-gray-600">Até 31 de Março</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Pagamento Mensal</p>
                            <p className="text-sm text-gray-600">IRT retido na fonte</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Produtos Bancários */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Banknote className="w-5 h-5 text-blue-600" />
                  <span>Comparação de Produtos Bancários</span>
                </CardTitle>
                <CardDescription>
                  Recomendações personalizadas baseadas no perfil do cliente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {bankProducts.map((product) => (
                    <Card key={product.id} className="border-2 hover:border-blue-300 transition-colors">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{product.product}</CardTitle>
                            <CardDescription className="font-medium text-blue-600">
                              {product.bank}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {product.rate}% a.a.
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Valor Máximo:</span>
                            <span className="font-medium">
                              {(product.maxAmount / 1000000).toFixed(0)}M AOA
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Prazo:</span>
                            <span className="font-medium">{product.term} meses</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Impacto Fiscal:</span>
                            <span className="font-medium text-green-600">
                              -{product.taxImpact}%
                            </span>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-2">Requisitos:</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {product.requirements.map((req, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <CheckCircle className="w-3 h-3 text-green-600" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                          Solicitar Proposta
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-4">Bancos Parceiros</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                      <Building2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">BFA</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                      <Building2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">BAI</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                      <Building2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">BIC</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                      <Building2 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">Millennium</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}