using System;
using System.Collections.Generic;

namespace SistemaAA.Domain.Entities
{
    public class ParteContraria
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Nome { get; set; }
        public required string CnpjCpf { get; set; }
        public string? Observacoes { get; set; }
        public required string Tipo { get; set; } // Bancario, Comum
        public string? Setor { get; set; } // Bancario, Frigorifico, etc

        // Relacionamentos
        public ICollection<Processo> Processos { get; set; } = new List<Processo>();
    }
}
