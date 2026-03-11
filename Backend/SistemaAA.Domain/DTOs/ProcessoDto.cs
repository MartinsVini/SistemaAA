using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using SistemaAA.Domain.Entities;

namespace SistemaAA.Domain.DTOs
{
    public class ProcessoDto
    {
        public Guid Id { get; set; }
        public string? NumeroProcesso { get; set; }

        [Required(ErrorMessage = "O tipo de ação é obrigatório")]
        public string TipoAcao { get; set; } = string.Empty;

        public ProcessoStatus Status { get; set; }
        public string? FaseDoProcesso { get; set; }

        public DateTime? Admissao { get; set; }
        public DateTime? Demissao { get; set; }

        public bool Sindicato { get; set; }
        public List<string> Pedidos { get; set; } = new();
        public string? VaraDoTrabalho { get; set; }
        public string? UF { get; set; }
        public decimal ValorCausa { get; set; }

        public DateTime DataCriacao { get; set; }
        public DateTime? DataDeProcuracao { get; set; }
        public DateTime? DataDeProtocolo { get; set; }
        public DateTime? DataArquivamento { get; set; }
        public string? MotivoArquivamento { get; set; }
        public string? MesDoMarketing { get; set; }

        [Required]
        public Guid CaptadorId { get; set; }
        
        [Required]
        public Guid ResponsavelId { get; set; }
        
        public Guid? AdvogadoResponsavelId { get; set; }
        
        public List<Guid> ClienteIds { get; set; } = new();
        public List<Guid> ParteContrariaIds { get; set; } = new();
    }
}
