# 🚀 Instruções de Uso

## Instalação Rápida

```bash
git clone https://github.com/senal88/dashboard-automotivo-chineses.git
cd dashboard-automotivo-chineses
npm install
npm run dev
```

Acesse: http://localhost:3000

## Navegação

O dashboard possui **2 módulos**:

1. **Visão Geral** - Market share, evolução temporal, impacto industrial, análise estratégica
2. **Vendas** - Evolução de vendas, top modelos, preços médios, crescimento YoY

Use os **tabs no header** para navegar entre os módulos.

## Funcionalidades de Performance

### Filtro de Marcas (Módulo Vendas)
- Clique nos botões coloridos (BYD, GWM, GEELY, CHERY) para mostrar/esconder séries
- Útil para focar em marcas específicas

### Loading States
- Skeleton loaders aparecem durante carregamento
- Evita layout shift e melhora UX

### Componentes Memoizados
- Todos os gráficos usam `React.memo()` para evitar re-renderizações
- Dados calculados com `useMemo()` para performance

## Personalização

### Alterar Dados
Edite o arquivo `src/data/automotive-data.js` para atualizar:
- Vendas mensais
- Top modelos
- Preços médios
- Crescimento YoY

### Alterar Cores
No arquivo `src/components/ModuloVendas.jsx`, edite:
```javascript
const BRAND_COLORS = {
  byd: '#059669',
  gwm: '#10b981',
  geely: '#14b8a6',
  chery: '#0d9488',
};
```

### Adicionar Novos Gráficos
1. Importe os dados de `automotive-data.js`
2. Crie componente memoizado:
```javascript
const NovoGrafico = React.memo(() => {
  const data = useMemo(() => dados, []);
  return (
    <ResponsiveContainer width="100%" height="100%">
      {/* Seu gráfico Recharts */}
    </ResponsiveContainer>
  );
});
```

## Build de Produção

```bash
npm run build
npm run preview
```

Os arquivos estáticos serão gerados em `dist/`

## Deploy (Vercel)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Troubleshooting

### Erro: "Module not found"
```bash
npm install
```

### Gráficos não aparecem
Verifique se Recharts está instalado:
```bash
npm install recharts
```

### Estilo quebrado
Reinstale Tailwind:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
