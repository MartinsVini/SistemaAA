using System;

namespace SistemaAA.Domain.Entities
{
    public class Documento
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        
        /// <summary>
        /// Nome original do arquivo (com extensão), ex: "peticao-inicial.pdf"
        /// </summary>
        public required string NomeOriginal { get; set; }
        
        /// <summary>
        /// Caminho relativo ou absoluto interno do arquivo salvo em disco
        /// </summary>
        public required string CaminhoArquivo { get; set; }
        
        /// <summary>
        /// Tipo MIME, ex: "application/pdf" ou "image/png"
        /// </summary>
        public required string TipoConteudo { get; set; }
        
        /// <summary>
        /// Tamanho do arquivo em bytes
        /// </summary>
        public long TamanhoBytes { get; set; }
        
        public DateTime DataUpload { get; set; } = DateTime.UtcNow;

        // Chave Estrangeira OBRIGATÓRIA (sempre atrelado a algo)
        // No MVP, vamos atrelar tudo diretamente ao Processo.
        public Guid ProcessoId { get; set; }
        public Processo? Processo { get; set; }
    }
}
