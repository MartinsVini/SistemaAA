using System;

namespace SistemaAA.Domain.DTOs
{
    public class DocumentoDto
    {
        public Guid Id { get; set; }
        public required string NomeOriginal { get; set; }
        public required string UrlAcesso { get; set; }
        public required string TipoConteudo { get; set; }
        public long TamanhoBytes { get; set; }
        public DateTime DataUpload { get; set; }
    }
}
