using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace SistemaAA.API.Services
{
    public interface ILocalStorageService
    {
        /// <summary>
        /// Salva um arquivo recebido via upload e retorna o caminho relativo para ser guardado no banco.
        /// </summary>
        /// <param name="arquivo">O arquivo recebido via HTTP.</param>
        /// <param name="subDiretorio">Subdiretório opcional (ex: "processos/2026/03").</param>
        /// <returns>Caminho relativo do arquivo salvo.</returns>
        Task<string> SalvarArquivoAsync(IFormFile arquivo, string subDiretorio = "");

        /// <summary>
        /// Deleta um arquivo físico armazenado.
        /// </summary>
        /// <param name="caminhoRelativo">O caminho relativo do arquivo.</param>
        Task DeletarArquivoAsync(string caminhoRelativo);
    }
}
