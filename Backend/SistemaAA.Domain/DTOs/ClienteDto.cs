using System;
using System.ComponentModel.DataAnnotations;

namespace SistemaAA.Domain.DTOs
{
    public class ClienteDto
    {
        public Guid Id { get; set; }
        
        [Required(ErrorMessage = "O nome é obrigatório")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "CPF/CNPJ é obrigatório")]
        public string CpfCnpj { get; set; } = string.Empty;

        public string Telefone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Endereco { get; set; }
    }
}
