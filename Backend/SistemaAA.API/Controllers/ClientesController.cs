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
    public class ClientesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ClientesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClienteDto>>> GetClientes()
        {
            var clientes = await _context.Clientes
                .Select(c => new ClienteDto
                {
                    Id = c.Id,
                    Nome = c.Nome,
                    CpfCnpj = c.CpfCnpj,
                    Email = c.Email,
                    Telefone = c.Telefone,
                    Endereco = c.Endereco
                })
                .ToListAsync();

            return Ok(clientes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ClienteDto>> GetCliente(Guid id)
        {
            var c = await _context.Clientes.FindAsync(id);

            if (c == null)
            {
                return NotFound();
            }

            return Ok(new ClienteDto
            {
                Id = c.Id,
                Nome = c.Nome,
                CpfCnpj = c.CpfCnpj,
                Email = c.Email,
                Telefone = c.Telefone,
                Endereco = c.Endereco
            });
        }

        [HttpPost]
        public async Task<ActionResult<ClienteDto>> PostCliente([FromBody] ClienteDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var cliente = new Cliente
            {
                Id = Guid.NewGuid(),
                Nome = dto.Nome,
                CpfCnpj = dto.CpfCnpj,
                Email = dto.Email,
                Telefone = dto.Telefone,
                Endereco = dto.Endereco
            };

            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();

            dto.Id = cliente.Id;

            return CreatedAtAction(nameof(GetCliente), new { id = cliente.Id }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCliente(Guid id, [FromBody] ClienteDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest("ID não corresponde");
            }

            var cliente = await _context.Clientes.FindAsync(id);
            if (cliente == null)
                return NotFound();

            cliente.Nome = dto.Nome;
            cliente.CpfCnpj = dto.CpfCnpj;
            cliente.Telefone = dto.Telefone;
            cliente.Email = dto.Email;
            cliente.Endereco = dto.Endereco;

            _context.Entry(cliente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClienteExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCliente(Guid id)
        {
            var cliente = await _context.Clientes.FindAsync(id);
            if (cliente == null)
            {
                return NotFound();
            }

            _context.Clientes.Remove(cliente);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClienteExists(Guid id)
        {
            return _context.Clientes.Any(e => e.Id == id);
        }
    }
}
