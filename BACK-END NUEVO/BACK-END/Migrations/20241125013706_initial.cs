﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BACK_END.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Productividad",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Productividad", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Habitos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Frecuencia = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Hora = table.Column<TimeSpan>(type: "time", nullable: false),
                    diasRepeticiones = table.Column<int>(type: "int", nullable: false),
                    ProductividadId = table.Column<int>(type: "int", nullable: false),
                    Recordatorio = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Habitos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Habitos_Productividad_ProductividadId",
                        column: x => x.ProductividadId,
                        principalTable: "Productividad",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Habitos_ProductividadId",
                table: "Habitos",
                column: "ProductividadId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Habitos");

            migrationBuilder.DropTable(
                name: "Productividad");
        }
    }
}
