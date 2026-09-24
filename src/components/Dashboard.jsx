import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import ModuloVendas from './ModuloVendas';

// Dados de Market Share - Agosto 2026
const marketShareData = [
  { name: 'Fiat', value: 18.7, color: '#1f2937' },
  { name: 'Volkswagen', value: 16.8, color: '#374151' },
  { name: 'GM', value: 10.9, color: '#4b5563' },
  { name: 'Hyundai', value: 8.0, color: '#6b7280' },
  { name: 'BYD', value: 8.8, color: '#059669' },
  { name: 'Toyota', value: 6.3, color: '#9ca3af' },
  { name: 'Renault', value: 4.7, color: '#d1d5db' },
  { name: 'Honda', value: 3.9, color: '#e5e7eb' },
  { name: 'GWM', value: 3.8, color: '#10b981' },
  { name: 'Outros', value: 18.1, color: '#f3f4f6' },
];

// Dados de evolução mensal - Participação chinesa 2026
const evolucaoMensalData = [
  { mes: 'Jan', participacao: 15.2 },
  { mes: 'Fev', participacao: 16.8 },
  { mes: 'Mar', participacao: 17.9 },
  { mes: 'Abr', participacao: 19.4 },
  { mes: 'Mai', participacao: 20.6 },
  { mes: 'Jun', participacao: 22.1 },
  { mes: 'Jul', participacao: 22.8 },
  { mes: 'Ago', participacao: 23.3 },
];

// Dados de produção local
const producaoLocalData = [
  { montadora: 'BYD', capacidade: 150000, estado: 'Bahia', modelo: 'Dolphin, Song, Yuan' },
  { montadora: 'GWM', capacidade: 50000, estado: 'São Paulo', modelo: 'Haval H6, H9, Poer' },
  { montadora: 'Geely', capacidade: 30000, estado: 'Paraná', modelo: 'EX5 EM-i' },
  { montadora: 'GAC', capacidade: 25000, estado: 'Ceará', modelo: 'MG Motor' },
];

// Dados de resposta das tradicionais
const respostaTradicionaisData = [
  { montadora: 'Volkswagen', estrategia: 'ID.4 e ID.7 elétricos', investimento: 'R$ 4 bi', status: 'Em produção' },
  { montadora: 'Fiat', estrategia: 'Titano EV e Pulse elétrico', investimento: 'R$ 2.5 bi', status: 'Planejado 2027' },
  { montadora: 'GM', estrategia: 'Equinox EV e Blazer EV', investimento: 'R$ 3 bi', status: 'Importados' },
  { montadora: 'Toyota', estrategia: 'Foco em híbridos', investimento: 'R$ 5.5 bi', status: 'Produção local' },
];

