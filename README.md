# Zelo Mobile

Aplicativo mobile nativo desenvolvido para o projeto Zelo, com React Native e Expo. A aplicação aproxima tutores, veterinários e gestores de clínicas, oferecendo acompanhamento contínuo da saúde dos pets, registro de triagens, alertas e gerenciamento do plano de cuidado.

## Informações do grupo

**Nome do grupo:** Zelo

| Integrante | RM |
|---|---:|
| Hebert Lopes do Santos | 563192 |
| Marcus Vinícius Vila Nova da Silva | 558771 |
| Nicolas Monteiro Ramiro | 562380 |
| Bruno Ferreira | 563489 |
| Gabriel Robertoni Padilha | 566293 |

## Descrição do problema escolhido

Os tutores de animais de estimação frequentemente precisam lidar com informações dispersas sobre vacinas, sintomas, consultas, medicações e cuidados preventivos. Ao mesmo tempo, clínicas veterinárias precisam organizar o atendimento, identificar situações prioritárias e manter um histórico confiável dos pets acompanhados.

Quando essas informações ficam distribuídas em mensagens, anotações ou sistemas diferentes, o tutor pode esquecer cuidados importantes e a clínica pode perder visibilidade sobre a evolução do animal. Esse cenário dificulta a prevenção e faz com que muitos problemas sejam percebidos somente quando já exigem atendimento urgente.

## Solução proposta

O Zelo é um aplicativo mobile de cuidado veterinário contínuo. A solução centraliza o acompanhamento do pet em uma experiência acessível pelo celular e integrada ao backend Java do projeto.

O tutor pode cadastrar e consultar seus pets, registrar uma triagem quando identificar algo preocupante e acompanhar alertas e planos de cuidado. O veterinário possui acesso à fila de atenção e aos alertas dos atendimentos. O gestor pode consultar a fila, acompanhar alertas e administrar os dados da própria clínica.

O aplicativo utiliza autenticação integrada à API Java e apresenta menus diferentes conforme o perfil de acesso. O e-mail `veterinario@zelo.com.br` direciona para o menu de veterinário, o e-mail `gestor@zelo.com.br` direciona para o menu de gestor e os demais e-mails são tratados como tutores, conforme a regra de demonstração definida no projeto.

A API Java permanece local durante o desenvolvimento. O aplicativo mobile acessa essa API por HTTP usando `localhost` no computador, `10.0.2.2` no emulador Android ou o endereço IPv4 do computador quando executado em um celular físico pelo Expo Go.

## Funcionalidades principais

### Autenticação

- Login utilizando as credenciais da API Java;
- Cadastro de novos tutores;
- Persistência da sessão no dispositivo;
- Logout;
- Tratamento de erros de validação, credenciais, conexão e servidor.

### Perfil Tutor

- Dashboard com resumo dos cuidados;
- Cadastro, edição, consulta e exclusão de pets;
- Criação e consulta de triagens;
- Cancelamento e exclusão de triagens;
- Consulta do plano de cuidado;
- Consulta, criação, confirmação, cancelamento e exclusão de alertas.

### Perfil Veterinário

- Dashboard;
- Fila de atenção;
- Consulta e gerenciamento de alertas.

### Perfil Gestor

- Dashboard;
- Fila de atenção;
- Consulta e gerenciamento de alertas;
- Consulta e atualização dos dados da própria clínica.

### Experiência mobile

- Navegação por barra fixa inferior;
- Cabeçalho com logo, usuário, botão de voltar e logout;
- Botão para alternar entre modo claro e modo escuro;
- Interface adaptada para celulares Android e iOS;
- Feedback visual de carregamento, erro, sucesso e estado vazio.

## Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| React Native 0.81 | Desenvolvimento da interface mobile nativa |
| Expo SDK 54 | Execução, desenvolvimento e testes do aplicativo |
| TypeScript | Tipagem estática e segurança do código |
| React 19 | Construção dos componentes da interface |
| Expo Router | Rotas, navegação e proteção de telas |
| NativeWind | Sistema complementar de estilos |
| TanStack Query | Consultas, cache e mutações da API |
| Expo SecureStore | Armazenamento seguro da sessão em Android e iOS |
| AsyncStorage | Persistência da sessão no preview web |
| Spring Boot Java | Backend e API REST do projeto |
| Bearer Token | Autenticação das requisições protegidas |
| Oracle/H2 | Bancos acessados exclusivamente pela API Java |

## Estrutura do projeto

```text
zelo-mobile-main/
├── app/                    # Rotas e telas do Expo Router
│   ├── (auth)/             # Login e cadastro
│   └── (app)/              # Área autenticada
├── components/             # Componentes visuais reutilizáveis
├── config/                 # Navegação e regras de acesso por perfil
├── constants/              # Paleta e constantes do aplicativo
├── controller/             # Regras de controle de acesso mobile
├── hooks/                  # Hooks de autenticação e dados
├── lib/                    # Cliente HTTP, sessão e tema
├── model/                  # Modelos de domínio
├── repository/             # Acesso organizado ao repositório da API
├── security/               # Camada de autenticação mobile
├── tests/                  # Testes automatizados
├── theme.config.js         # Cores dos modos claro e escuro
├── package.json            # Dependências e scripts
└── tsconfig.json           # Configuração TypeScript
```

## Pré-requisitos

Antes de executar o projeto, instale:

- Node.js compatível com o projeto;
- npm;
- Expo Go no celular, caso o teste seja feito em aparelho físico;
- Backend Java Zelo executando localmente na porta `8080`.

