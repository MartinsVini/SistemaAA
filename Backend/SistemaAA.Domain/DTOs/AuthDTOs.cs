using System;
using System.ComponentModel.DataAnnotations;
using SistemaAA.Domain.Entities;

namespace SistemaAA.Domain.DTOs
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "O nome é obrigatório")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "O email é obrigatório")]
        [EmailAddress(ErrorMessage = "O email é inválido")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "A senha é obrigatória")]
        [MinLength(6, ErrorMessage = "A senha deve ter no mínimo 6 caracteres")]
        public string Password { get; set; } = string.Empty;

        [Required]
        public Role Role { get; set; }
    }

    public class LoginDto
    {
        [Required(ErrorMessage = "O email é obrigatório")]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "A senha é obrigatória")]
        public string Password { get; set; } = string.Empty;
    }

    public class AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public string Expiration { get; set; } = string.Empty;
        public Guid UserId { get; set; }
        public string Nome { get; set; } = string.Empty;
        public Role Role { get; set; }
    }
}
