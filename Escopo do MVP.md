# **ESCOPO DO MVP (Minimum Viable Product)**

## **O que ENTRA (Must Have)**

* **Autenticação e Perfis:** Login; Perfis de Sócio, Estagiário e Captador com restrições de ecrã (RBAC básico).  
* **Módulo de Entrada:** Formulário de captação (novo lead) com upload de até 5 documentos.  
* **Módulo Operacional:** Quadro Kanban simples para gestão do fluxo da petição inicial (Mudança de status).  
* **Módulo de Visão 360:** Ficha completa do Processo linkando Cliente, Parte Contrária e Anexos.  
* **Motor de Comissões (V1):** Cálculo de comissões com base em regras estáticas atreladas ao perfil do Captador/Advogado, gerando um extrato de pagamentos mensais.

## **O que FICA DE FORA (Out of Scope \- Foco nas fases seguintes)**

* Multi-tenant (SaaS) \- Arquitetura de base prepara para tal, mas o MVP terá apenas o *tenant* do vosso escritório.  
* Integração nativa com APIs de Tribunais (Crawlers/Webscraping).  
* Disparo de mensagens automáticas para WhatsApp ou E-mail para clientes finais.  
* Módulo complexo de faturação/emissão de faturas fiscais.  
* Aplicação Mobile Nativa (iOS/Android). O frontend Angular será responsivo para web mobile.

## **Hipóteses a Validar no MVP**

1. A interface em Angular será mais rápida e intuitiva para os estagiários do que o Notion atual.  
2. O fluxo estruturado reduzirá os erros de passagem de informação em 90%.  
3. O motor de cálculo atenderá a 95% dos cenários de comissão sem necessidade de ajustes manuais do Sócio.