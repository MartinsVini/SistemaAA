using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using SistemaAA.Domain.Entities;

namespace SistemaAA.Domain.DTOs
{
    public class ParteContrariaDto
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "CNPJ/CPF é obrigatório")]
        public string CnpjCpf { get; set; } = string.Empty;

        public string? Observacoes { get; set; }

        [Required(ErrorMessage = "O tipo é obrigatório")]
        public string Tipo { get; set; } = string.Empty; // Bancario, Comum

        public string? Setor { get; set; }
    }
}