// Componente: Header com navegação
const Header = ({ moduloAtual, setModuloAtual }) => {
  const modulos = [
    { id: 'overview', label: 'Visão Geral' },
    { id: 'vendas', label: 'Vendas' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Mercado Automotivo Brasil 2026
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Avanço das Montadoras Chinesas
            </p>
          </div>
          <div className="flex items-center gap-6">
            {/* Navegação */}
            <nav className="flex gap-2">
              {modulos.map((modulo) => (
                <button
                  key={modulo.id}
                  onClick={() => setModuloAtual(modulo.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    moduloAtual === modulo.id
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {modulo.label}
                </button>
              ))}
            </nav>
            <div className="text-right">
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Atualizado
              </p>
              <p className="text-sm font-medium text-gray-700">
                Setembro 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Componente: Skeleton Loader
const SkeletonCard = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
    <div className="h-64 bg-gray-200 rounded"></div>
  </div>
);

// Componente: Market Share
const MarketShare = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <SkeletonCard />;

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Market Share - Agosto 2026
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={marketShareData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {marketShareData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    opacity={activeIndex === index ? 1 : 0.7}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `${value}%`}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2">
          {marketShareData.slice(0, 6).map((item, index) => (
            <div 
              key={index}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {item.value}%
              </span>
            </div>
          ))}
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
            <p className="text-xs text-green-800 font-medium">
              📈 Chinesas (BYD + GWM + Geely + Chery): 25% do mercado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente: Impacto Industrial
const ImpactoIndustrial = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">
      Impacto Industrial - Produção Local
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {producaoLocalData.map((item, index) => (
        <div 
          key={index}
          className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900">{item.montadora}</h3>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
              Ativo
            </span>
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            <p><span className="font-medium text-gray-700">Capacidade:</span> {item.capacidade.toLocaleString('pt-BR')} veículos/ano</p>
            <p><span className="font-medium text-gray-700">Estado:</span> {item.estado}</p>
            <p className="text-xs text-gray-500 mt-2">{item.modelo}</p>
          </div>
        </div>
      ))}
    </div>
    
    <div className="mt-6 grid grid-cols-3 gap-4">
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-2xl font-bold text-gray-900">255K</p>
        <p className="text-xs text-gray-500 mt-1">Capacidade Total</p>
      </div>
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-2xl font-bold text-gray-900">4</p>
        <p className="text-xs text-gray-500 mt-1">Fábricas Ativas</p>
      </div>
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-2xl font-bold text-gray-900">R$ 12Bi</p>
        <p className="text-xs text-gray-500 mt-1">Investimento</p>
      </div>
    </div>
  </div>
);

// Componente: Análise Estratégica
const AnaliseEstrategica = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">
      Resposta das Montadoras Tradicionais
    </h2>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-700">Montadora</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Estratégia</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Investimento</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {respostaTradicionaisData.map((item, index) => (
            <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 font-medium text-gray-900">{item.montadora}</td>
              <td className="py-3 px-4 text-gray-700">{item.estrategia}</td>
              <td className="py-3 px-4 text-gray-700">{item.investimento}</td>
              <td className="py-3 px-4">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  item.status === 'Em produção' ? 'bg-green-100 text-green-800' :
                  item.status === 'Produção local' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="font-semibold text-blue-900 mb-2">🔍 Contexto Estratégico</h3>
        <p className="text-sm text-blue-800 leading-relaxed">
          As montadoras tradicionais respondem com investimentos massivos em eletrificação, 
          aproveitando estruturas existentes e parcerias. VW e GM focam em modelos 100% elétricos, 
          enquanto Toyota mantém aposta em híbridos.
        </p>
      </div>
      <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
        <h3 className="font-semibold text-purple-900 mb-2">📊 Cenário Competitivo</h3>
        <p className="text-sm text-purple-800 leading-relaxed">
          Chinesas cresceram de 10% para 25% em 12 meses, pressionando margens e acelerando 
          transição energética. Imposto de 35% sobre importados (julho 2026) incentivou produção local.
        </p>
      </div>
    </div>
  </div>
);

// Componente: Evolução Temporal
const EvolucaoTemporal = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">
      Evolução da Participação Chinesa (2026)
    </h2>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={evolucaoMensalData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="mes" stroke="#6b7280" fontSize={12} />
          <YAxis stroke="#6b7280" fontSize={12} unit="%" />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value) => [`${value}%`, 'Participação']}
          />
          <Line 
            type="monotone" 
            dataKey="participacao" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className="mt-4 flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-green-500 rounded-full" />
        <span className="text-gray-700">Crescimento: <strong>+8.1pp</strong> em 8 meses</span>
      </div>
      <div className="text-gray-500">
        Projeção Dez/26: <strong>26-28%</strong>
      </div>
    </div>
  </div>
);

// Componente Principal: Dashboard
const Dashboard = () => {
  const [moduloAtual, setModuloAtual] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento inicial
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 mt-4">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header moduloAtual={moduloAtual} setModuloAtual={setModuloAtual} />
      
      <main className="pt-28 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {moduloAtual === 'overview' ? (
            <>
              {/* Grid Principal */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <MarketShare />
                <EvolucaoTemporal />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <ImpactoIndustrial />
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Destaques 2026
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 bg-green-500 rounded-full flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">BYD lidera varejo</p>
                        <p className="text-xs text-gray-600 mt-1">
                          12,8% de market share em abril, superando Volkswagen
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 bg-green-500 rounded-full flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">GWM supera Honda</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Primeira vez em agosto com 9.924 unidades (3,8% share)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 bg-green-500 rounded-full flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Geely inicia produção</p>
                        <p className="text-xs text-gray-600 mt-1">
                          EX5 EM-i produzido em parceria com Renault no Paraná
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 bg-green-500 rounded-full flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">8 marcas produzindo</p>
                        <p className="text-xs text-gray-600 mt-1">
                          BYD, GWM, Geely, GAC, Changan, Leapmotor, Caoa Chery, MG
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <AnaliseEstrategica />
              </div>
            </>
          ) : (
            <ModuloVendas />
          )}

          {/* Footer */}
          <footer className="mt-12 text-center text-xs text-gray-400">
            <p>Dados baseados em fontes públicas: FENABRAVE, SINDIPEÇAS, notícias setoriais</p>
            <p className="mt-1">Dashboard desenvolvido com React + Tailwind CSS + Recharts</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
