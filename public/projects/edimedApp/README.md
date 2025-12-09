# EdimedApp

![Splash Screen](./assets/splash.png)

Aplicativo mobile desenvolvido com React Native e Expo para gerenciamento de serviços médicos e agendamentos. O EdimedApp permite que beneficiários realizem agendamentos de consultas, gerenciem seus perfis e acompanhem seus pedidos de forma simples e intuitiva.

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- [React Native](https://reactnative.dev/) - Framework para desenvolvimento mobile
- [Expo](https://expo.dev/) - Plataforma para desenvolvimento React Native
- [React Navigation](https://reactnavigation.org/) - Navegação entre telas
- [Axios](https://axios-http.com/) - Cliente HTTP para requisições à API
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) - Armazenamento local
- [React Native Maps](https://github.com/react-native-maps/react-native-maps) - Integração com mapas
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) - Biblioteca de ícones

## 📱 Funcionalidades

Algumas das principais funcionalidades do aplicativo incluem:

- **Autenticação de Usuários**: Sistema de login e registro com validação
- **Gerenciamento de Perfil**: Edição completa de dados pessoais do beneficiário
- **Agendamento de Consultas**: Busca e agendamento de serviços médicos
- **Localização**: Busca de credenciados próximos usando mapas
- **Gerenciamento de Pedidos**: Acompanhamento de solicitações e pagamentos
- **Dependentes**: Gerenciamento de dependentes cadastrados
- **Histórico**: Visualização do histórico de agendamentos

## 🖼️ Capturas de Tela

### Tela de Login
![Tela de Login](./assets/login.png)
*Tela de login do aplicativo com validação de credenciais.*

### Tela de Registro
![Tela de Registro](./assets/registro.png)
*Tela de registro de novos beneficiários.*

### Tela Principal (Home)
![Tela Principal](./assets/home.png)
*Tela principal com menu de navegação e principais funcionalidades.*

### Menu Lateral
![Menu Lateral](./assets/menu.png)
*Menu drawer com opções de navegação do aplicativo.*

### Perfil do Usuário
![Perfil 1](./assets/perfil1.png)
*Tela de perfil com informações pessoais do beneficiário.*

![Perfil 2](./assets/perfil2.png)
*Tela de perfil com dados adicionais e termos LGPD.*

## 🛠️ Instalação

Para executar este projeto localmente, siga os passos abaixo:

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI instalado globalmente
- Emulador Android/iOS ou dispositivo físico com Expo Go instalado

### Passos

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/edimedApp.git
```

2. Navegue até o diretório do projeto:

```bash
cd edimedApp
```

3. Instale as dependências:

```bash
npm install
```

ou

```bash
yarn install
```

4. Inicie o aplicativo:

```bash
npm start
```

ou

```bash
yarn start
```

5. Escaneie o QR Code com o aplicativo Expo Go (Android) ou Camera (iOS) para abrir o app no seu dispositivo.

### Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento Expo
- `npm run android` - Inicia o app no emulador/dispositivo Android
- `npm run ios` - Inicia o app no simulador/dispositivo iOS
- `npm run web` - Inicia o app no navegador web

## 📁 Estrutura do Projeto

```
edimedApp/
├── assets/              # Imagens e recursos estáticos
├── src/
│   ├── api/            # Configuração da API e interceptors
│   ├── assets/         # Assets internos (fontes, imagens)
│   ├── components/     # Componentes reutilizáveis
│   ├── routes/         # Configuração de navegação
│   ├── screens/        # Telas do aplicativo
│   └── utils/          # Funções utilitárias
├── App.js              # Componente principal
├── app.json            # Configuração do Expo
└── package.json        # Dependências do projeto
```

## 🔐 Autenticação

O aplicativo utiliza autenticação baseada em JWT (JSON Web Tokens). Os tokens são armazenados localmente usando AsyncStorage e são enviados nas requisições à API através do header Authorization.

### Modo Mock

Para desenvolvimento e testes, o aplicativo possui um sistema de mock que permite fazer login sem necessidade de conexão com a API real. Os dados mockados estão configurados em `src/utils/mockUser.js`.

## 🌐 API

O aplicativo consome uma API REST localizada em `https://edimedplus.com.br/_api/`. As principais rotas utilizadas são:

- `/login.php` - Autenticação de usuários
- `/profile.php` - Dados do perfil do beneficiário
- `/search.php` - Busca de credenciados e serviços
- `/cart.php` - Gerenciamento de pedidos
- `/pagseg.php` - Processamento de pagamentos

## 🎨 Design

O aplicativo segue um design moderno e intuitivo, com cores principais:
- **Rosa**: `#A21E66` / `#9F1D65` - Cor primária
- **Amarelo**: `#F2B33D` - Cor de destaque
- **Azul**: `#10DEFD` - Cor de links e ações secundárias

## 📝 Licença

Este projeto é privado e de propriedade da EdimedPlus.

## 👨‍💻 Desenvolvimento

Para contribuir com o projeto ou reportar problemas, entre em contato com a equipe de desenvolvimento.

---

Desenvolvido com ❤️ usando React Native e Expo

