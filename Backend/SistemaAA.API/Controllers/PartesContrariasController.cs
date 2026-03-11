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
    public class PartesContrariasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PartesContrariasController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ParteContrariaDto>>> GetPartesContrarias()
        {
            var partes = await _context.PartesContrarias
                .Select(p => new ParteContrariaDto
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    CnpjCpf = p.CnpjCpf,
                    Observacoes = p.Observacoes,
                    Tipo = p.Tipo,
                    Setor = p.Setor
                })
                .ToListAsync();

            return Ok(partes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ParteContrariaDto>> GetParteContraria(Guid id)
        {
            var p = await _context.PartesContrarias.FindAsync(id);

            if (p == null)
            {
                return NotFound();
            }

            return Ok(new ParteContrariaDto
            {
                Id = p.Id,
                Nome = p.Nome,
                CnpjCpf = p.CnpjCpf,
                Observacoes = p.Observacoes,
                Tipo = p.Tipo,
                Setor = p.Setor
            });
        }

        [HttpPost]
        public async Task<ActionResult<ParteContrariaDto>> PostParteContraria([FromBody] ParteContrariaDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var parte = new ParteContraria
            {
                Id = Guid.NewGuid(),
                Nome = dto.Nome,
                CnpjCpf = dto.CnpjCpf,
                Observacoes = dto.Observacoes,
                Tipo = dto.Tipo,
                Setor = dto.Setor
            };

            _context.PartesContrarias.Add(parte);
            await _context.SaveChangesAsync();

            dto.Id = parte.Id;

            return CreatedAtAction(nameof(GetParteContraria), new { id = parte.Id }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutParteContraria(Guid id, [FromBody] ParteContrariaDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest("ID não corresponde");
            }

            var parte = await _context.PartesContrarias.FindAsync(id);
            if (parte == null)
                return NotFound();

            parte.Nome = dto.Nome;
            parte.CnpjCpf = dto.CnpjCpf;
            parte.Observacoes = dto.Observacoes;
            parte.Tipo = dto.Tipo;
            parte.Setor = dto.Setor;

            _context.Entry(parte).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParteContrariaExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParteContraria(Guid id)
        {
            var parte = await _context.PartesContrarias.FindAsync(id);
            if (parte == null)
            {
                return NotFound();
            }

            _context.PartesContrarias.Remove(parte);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ParteContrariaExists(Guid id)
        {
            return _context.PartesContrarias.Any(e => e.Id == id);
        }
    }
}
