using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaAA.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Clientes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    CpfCnpj = table.Column<string>(type: "text", nullable: false),
                    Telefone = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Endereco = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clientes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PartesContrarias",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    CnpjCpf = table.Column<string>(type: "text", nullable: false),
                    Observacoes = table.Column<string>(type: "text", nullable: true),
                    Tipo = table.Column<string>(type: "text", nullable: false),
                    Setor = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartesContrarias", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<int>(type: "integer", nullable: false),
                    SupabaseAuthId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Processos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    NumeroProcesso = table.Column<string>(type: "text", nullable: true),
                    TipoAcao = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    FaseDoProcesso = table.Column<string>(type: "text", nullable: true),
                    Admissao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Demissao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Sindicato = table.Column<bool>(type: "boolean", nullable: false),
                    Pedidos = table.Column<List<string>>(type: "text[]", nullable: false),
                    VaraDoTrabalho = table.Column<string>(type: "text", nullable: true),
                    UF = table.Column<string>(type: "text", nullable: true),
                    ValorCausa = table.Column<decimal>(type: "numeric", nullable: false),
                    DataCriacao = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DataDeProcuracao = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DataDeProtocolo = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DataArquivamento = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    MotivoArquivamento = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    MesDoMarketing = table.Column<string>(type: "text", nullable: true),
                    CaptadorId = table.Column<Guid>(type: "uuid", nullable: false),
                    ResponsavelId = table.Column<Guid>(type: "uuid", nullable: false),
                    AdvogadoResponsavelId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Processos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Processos_Usuarios_AdvogadoResponsavelId",
                        column: x => x.AdvogadoResponsavelId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Processos_Usuarios_CaptadorId",
                        column: x => x.CaptadorId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Processos_Usuarios_ResponsavelId",
                        column: x => x.ResponsavelId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ClienteProcesso",
                columns: table => new
                {
                    ClientesId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProcessosId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClienteProcesso", x => new { x.ClientesId, x.ProcessosId });
                    table.ForeignKey(
                        name: "FK_ClienteProcesso_Clientes_ClientesId",
                        column: x => x.ClientesId,
                        principalTable: "Clientes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClienteProcesso_Processos_ProcessosId",
                        column: x => x.ProcessosId,
                        principalTable: "Processos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ParteContrariaProcesso",
                columns: table => new
                {
                    PartesContrariasId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProcessosId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParteContrariaProcesso", x => new { x.PartesContrariasId, x.ProcessosId });
                    table.ForeignKey(
                        name: "FK_ParteContrariaProcesso_PartesContrarias_PartesContrariasId",
                        column: x => x.PartesContrariasId,
                        principalTable: "PartesContrarias",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ParteContrariaProcesso_Processos_ProcessosId",
                        column: x => x.ProcessosId,
                        principalTable: "Processos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClienteProcesso_ProcessosId",
                table: "ClienteProcesso",
                column: "ProcessosId");

            migrationBuilder.CreateIndex(
                name: "IX_ParteContrariaProcesso_ProcessosId",
                table: "ParteContrariaProcesso",
                column: "ProcessosId");

            migrationBuilder.CreateIndex(
                name: "IX_Processos_AdvogadoResponsavelId",
                table: "Processos",
                column: "AdvogadoResponsavelId");

            migrationBuilder.CreateIndex(
                name: "IX_Processos_CaptadorId",
                table: "Processos",
                column: "CaptadorId");

            migrationBuilder.CreateIndex(
                name: "IX_Processos_ResponsavelId",
                table: "Processos",
                column: "ResponsavelId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClienteProcesso");

            migrationBuilder.DropTable(
                name: "ParteContrariaProcesso");

            migrationBuilder.DropTable(
                name: "Clientes");

            migrationBuilder.DropTable(
                name: "PartesContrarias");

            migrationBuilder.DropTable(
                name: "Processos");

            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
