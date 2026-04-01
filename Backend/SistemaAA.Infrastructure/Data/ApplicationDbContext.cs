using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SistemaAA.Domain.Entities;
using System;

namespace SistemaAA.Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext<Usuario, IdentityRole<Guid>, Guid>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<ParteContraria> PartesContrarias { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Processo> Processos { get; set; }
        public DbSet<Documento> Documentos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // N:M Cliente <-> Processo (Trabalhista Coletivo)
            modelBuilder.Entity<Processo>()
                .HasMany(p => p.Clientes)
                .WithMany(c => c.Processos)
                .UsingEntity(j => j.ToTable("ClienteProcesso"));

            // N:M ParteContraria <-> Processo (Múltiplas reclamadas)
            modelBuilder.Entity<Processo>()
                .HasMany(p => p.PartesContrarias)
                .WithMany(pc => pc.Processos)
                .UsingEntity(j => j.ToTable("ParteContrariaProcesso"));

            // 1:N Processo -> Documentos
            modelBuilder.Entity<Documento>()
                .HasOne(d => d.Processo)
                .WithMany(p => p.Documentos)
                .HasForeignKey(d => d.ProcessoId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configurar Delete Behavior para os usuários (Evitar exclusão em cascata)
            modelBuilder.Entity<Processo>()
                .HasOne(p => p.Captador)
                .WithMany(u => u.ProcessosCaptados)
                .HasForeignKey(p => p.CaptadorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Processo>()
                .HasOne(p => p.Responsavel)
                .WithMany(u => u.ProcessosResponsaveis)
                .HasForeignKey(p => p.ResponsavelId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Processo>()
                .HasOne(p => p.AdvogadoResponsavel)
                .WithMany()
                .HasForeignKey(p => p.AdvogadoResponsavelId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
