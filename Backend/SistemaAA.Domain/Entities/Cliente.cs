using System;
using System.Collections.Generic;

namespace SistemaAA.Domain.Entities
{
    public class Cliente
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Nome { get; set; }
        public required string CpfCnpj { get; set; }
        public required string Telefone { get; set; }
        public required string Email { get; set; }
        public string? Endereco { get; set; }

        // Relacionamentos
        public ICollection<Processo> Processos { get; set; } = new List<Processo>();
    }
}
