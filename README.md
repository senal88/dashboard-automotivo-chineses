# Dashboard Automotivo - Mercado Chinês 2026

Dashboard interativo de análise do mercado automotivo brasileiro, focado no avanço das montadoras chinesas (BYD, GWM, Geely, etc.) em 2026.

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **Vite** - Build tool e dev server
- **Tailwind CSS 3** - Estilização
- **Recharts 2** - Visualização de dados

## 📦 Instalação

```bash
# Clonar repositório
git clone https://github.com/senal88/dashboard-automotivo-chineses.git
cd dashboard-automotivo-chineses

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build
```

## 📊 Módulos

### 1. Visão Geral
- **Market Share** - Gráfico de pizza comparando participação por marca
- **Evolução Temporal** - Linha do tempo da participação chinesa em 2026
- **Impacto Industrial** - Cards com dados de produção local (BYD, GWM, Geely, GAC)
- **Análise Estratégica** - Tabela com resposta das montadoras tradicionais
- **Destaques 2026** - Principais marcos do avanço chinês

### 2. Vendas (Novo!)
- **Evolução de Vendas** - Gráfico de área com filtro por marca
- **Top Modelos** - Ranking dos 8 modelos mais vendidos
- **Vendas por Categoria** - Distribuição (Elétrico, Híbrido, Combustão)
- **Preços Médios** - Comparativo por marca
- **Crescimento YoY** - Variação ano a ano

## 🎨 Design

- Estética minimalista e profissional
- Paleta de cores sóbria (tons de cinza + verde para destaque)
- Tipografia Inter (Google Fonts)
- Layout responsivo (mobile-first)
- Grid adaptativo (1-3 colunas)
- **Novo:** Navegação entre módulos com tabs

## ⚡ Melhorias de Performance

### Otimizações Implementadas

1. **React.memo** em todos os componentes de gráfico
   - Evita re-renderizações desnecessárias
   - Componentes: `EvolucaoVendas`, `TopModelos`, `VendasPorCategoria`, etc.

2. **useMemo** para cálculos pesados
   - Dados de KPIs calculados uma vez
   - Dados de gráficos memoizados

3. **Lazy loading simulado**
   - Skeleton loaders durante carregamento
   - Loading spinner inicial

4. **Separação de dados**
   - Arquivo `src/data/automotive-data.js` com todos os datasets
   - Fácil manutenção e atualização

5. **Gráficos otimizados**
   - Filtro interativo de marcas (toggle on/off)
   - Redução de data points em gráficos grandes
   - Tooltips eficientes

## 📁 Estrutura

```
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx       # Componente principal
│   │   └── ModuloVendas.jsx    # Módulo de vendas (novo)
│   ├── data/
│   │   └── automotive-data.js  # Dados estruturados (novo)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🔑 Dados

Dados baseados em fontes públicas (FENABRAVE, SINDIPEÇAS, notícias setoriais de 2026).

### Fontes dos Dados

- Market share: FENABRAVE
- Produção local: notícias setoriais (O Globo, Gazeta do Povo)
- Vendas mensais: dados consolidados de relatórios públicos
- Preços médios: pesquisa de mercado

## 🎯 Próximas Melhorias Sugeridas

- [ ] Integração com API real (FENABRAVE, ANFAVEA)
- [ ] Modo escuro (dark mode)
- [ ] Exportar dados (CSV, PNG)
- [ ] Filtros avançados (período, região, tipo de veículo)
- [ ] Mapa interativo do Brasil
- [ ] TanStack Query para cache de dados

## 📄 Licença

MIT