O Android Studio e o Android SDK são necessários somente para utilizar um emulador Android local. Eles não são obrigatórios para testar em um celular físico usando o Expo Go.

## Instalação

Abra o terminal na pasta do projeto mobile:

```bash
cd zelo-mobile-main
npm install
```

## Configuração da API Java

O endereço da API é lido pela variável `EXPO_PUBLIC_API_BASE_URL`, usada em:

```text
lib/api-client.ts
```

Para executar no navegador no mesmo computador:

```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080
```

Para executar no emulador Android:

```env
EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:8080
```

Para executar em um celular físico, crie um arquivo chamado `.env` na raiz do projeto, no mesmo nível do `package.json`, e informe o IPv4 do computador:

```env
EXPO_PUBLIC_API_BASE_URL=http://192.168.0.10:8080
```

Substitua `192.168.0.10` pelo endereço obtido no Windows com:

```bat
ipconfig
```

O computador e o celular precisam estar na mesma rede Wi-Fi. O Spring Boot deve estar ligado na porta `8080`, aceitar conexões pela rede, preferencialmente com `server.address=0.0.0.0`, e a porta deve estar liberada no Firewall do Windows para a rede privada.

Depois de criar ou alterar o `.env`, reinicie o Expo para carregar a nova variável:

```bash
npx expo start -c
```

## Execução do projeto

### Expo Go em celular físico

```bash
npm start
```

Depois, escaneie o QR Code exibido no terminal com o Expo Go. Para utilizar a API Java local, o `.env` deve conter o IP do computador, e não `localhost`.

### Navegador em modo web

```bash
npx expo start --web
```

Se o navegador e o backend Java estiverem no mesmo computador, use `http://localhost:8080`.

Para visualizar como um celular, abra as ferramentas do navegador com `F12` e ative o modo de dispositivo móvel.

### Emulador Android

```bash
npm run android
```

No emulador Android, use `http://10.0.2.2:8080` para acessar a API Java que está rodando no computador host.

### iOS

```bash
npm run ios
```

O comando iOS normalmente requer macOS e as ferramentas de desenvolvimento da Apple.

## Fluxo de navegação

1. O usuário abre o aplicativo;
2. O aplicativo verifica se existe uma sessão salva;
3. Usuários sem sessão são direcionados para o login;
4. Após o login, o usuário acessa a Home do Zelo;
5. O menu inferior é definido pelo e-mail e pelo perfil do usuário;
6. As telas protegidas consomem os dados reais da API Java;
7. O usuário pode alternar o tema, voltar entre telas e sair da sessão.

## Endpoints utilizados

| Método | Endpoint | Acesso |
|---|---|---|
| POST | `/api/auth/login` | Público |
| POST | `/api/auth/register` | Público; cria tutor |
| GET | `/api/auth/me` | Bearer |
| GET/POST/PUT/DELETE | `/api/pets` e `/api/pets/{id}` | Tutor |
| GET/POST/PATCH/DELETE | `/api/triagens` | Tutor |
| GET/POST/PATCH/DELETE | `/api/alertas` | Conforme autorização |
| GET | `/api/clinicas` | Bearer |
| GET/PUT | `/api/clinicas/minha` e `/api/clinicas/{id}` | Gestor |

O cliente mobile envia o token no cabeçalho:

```http
Authorization: Bearer <token>
```

## Contas e perfis de demonstração

A API Java possui suas próprias contas e dados seed. Utilize as credenciais documentadas no README do backend Java.

Para a demonstração dos menus mobile:

| E-mail | Menu |
|---|---|
| `veterinario@zelo.com.br` | Dashboard, Fila de atenção e Alertas |
| `gestor@zelo.com.br` | Dashboard, Fila de atenção, Alertas e Minha clínica |
| Qualquer outro e-mail | Dashboard, Meus pets, Triagens e Plano de cuidado |

Não coloque senhas reais no código ou no repositório.

## Link do vídeo de demonstração

> **Vídeo no YouTube:** [ inserir aqui o link do vídeo ](https://youtu.be/Nn1bbuaPp4E)

O vídeo deve apresentar, preferencialmente, o login, a navegação conforme o perfil de acesso, o cadastro de pet, o registro de triagem, o plano de cuidado, os alertas e a execução do aplicativo no celular ou emulador.

## Validação do projeto

Execute os comandos abaixo para verificar o projeto:

```bash
npm run check
npm run lint
npm test
```

Os testes automatizados cobrem as regras de acesso por e-mail, o contrato de comunicação com a API, a normalização da URL e o tratamento de erros.

## Observações importantes

- A API Java permanece local durante o desenvolvimento e não precisa ser publicada para o teste no celular;
- O celular e o computador precisam estar na mesma rede para o Expo Go acessar o backend local;
- `localhost` no celular representa o próprio celular, por isso deve ser substituído pelo IP do computador;
- O banco de dados não é acessado diretamente pelo aplicativo mobile; toda comunicação passa pela API Java;
- O modo escuro utiliza a paleta definida em `theme.config.js`;
- O projeto foi desenvolvido para o desafio FIAP 2026 — Mobile Application Development.

## Scripts disponíveis

```bash
npm start          # Inicia o Expo
npm run android    # Abre o projeto no Android
npm run ios        # Abre o projeto no iOS
npm run dev        # Inicia o preview web
npm run check      # Verifica o TypeScript
npm run lint       # Executa o lint
npm test           # Executa os testes
npm run format     # Formata os arquivos
```

---

**Desenvolvido para o desafio FIAP 2026 — Mobile Application Development.**
