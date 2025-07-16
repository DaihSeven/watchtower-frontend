# Sistema de Localizações - Watchtower Frontend

## Funcionalidades Implementadas

### 🗺️ Mapa Interativo
- **Tecnologia**: Leaflet.js para renderização de mapas
- **Funcionalidades**:
  - Exibe marcadores para cada localização de avistamento
  - Popups informativos ao clicar nos marcadores
  - Zoom automático para mostrar todos os marcadores
  - Integração com OpenStreetMap

### 📍 Lista de Localizações
- **Layout responsivo**: Grid que se adapta a diferentes tamanhos de tela
- **Status visual**: Indicadores coloridos para avistamentos confirmados/não confirmados
- **Botão de atualização**: Recarrega dados em tempo real
- **Estados de loading e erro**: Feedback visual para o usuário

### 👤 Detalhes da Pessoa Desaparecida
- **Painel expansível**: Aparece ao clicar em uma localização
- **Informações completas**: Nome, idade, data de desaparecimento, contato
- **Ações disponíveis**:
  - Reportar novo avistamento
  - Compartilhar informações (Web Share API + fallback)

## Estrutura de Arquivos

```
src/
├── types/
│   └── localizacao.ts          # Tipos TypeScript para localizações
├── services/
│   └── localizacoes.ts         # Serviços de API para localizações
├── components/
│   ├── MapaLocalizacoes.tsx    # Componente do mapa interativo
│   ├── ListaLocalizacoes.tsx   # Componente da lista de localizações
│   ├── DetalhesPessoa.tsx      # Componente de detalhes da pessoa
│   └── LocalCard.tsx           # Card individual de localização
└── app/
    └── localizacoes/
        └── page.tsx            # Página principal de localizações
```

## Tipos de Dados

### LocalizacaoComAvistamento
```typescript
interface LocalizacaoComAvistamento {
  id: number;
  nome: string;
  descricao?: string;
  latitude: number;
  longitude: number;
  pessoaId?: number;
  avistamento?: {
    id: number;
    dataAvistamento: string;
    confirmado: boolean;
    descricao: string;
  };
}
```

### PessoaDesaparecida
```typescript
interface PessoaDesaparecida {
  id: number;
  nome: string;
  idade: number;
  desaparecidoDesde: string;
  ultimoAvistamento?: string;
  descricao: string;
  contato: string;
  foto?: string;
}
```

## Endpoints da API

### Produção
- `GET /local` - Lista todas as localizações
- `GET /avistamentamentos` - Lista todos os avistamentos
- `GET /pessoa/{id}` - Detalhes de uma pessoa específica

### Desenvolvimento
- Dados simulados incluídos para demonstração
- Fácil transição para API real removendo comentários

## Instalação e Configuração

### Dependências
```bash
npm install leaflet @types/leaflet
```

### Variáveis de Ambiente
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Uso

1. **Navegação**: Acesse `/localizacoes` no sistema
2. **Visualização**: O mapa e lista carregam automaticamente
3. **Interação**: Clique em marcadores ou cards para ver detalhes
4. **Atualização**: Use o botão "Atualizar" para recarregar dados

## Características Técnicas

- **Framework**: Next.js 14 com App Router
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Estado**: React Hooks (useState, useEffect)
- **Mapeamento**: Leaflet.js
- **Responsividade**: Design mobile-first

## Próximas Melhorias

- [ ] Integração com API real
- [ ] Filtros por status de avistamento
- [ ] Busca por localização
- [ ] Notificações em tempo real
- [ ] Geolocalização do usuário
- [ ] Modo offline com cache 