using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaAA.Domain.DTOs;
using SistemaAA.Domain.Entities;
using SistemaAA.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaAA.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProcessosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProcessosController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProcessoDto>>> GetProcessos()
        {
            var processos = await _context.Processos
                .Include(p => p.Clientes)
                .Include(p => p.PartesContrarias)
                .Select(p => new ProcessoDto
                {
                    Id = p.Id,
                    NumeroProcesso = p.NumeroProcesso,
                    TipoAcao = p.TipoAcao,
                    Status = p.Status,
                    FaseDoProcesso = p.FaseDoProcesso,
                    Admissao = p.Admissao,
                    Demissao = p.Demissao,
                    Sindicato = p.Sindicato,
                    Pedidos = p.Pedidos,
                    VaraDoTrabalho = p.VaraDoTrabalho,
                    UF = p.UF,
                    ValorCausa = p.ValorCausa,
                    DataCriacao = p.DataCriacao,
                    DataDeProcuracao = p.DataDeProcuracao,
                    DataDeProtocolo = p.DataDeProtocolo,
                    DataArquivamento = p.DataArquivamento,
                    MotivoArquivamento = p.MotivoArquivamento,
                    MesDoMarketing = p.MesDoMarketing,
                    CaptadorId = p.CaptadorId,
                    ResponsavelId = p.ResponsavelId,
                    AdvogadoResponsavelId = p.AdvogadoResponsavelId,
                    ClienteIds = p.Clientes.Select(c => c.Id).ToList(),
                    ParteContrariaIds = p.PartesContrarias.Select(pc => pc.Id).ToList()
                })
                .ToListAsync();

            return Ok(processos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProcessoDto>> GetProcesso(Guid id)
        {
            var p = await _context.Processos
                .Include(p => p.Clientes)
                .Include(p => p.PartesContrarias)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (p == null)
            {
                return NotFound();
            }

            return Ok(new ProcessoDto
            {
                Id = p.Id,
                NumeroProcesso = p.NumeroProcesso,
                TipoAcao = p.TipoAcao,
                Status = p.Status,
                FaseDoProcesso = p.FaseDoProcesso,
                Admissao = p.Admissao,
                Demissao = p.Demissao,
                Sindicato = p.Sindicato,
                Pedidos = p.Pedidos,
                VaraDoTrabalho = p.VaraDoTrabalho,
                UF = p.UF,
                ValorCausa = p.ValorCausa,
                DataCriacao = p.DataCriacao,
                DataDeProcuracao = p.DataDeProcuracao,
                DataDeProtocolo = p.DataDeProtocolo,
                DataArquivamento = p.DataArquivamento,
                MotivoArquivamento = p.MotivoArquivamento,
                MesDoMarketing = p.MesDoMarketing,
                CaptadorId = p.CaptadorId,
                ResponsavelId = p.ResponsavelId,
                AdvogadoResponsavelId = p.AdvogadoResponsavelId,
                ClienteIds = p.Clientes.Select(c => c.Id).ToList(),
                ParteContrariaIds = p.PartesContrarias.Select(pc => pc.Id).ToList()
            });
        }

        [HttpPost]
        public async Task<ActionResult<ProcessoDto>> PostProcesso([FromBody] ProcessoDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var processo = new Processo
            {
                Id = Guid.NewGuid(),
                NumeroProcesso = dto.NumeroProcesso,
                TipoAcao = dto.TipoAcao,
                Status = dto.Status,
                FaseDoProcesso = dto.FaseDoProcesso,
                Admissao = dto.Admissao,
                Demissao = dto.Demissao,
                Sindicato = dto.Sindicato,
                Pedidos = dto.Pedidos,
                VaraDoTrabalho = dto.VaraDoTrabalho,
                UF = dto.UF,
                ValorCausa = dto.ValorCausa,
                DataCriacao = DateTime.UtcNow,
                DataDeProcuracao = dto.DataDeProcuracao,
                DataDeProtocolo = dto.DataDeProtocolo,
                DataArquivamento = dto.DataArquivamento,
                MotivoArquivamento = dto.MotivoArquivamento,
                MesDoMarketing = dto.MesDoMarketing,
                CaptadorId = dto.CaptadorId,
                ResponsavelId = dto.ResponsavelId,
                AdvogadoResponsavelId = dto.AdvogadoResponsavelId
            };

            if (dto.ClienteIds.Any())
            {
                var clientes = await _context.Clientes.Where(c => dto.ClienteIds.Contains(c.Id)).ToListAsync();
                processo.Clientes = clientes;
            }

            if (dto.ParteContrariaIds.Any())
            {
                var partesContrarias = await _context.PartesContrarias.Where(pc => dto.ParteContrariaIds.Contains(pc.Id)).ToListAsync();
                processo.PartesContrarias = partesContrarias;
            }

            _context.Processos.Add(processo);
            await _context.SaveChangesAsync();

            dto.Id = processo.Id;

            return CreatedAtAction(nameof(GetProcesso), new { id = processo.Id }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProcesso(Guid id, [FromBody] ProcessoDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest("ID não corresponde");
            }

            var processo = await _context.Processos
                .Include(p => p.Clientes)
                .Include(p => p.PartesContrarias)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (processo == null)
                return NotFound();

            processo.NumeroProcesso = dto.NumeroProcesso;
            processo.TipoAcao = dto.TipoAcao;
            processo.Status = dto.Status;
            processo.FaseDoProcesso = dto.FaseDoProcesso;
            processo.Admissao = dto.Admissao;
            processo.Demissao = dto.Demissao;
            processo.Sindicato = dto.Sindicato;
            processo.Pedidos = dto.Pedidos;
            processo.VaraDoTrabalho = dto.VaraDoTrabalho;
            processo.UF = dto.UF;
            processo.ValorCausa = dto.ValorCausa;
            processo.DataDeProcuracao = dto.DataDeProcuracao;
            processo.DataDeProtocolo = dto.DataDeProtocolo;
            processo.DataArquivamento = dto.DataArquivamento;
            processo.MotivoArquivamento = dto.MotivoArquivamento;
            processo.MesDoMarketing = dto.MesDoMarketing;
            processo.CaptadorId = dto.CaptadorId;
            processo.ResponsavelId = dto.ResponsavelId;
            processo.AdvogadoResponsavelId = dto.AdvogadoResponsavelId;
            processo.UpdatedAt = DateTime.UtcNow;

            processo.Clientes.Clear();
            if (dto.ClienteIds.Any())
            {
                var clientes = await _context.Clientes.Where(c => dto.ClienteIds.Contains(c.Id)).ToListAsync();
                foreach(var c in clientes) processo.Clientes.Add(c);
            }

            processo.PartesContrarias.Clear();
            if (dto.ParteContrariaIds.Any())
            {
                var partes = await _context.PartesContrarias.Where(pc => dto.ParteContrariaIds.Contains(pc.Id)).ToListAsync();
                foreach(var pc in partes) processo.PartesContrarias.Add(pc);
            }

            _context.Entry(processo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProcessoExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProcesso(Guid id)
        {
            var processo = await _context.Processos.FindAsync(id);
            if (processo == null)
            {
                return NotFound();
            }

            _context.Processos.Remove(processo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProcessoExists(Guid id)
        {
            return _context.Processos.Any(e => e.Id == id);
        }
    }
}
