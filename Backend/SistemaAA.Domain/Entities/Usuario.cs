using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace SistemaAA.Domain.Entities
{
    public enum Role
    {
        Admin,
        Captador,
        Estagiario,
        Advogado
    }

    public class Usuario : IdentityUser<Guid>
    {
        public required string Nome { get; set; }
        public Role Role { get; set; }

        // Relacionamentos
        public ICollection<Processo> ProcessosCaptados { get; set; } = new List<Processo>();
        public ICollection<Processo> ProcessosResponsaveis { get; set; } = new List<Processo>();
    }
}
