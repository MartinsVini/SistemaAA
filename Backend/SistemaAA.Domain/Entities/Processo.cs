using System;

namespace SistemaAA.Domain.Entities
{
    public enum ProcessoStatus
    {
        Entrada,
        Triagem,
        RedacaoInicial,
        Revisao,
        Protocolado
    }

    public class Processo
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string? NumeroProcesso { get; set; } // Pode ser nulo antes do protocolo
        public required string TipoAcao { get; set; } // Essencial para regras de comissão (RF03) e filtros
        public ProcessoStatus Status { get; set; } = ProcessoStatus.Entrada;
        
        // Fases do Processo (Distinto do Status do Kanban)
        public string? FaseDoProcesso { get; set; } // Ex: Conhecimento, Recursal, Execução
        
        // Dados Trabalhistas
        public DateTime? Admissao { get; set; }
        public DateTime? Demissao { get; set; }
        public decimal AnosDeVinculo => Admissao.HasValue && Demissao.HasValue 
            ? Math.Round((decimal)(Demissao.Value - Admissao.Value).TotalDays / 365.25m, 2) 
            : 0;
            
        public bool Sindicato { get; set; } // O processo é do Sindicato?
        public List<string> Pedidos { get; set; } = new(); // Múltiplos pedidos (vetor)
        public string? VaraDoTrabalho { get; set; }
        public string? UF { get; set; }
        public decimal ValorCausa { get; set; }
        
        // Datas Importantes
        public DateTime DataCriacao { get; set; } = DateTime.UtcNow;
        public DateTime? DataDeProcuracao { get; set; }
        public DateTime? DataDeProtocolo { get; set; }
        public DateTime? DataArquivamento { get; set; }
        public string? MotivoArquivamento { get; set; }
        public DateTime? UpdatedAt { get; set; }
        
        // Derivado
        public int DiasNoEscritorio => DataDeProcuracao.HasValue 
            ? (int)((DataArquivamento ?? DateTime.UtcNow) - DataDeProcuracao.Value).TotalDays 
            : 0;

        // Marketing
        // Marketing / Captação
        public string? MesDoMarketing { get; set; } // Ex: "03/2026"

        // Chaves Estrangeiras (Relacionamento N:1)
        public Guid CaptadorId { get; set; } // Quem trouxe o cliente
        public Guid ResponsavelId { get; set; } // Estagiário
        public Guid? AdvogadoResponsavelId { get; set; } // Advogado

        // Navegabilidade
        public ICollection<Cliente> Clientes { get; set; } = new List<Cliente>();
        public ICollection<ParteContraria> PartesContrarias { get; set; } = new List<ParteContraria>();
        public Usuario? Captador { get; set; }
        public Usuario? Responsavel { get; set; }
        public Usuario? AdvogadoResponsavel { get; set; }
    }
}
