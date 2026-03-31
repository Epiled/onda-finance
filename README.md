# 📖 Teste Onda Finance

Aplicação web simulando um app bancário.

<h2 id="detalhes-do-projeto"> 📈 Teste Onda Finance </h2>

### Objetivo

Construir uma aplicação web simulando um app bancário simples, com foco em
organização, UX e boas práticas.

### Stack obrigatória

- React + TypeScript
- Vite
- Tailwind + CVA
- shadcn/ui + Radix
- React Router
- React Query
- Zustand
- React Hook Form + Zod
- Axios
- Vitest

### Funcionalidades

#### Login (mock)

- Tela simples
- Persistência de sessão

#### Dashboard

- Exibir saldo
- Listar transações (mock)

#### Transferência

- Formulário com validação
- Atualizar saldo em tela

#### Testes

- Pelo menos um fluxo testado (livre escolha)

<!---
Segurança (obrigatório no README)
Explicar como o aplicativo seria protegido contra:
• Engenharia reversa
• Vazamento de dados
(não é necessário implementar)
Entrega
• Aplicação publicada – com Link para Acessar
• Repositório com README contendo:
o Como rodar o projeto
o Decisões técnicas adotadas
o Melhorias futuras
-->

![Badge](https://img.shields.io/github/last-commit/Epiled/onda-finance?style=for-the-badge)
![Badge](https://img.shields.io/github/languages/code-size/Epiled/onda-finance?style=for-the-badge)
![Badge](https://img.shields.io/github/languages/count/Epiled/onda-finance?style=for-the-badge)

<h2> 📑 Tabela de Conteúdos </h2>

<!--ts-->

- [Detalhes do Projeto](#detalhes-do-projeto)
- [Demonstração / Link para Acessar](#demonstracao)
- [Como rodar o projeto](#como-rodar)
  - [Instalação](#instalacao)
  - [Como acessar](#como-acessar)
  - [Building (opcional)](#building)
  - [Login](#login)
- [Testes](#testing)
- [Segurança](#security)
  - [Engenharia reversa](#engenharia-reversa)
  - [Vazamento de dados](#vazamento-de-dados)
- [Decisões técnicas adotadas](#tecnical-decision)
- [Melhorias futuras](#future-improves)
- [Autor](#autor)
<!--te-->

<h2 id="demonstracao"> 👀 Demonstração / Link para Acessar </h2>

<p>No link abaixo você pode conferir a página em deploy.</p>
<p>Teste Onda Finance: <a href="https://onda-finance-alpha.vercel.app/">https://onda-finance-alpha.vercel.app/</a></p>

<h2 id="como-rodar"> 👩‍🏫 Como rodar o projeto </h2>

<h3 id="instalacao"> ⚙ Instalação </h3>

```
1. git clone https://github.com/Epiled/onda-finance.git
2. cd onda-finance
3. npm install
```

<h3 id="como-usar"> 📑 Como usar </h3>

```
1. npm run dev
2. Abra a seguinte url http://localhost:5173/
```

<h3 id="building"> ⚙ Building </h3>

```
1. npm run build
```

<h3 id="building"> 🔒 Login </h3>

Todas as contas do mock possuem a mesma senha: `Onda@2026`

Contas disponíveis para login:

| E-mail                    | Senha     |
| ------------------------- | --------- |
| max.leiter@example.com    | Onda@2026 |
| ana.silva@ondafinance.com | Onda@2026 |
| carla.souza@outlook.com   | Onda@2026 |
| daniel.santos@company.com | Onda@2026 |
| eduarda.lima@fintech.io   | Onda@2026 |
| gabi.rocha@onda.com       | Onda@2026 |
| h.melo@freelance.com      | Onda@2026 |
| isabela.m@agency.com      | Onda@2026 |

<h2 id="security"> 🛡 Segurança </h2>

No front-end o código inerentemente acessível, porém, é possível dificultar esse
acesso com certas práticas:

<h3 id="engenharia-reversa"> 👨‍🔧 Engenharia reversa</h3>

- Ofuscação de código: minificção e concatenação de código, dificulta a leitura
  e compreenção da lógica por terceiros, normalmente isso é realizado durante o
  build do Vite
- Variáveis de Ambiente: Informações sensíveis, como chaves de API e URLs de serviços
  exteros devem ser guardados em arquivos `.env` que NÂO de devem ser enviados ao
  repositório
- Lógica Sensível no Server-Side: cálculos críticos de saldo e validações de permissões
  devem ser processados exclusivamente no backend (em uma implementação real)
- Desabilitar Atalhos: Desabilitar atalhos que abram a Devtools e o menu suspenso do mouse, dificultam o acesso ao códigoo (pode prejudiar a experiência do usuário)

<h3 id="vazamento-de-dados"> 🎲 Vazamento de dados</h3>

- Validação Rigorosa com Zod: Todos os dados de entrada são validados através de schemas estritos. Isso impede ataques de Injection e garante que apenas dados no formato esperado sejam processados.

- Sanitização de Dados: Implementação de limpeza de inputs para evitar ataques de Cross-Site Scripting (XSS), impedindo a execução de scripts maliciosos no navegador de outros usuários.

<h2 id="testing"> 🧪 Testes </h2>

```
1. npm run test
```

<h2 id="tecnical-decision"> Decisões técnicas adotadas </h2>

O projeto foi desenvolvido seguindo a stack tecnológica padrão da organização

Simulação de Persistência (Mock): Devido à ausência de um backend real, foi desenvolvida uma camada de Service que utiliza o LocalStorage. Isso permite que o usuário faça simulações realistas de pagamentos e tenha um feedback.

<h2 id="future-improves"> Melhorias futuras </h2>

- Integração com Backend Real: Substituir a camada de Mock no LocalStorage por endpoints reais de uma API.

- Dashboard com Gráficos: Adicionar uma visualização gráfica para exibir o fluxo de entrada e saída por categoria.

- Internacionalização (i18n): Suporte para múltiplos idiomas e moedas..

- PWA (Progressive Web App): Configurar o projeto para ser instalável no celular e funcionar offline, melhorando a experiência do usuário.

<h2 id="autor"> 👨‍💻 Autor </h2>

<a href="https://github.com/Epiled">

![Felindo](https://user-images.githubusercontent.com/55258483/178338085-2cea8bf2-6d0c-409a-9d0e-23359b7d303e.png)
<br />
<sub><b>Felipe De Andrade</b></sub></a>

Feito por Felipe De Andrade 👋🏽 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Felipe-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/fademendonca/)](https://www.linkedin.com/in/fademendonca/)
[![Gmail Badge](https://img.shields.io/badge/-felipe.deam98@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:felipe.deam98@gmail.com)](mailto:felipe.deam98@gmail.com)
