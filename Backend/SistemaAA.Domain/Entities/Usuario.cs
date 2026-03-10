using System;
using System.Collections.Generic;

namespace SistemaAA.Domain.Entities
{
    public enum Role
    {
        Admin,
        Captador,
        Estagiario,
        Advogado
    }

    public class Usuario
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Nome { get; set; }
        public Role Role { get; set; }
        
        // Link com AuthProvider (Supabase)
        public required string SupabaseAuthId { get; set; }

        // Relacionamentos
        public ICollection<Processo> ProcessosCaptados { get; set; } = new List<Processo>();
        public ICollection<Processo> ProcessosResponsaveis { get; set; } = new List<Processo>();
    }
}
