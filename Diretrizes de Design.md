# **DESIGN GUIDELINES & UI**

## **1\. Identidade Visual (Cores)**

Paleta sóbria, focada em contraste e leitura confortável, com detalhes modernos e tecnológicos.

* **Primary (Preto Absoluto):** \#09090b \- Utilizado em backgrounds principais no Dark Mode, ou textos principais no Light Mode.  
* **Accent (Roxo Elétrico):** \#7c3aed \- Utilizado EXCLUSIVAMENTE para Call to Actions (CTAs), botões primários, links ativos e highlights de status concluídos.  
* **Background/Surface (Branco e Cinzas):**  
  * Fundo principal: \#ffffff  
  * Superfícies (Cards/Modais): \#f4f4f5  
  * Bordas/Divisores: \#e4e4e7  
* **Feedback Colors (Padrão):**  
  * Sucesso: \#10b981 (Verde Esmeralda)  
  * Erro/Alerta: \#ef4444 (Vermelho)

## **2\. Tipografia**

* **UI e Textos Correntes:** Inter (Fontes sem serifa, legibilidade máxima).  
  * Títulos: Semibold (600) ou Bold (700).  
  * Corpo de texto: Regular (400).  
* **Dados Financeiros, Processos e Comissões:** JetBrains Mono.  
  * Justificativa: Facilita o alinhamento de números em tabelas e extratos.

## **3\. Espaçamento, Bordas e Sombras (Padrão shadcn/ui)**

* **Border Radius:** 8px (Ligeiramente arredondado para ser amigável, mas profissional).  
* **Sombras:** Muito leves. box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px \-1px rgb(0 0 0 / 0.1);. Sem excesso de profundidade ("Flat design" aprimorado).  
* **Espaçamentos (Gaps/Paddings):** Múltiplos de 4 ou 8 (ex: 8px, 16px, 24px, 32px) para manter ritmo vertical e horizontal perfeito.

## **4\. Componentes Base Recomendados**

A equipa de frontend (Angular) deve basear-se no aspeto visual e nas interações do **shadcn/ui** (adaptando para Angular ou utilizando bibliotecas como spartan/ui).

* **Tabelas (DataTables):** Extremamente limpas, linhas divisórias apenas em baixo das rows (sem linhas verticais). Paginação simples e caixa de pesquisa robusta.  
* **Kanban Board:** Cards com fundo \#ffffff, borda sutil \#e4e4e7. Quando arrastados (drag & drop), aplicar um leve box-shadow roxo.  
* **Formulários:** Labels sempre acima do input. Inputs com altura de 40px (h-10 no Tailwind). Foco no input deve alterar a borda para Roxo \#7c3aed e adicionar um anel (ring) suave da mesma cor.