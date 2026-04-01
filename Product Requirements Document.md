# **PRD (Product Requirements Document)**

## **1\. Visão Geral**

Sistema interno de gestão processual e financeira construído com base em DDD (Domain-Driven Design), .NET 10 (C\# 14\) e Angular 21, preparando o terreno para uma futura escalabilidade como SaaS B2B.

## **2\. Personas e Permissões (RBAC)**

* **Admin/Sócio:** Acesso total. Vê todos os processos, configura regras de comissão, extrai relatórios financeiros globais.  
* **Captador:** Acesso restrito de criação. Só visualiza os clientes/processos que ele mesmo captou e as suas respetivas comissões a receber.  
* **Estagiário:** Acesso operacional. Visualiza a fila de processos pendentes, edita dados processuais, faz upload de peças e atualiza status. Não vê dados financeiros sensíveis.

## **3\. User Stories**

* **US01:** Como Captador, quero submeter os dados básicos e documentos de um novo lead num formulário rápido, para que ele entre na fila do estagiário instantaneamente.  
* **US02:** Como Estagiário, quero ver um quadro (Kanban) com as petições iniciais pendentes, para saber exatamente o que preciso redigir hoje.  
* **US03:** Como Sócio, quero abrir o perfil de um cliente e ver todo o histórico (documentos, parte contrária, estagiário responsável, valor de comissão), para não ter de perguntar no WhatsApp.  
* **US04:** Como Sócio, quero que o sistema calcule a comissão do captador X com base na regra Y configurada, para não ter de usar Excel no final do mês.

## **4\. Requisitos Funcionais**

* **RF01:** Gestão de Entidades 360º (CRUD avançado e relacional para Clientes, Partes Contrárias, Captadores, Advogados e Processos).  
* **RF02:** Workflow Kanban (Colunas sugeridas: Entrada, Triagem, Redação Inicial, Revisão, Protocolado).  
* **RF03:** Motor de Comissões (Interface para cadastrar percentagens ou valores fixos por tipo de processo/captador, gerando contas correntes automáticas).  
* **RF04:** Gestão de Documentos anexa ao Processo/Cliente.  
* **RF05:** Dashboard de Produtividade (Processos ajuizados na semana, Gargalos, Comissões a pagar).

## **5\. Requisitos Não-Funcionais**

* **Frontend:** Angular 21 (Standalone components, Signals para gestão de estado).  
* **Backend:** C\# 14, .NET 10 Web API.  
* **Arquitetura:** Domain-Driven Design (DDD) com separação clara entre Domain, Application, Infrastructure e Presentation.  
* **Base de Dados:** PostgreSQL via Entity Framework Core 10\.  
* **Performance:** Carregamento de listas com paginação no servidor e tempo de resposta de APIs abaixo de 200ms.

## **6\. Integrações

* **Auth:** Autenticação e gestão de sessões via identity  (JWT integrado ao .NET).  
* **Storage:** Upload de PDFs e imagens iniciais, guardando apenas a URL no PostgreSQL.

## **7\. Edge Cases (Casos Limite) e Tratamento**

* *Dois captadores dividem o mesmo cliente:* O sistema deve permitir divisão (split) de comissão (ex: 50/50).  
* *Estagiário ausente:* O Sócio ou Admin deve poder reatribuir o card do processo em massa para outro estagiário.  
* *Mudança de regra de comissão:* Alterações numa regra de comissão não devem recalcular/afetar processos do passado (imutabilidade de registos financeiros antigos).

## **8\. Critérios de Aceitação**

* A aplicação compila e roda sem erros no pipeline.  
* O fluxo de criação de processo gera notificações visuais em tempo real na tela do estagiário logado.  
* Nenhuma entidade de base de dados é excluída fisicamente (Soft Delete obrigatório).