using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace SistemaAA.API.Services
{
    public class LocalStorageService : ILocalStorageService
    {
        private readonly IWebHostEnvironment _env;

        public LocalStorageService(IWebHostEnvironment env)
        {
            _env = env;
        }

        public async Task<string> SalvarArquivoAsync(IFormFile arquivo, string subDiretorio = "")
        {
            if (arquivo == null || arquivo.Length == 0)
                throw new ArgumentException("Arquivo inválido vazia.");

            // Criar nome de arquivo único para evitar colisões
            var extensao = Path.GetExtension(arquivo.FileName);
            var nomeArquivoUnico = $"{Guid.NewGuid()}{extensao}";

            // Pasta base é "wwwroot/uploads" se no webroot, ou apenas um diretório configurado. 
            // Para .NET padrão, usar o WebRootPath. Se não tiver wwwroot, criamos uma pasta na raiz.
            var pastaBase = string.IsNullOrWhiteSpace(_env.WebRootPath) 
                ? Path.Combine(_env.ContentRootPath, "uploads")
                : Path.Combine(_env.WebRootPath, "uploads");

            if (!string.IsNullOrWhiteSpace(subDiretorio))
            {
                pastaBase = Path.Combine(pastaBase, subDiretorio);
            }

            if (!Directory.Exists(pastaBase))
            {
                Directory.CreateDirectory(pastaBase);
            }

            var caminhoCompleto = Path.Combine(pastaBase, nomeArquivoUnico);

            using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
            {
                await arquivo.CopyToAsync(stream);
            }

            // Retorna o caminho relativo (ex: "uploads/processos/guid.pdf") para salvar no banco
            var caminhoRelativo = string.IsNullOrWhiteSpace(subDiretorio) 
                ? $"uploads/{nomeArquivoUnico}" 
                : $"uploads/{subDiretorio.Replace('\\', '/')}/{nomeArquivoUnico}";

            return caminhoRelativo;
        }

        public Task DeletarArquivoAsync(string caminhoRelativo)
        {
            if (string.IsNullOrWhiteSpace(caminhoRelativo))
                return Task.CompletedTask;

            var pastaBase = string.IsNullOrWhiteSpace(_env.WebRootPath) 
                ? _env.ContentRootPath
                : _env.WebRootPath;

            // Transforma o caminho relativo (ex: "uploads/...") em caminho absoluto (wwwroot/uploads/...)
            var caminhoCompleto = Path.Combine(pastaBase, caminhoRelativo.Replace('/', Path.DirectorySeparatorChar));

            if (File.Exists(caminhoCompleto))
            {
                File.Delete(caminhoCompleto);
            }

            return Task.CompletedTask;
        }
    }
}
