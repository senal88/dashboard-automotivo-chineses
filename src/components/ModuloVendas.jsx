import React, { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { vendasMensaisData, topModelosData, vendasPorCategoria, precosMedios, crescimentoYoY } from '../data/automotive-data';

// Cores otimizadas para as marcas
const BRAND_COLORS = {
  byd: '#059669',
  gwm: '#10b981',
  geely: '#14b8a6',
  chery: '#0d9488',
};

// Componente: Card de KPI
const KPICard = ({ title, value, subtitle, trend }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
    <p className="text-xs text-gray-500 uppercase tracking-wider">{title}</p>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    {trend && (
      <p className={`text-xs mt-2 font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% {subtitle}
      </p>
    )}
  </div>
);

// Componente: Evolução de Vendas (memoizado para performance)
const EvolucaoVendas = React.memo(() => {
  const [selectedBrands, setSelectedBrands] = useState(['byd', 'gwm']);

  const chartData = useMemo(() => vendasMensaisData, []);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Evolução de Vendas - 2026
      </h2>
      
      {/* Filtro de marcas */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {Object.entries(BRAND_COLORS).map(([brand, color]) => (
          <button
            key={brand}
            onClick={() => toggleBrand(brand)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
              selectedBrands.includes(brand)
                ? 'text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            style={{
              backgroundColor: selectedBrands.includes(brand) ? color : 'transparent',
              borderColor: selectedBrands.includes(brand) ? color : '#e5e7eb'
            }}
          >
            {brand.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              {Object.entries(BRAND_COLORS).map(([brand, color]) => (
                <linearGradient key={brand} id={`gradient-${brand}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="mes" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value) => value.toLocaleString('pt-BR')}
            />
            <Legend />
            {selectedBrands.includes('byd') && (
              <Area type="monotone" dataKey="byd" stroke={BRAND_COLORS.byd} fillOpacity={1} fill="url(#gradient-byd)" strokeWidth={2} />
            )}
            {selectedBrands.includes('gwm') && (
              <Area type="monotone" dataKey="gwm" stroke={BRAND_COLORS.gwm} fillOpacity={1} fill="url(#gradient-gwm)" strokeWidth={2} />
            )}
            {selectedBrands.includes('geely') && (
              <Area type="monotone" dataKey="geely" stroke={BRAND_COLORS.geely} fillOpacity={1} fill="url(#gradient-geely)" strokeWidth={2} />
            )}
            {selectedBrands.includes('chery') && (
              <Area type="monotone" dataKey="chery" stroke={BRAND_COLORS.chery} fillOpacity={1} fill="url(#gradient-chery)" strokeWidth={2} />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

// Componente: Top Modelos (memoizado)
const TopModelos = React.memo(() => {
  const sortedModelos = useMemo(
    () => [...topModelosData].sort((a, b) => b.vendas - a.vendas),
    []
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Top Modelos - Agosto 2026
      </h2>
      <div className="space-y-3">
        {sortedModelos.map((item, index) => (
          <div key={item.modelo} className="flex items-center gap-4">
            <div className="w-6 text-center">
              <span className={`text-sm font-bold ${index < 3 ? 'text-green-600' : 'text-gray-400'}`}>
                #{index + 1}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-gray-900">{item.modelo}</p>
                <p className="text-sm font-semibold text-gray-900">{item.vendas.toLocaleString('pt-BR')}</p>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${(item.vendas / sortedModelos[0].vendas) * 100}%` }}
                />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">{item.marca}</span>
                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">{item.categoria}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

// Componente: Vendas por Categoria (memoizado)
const VendasPorCategoria = React.memo(() => {
  const COLORS = ['#10b981', '#059669', '#6b7280'];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Vendas por Categoria
      </h2>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={vendasPorCategoria}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={3}
              dataKey="vendas"
              label={({ categoria, percentual }) => `${categoria} (${percentual}%)`}
              labelLine={false}
            >
              {vendasPorCategoria.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => value.toLocaleString('pt-BR')} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

// Componente: Preços Médios (memoizado)
const PrecosMedios = React.memo(() => {
  const sortedPrecos = useMemo(
    () => [...precosMedios].sort((a, b) => b.precoMedio - a.precoMedio),
    []
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Preços Médios por Marca
      </h2>
      <div className="space-y-3">
        {sortedPrecos.map((item) => (
          <div key={item.marca} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
            <div>
              <p className="text-sm font-medium text-gray-900">{item.marca}</p>
              <p className="text-xs text-gray-500">{item.faixa}</p>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              R$ {item.precoMedio.toLocaleString('pt-BR')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
});

// Componente: Crescimento YoY (memoizado)
const CrescimentoYoY = React.memo(() => {
  const sortedCrescimento = useMemo(
    () => [...crescimentoYoY].sort((a, b) => b.crescimento - a.crescimento),
    []
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Crescimento YoY (2026)
      </h2>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedCrescimento} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" stroke="#6b7280" fontSize={12} unit="%" />
            <YAxis dataKey="marca" type="category" stroke="#6b7280" fontSize={11} width={80} />
            <Tooltip formatter={(value) => [`${value}%`, 'Crescimento']} />
            <Bar dataKey="crescimento" radius={[0, 4, 4, 0]}>
              {sortedCrescimento.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.crescimento >= 0 ? '#10b981' : '#ef4444'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

// Componente Principal: Módulo de Vendas
const ModuloVendas = () => {
  // Calcular KPIs com useMemo para performance
  const kpis = useMemo(() => {
    const totalAgo = vendasMensaisData[vendasMensaisData.length - 1].total;
    const totalJan = vendasMensaisData[0].total;
    const crescimento = ((totalAgo - totalJan) / totalJan * 100).toFixed(1);
    const mediaMensal = (vendasMensaisData.reduce((acc, curr) => acc + curr.total, 0) / vendasMensaisData.length).toFixed(0);
    const bydShare = ((vendasMensaisData[vendasMensaisData.length - 1].byd / totalAgo) * 100).toFixed(1);

    return { totalAgo, crescimento, mediaMensal, bydShare };
  }, []);

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Vendas Agosto" 
          value={kpis.totalAgo.toLocaleString('pt-BR')} 
          subtitle="unidades"
        />
        <KPICard 
          title="Crescimento YTD" 
          value={`+${kpis.crescimento}%`} 
          subtitle="vs. Jan/26"
          trend={parseFloat(kpis.crescimento)}
        />
        <KPICard 
          title="Média Mensal" 
          value={kpis.mediaMensal} 
          subtitle="unidades/mês"
        />
        <KPICard 
          title="Share BYD" 
          value={`${kpis.bydShare}%`} 
          subtitle="market share"
        />
      </div>

      {/* Gráficos principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EvolucaoVendas />
        <TopModelos />
      </div>

      {/* Gráficos secundários */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <VendasPorCategoria />
        <PrecosMedios />
        <CrescimentoYoY />
      </div>
    </div>
  );
};

export default ModuloVendas;
