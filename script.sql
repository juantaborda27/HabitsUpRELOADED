USE [master]
GO
/****** Object:  Database [HABITSUPRELOADED]    Script Date: 26/11/2024 6:35:21 p. m. ******/
CREATE DATABASE [HABITSUPRELOADED]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'HABITSUPRELOADED', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\HABITSUPRELOADED.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'HABITSUPRELOADED_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\HABITSUPRELOADED_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [HABITSUPRELOADED] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [HABITSUPRELOADED].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [HABITSUPRELOADED] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [HABITSUPRELOADED] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [HABITSUPRELOADED] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [HABITSUPRELOADED] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [HABITSUPRELOADED] SET ARITHABORT OFF 
GO
ALTER DATABASE [HABITSUPRELOADED] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [HABITSUPRELOADED] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [HABITSUPRELOADED] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [HABITSUPRELOADED] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [HABITSUPRELOADED] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [HABITSUPRELOADED] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [HABITSUPRELOADED] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [HABITSUPRELOADED] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [HABITSUPRELOADED] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [HABITSUPRELOADED] SET  ENABLE_BROKER 
GO
ALTER DATABASE [HABITSUPRELOADED] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [HABITSUPRELOADED] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [HABITSUPRELOADED] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [HABITSUPRELOADED] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [HABITSUPRELOADED] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [HABITSUPRELOADED] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [HABITSUPRELOADED] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [HABITSUPRELOADED] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [HABITSUPRELOADED] SET  MULTI_USER 
GO
ALTER DATABASE [HABITSUPRELOADED] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [HABITSUPRELOADED] SET DB_CHAINING OFF 
GO
ALTER DATABASE [HABITSUPRELOADED] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [HABITSUPRELOADED] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [HABITSUPRELOADED] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [HABITSUPRELOADED] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [HABITSUPRELOADED] SET QUERY_STORE = OFF
GO
USE [HABITSUPRELOADED]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 26/11/2024 6:35:21 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Habitos]    Script Date: 26/11/2024 6:35:21 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Habitos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](100) NOT NULL,
	[Descripcion] [nvarchar](255) NOT NULL,
	[Frecuencia] [nvarchar](50) NOT NULL,
	[Hora] [time](7) NOT NULL,
	[DiasRepeticiones] [int] NOT NULL,
	[ProductividadId] [int] NULL,
	[Recordatorio] [bit] NOT NULL,
	[fechaCreacion] [datetime2](7) NULL,
	[UsuarioId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HistorialHabitos]    Script Date: 26/11/2024 6:35:21 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistorialHabitos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[HabitosId] [int] NULL,
	[fechaCompletado] [datetime] NULL,
	[Racha] [int] NULL,
	[Recordatorio] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Productividad]    Script Date: 26/11/2024 6:35:21 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Productividad](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 26/11/2024 6:35:21 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](100) NOT NULL,
	[Correo] [nvarchar](100) NOT NULL,
	[Contraseña] [nvarchar](255) NOT NULL,
	[imagen] [nvarchar](255) NULL,
	[FechaCreacion] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241124232526_initial', N'9.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241124235628_initial', N'9.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241125002006_initial', N'9.0.0')
GO
SET IDENTITY_INSERT [dbo].[Habitos] ON 

INSERT [dbo].[Habitos] ([Id], [Nombre], [Descripcion], [Frecuencia], [Hora], [DiasRepeticiones], [ProductividadId], [Recordatorio], [fechaCreacion], [UsuarioId]) VALUES (3, N'Leer libro', N'Leer un libro cada día para mejorar mis conocimientos.', N'Diariamente', CAST(N'08:00:00' AS Time), 7, 2, 1, CAST(N'2020-11-24T21:23:56.9500000' AS DateTime2), 1)
INSERT [dbo].[Habitos] ([Id], [Nombre], [Descripcion], [Frecuencia], [Hora], [DiasRepeticiones], [ProductividadId], [Recordatorio], [fechaCreacion], [UsuarioId]) VALUES (4, N'Meditar', N'Meditación diaria para reducir el estrés.', N'Diariamente', CAST(N'05:30:00' AS Time), 7, 1, 0, CAST(N'2024-11-24T21:23:56.9500000' AS DateTime2), 1)
INSERT [dbo].[Habitos] ([Id], [Nombre], [Descripcion], [Frecuencia], [Hora], [DiasRepeticiones], [ProductividadId], [Recordatorio], [fechaCreacion], [UsuarioId]) VALUES (5, N'Planificar el día', N'Tomar 10 minutos para planificar las tareas del día.', N'Diariamente', CAST(N'07:30:00' AS Time), 7, 3, 1, CAST(N'2024-11-24T21:23:56.9500000' AS DateTime2), 1)
INSERT [dbo].[Habitos] ([Id], [Nombre], [Descripcion], [Frecuencia], [Hora], [DiasRepeticiones], [ProductividadId], [Recordatorio], [fechaCreacion], [UsuarioId]) VALUES (6, N'Tomar agua', N'Beber 2 litros de agua al día.', N'Diariamente', CAST(N'10:00:00' AS Time), 7, 1, 1, CAST(N'2024-11-24T21:23:56.9500000' AS DateTime2), NULL)
INSERT [dbo].[Habitos] ([Id], [Nombre], [Descripcion], [Frecuencia], [Hora], [DiasRepeticiones], [ProductividadId], [Recordatorio], [fechaCreacion], [UsuarioId]) VALUES (7, N'Estudiar para examen', N'Estudiar 2 horas para el examen de la próxima semana.', N'Semanalmente', CAST(N'18:00:00' AS Time), 1, 2, 1, CAST(N'2024-11-24T21:23:56.9500000' AS DateTime2), NULL)
INSERT [dbo].[Habitos] ([Id], [Nombre], [Descripcion], [Frecuencia], [Hora], [DiasRepeticiones], [ProductividadId], [Recordatorio], [fechaCreacion], [UsuarioId]) VALUES (8, N'Escribir en diario', N'Escribir en mi diario personal cada noche.', N'Diariamente', CAST(N'22:00:00' AS Time), 7, 3, 0, CAST(N'2024-11-24T21:23:56.9500000' AS DateTime2), NULL)
INSERT [dbo].[Habitos] ([Id], [Nombre], [Descripcion], [Frecuencia], [Hora], [DiasRepeticiones], [ProductividadId], [Recordatorio], [fechaCreacion], [UsuarioId]) VALUES (9, N'Estudiar Programación', N'Estudiar 2 horas al día sobre nuevas tecnologías y lenguajes de programación.', N'Diariamente', CAST(N'18:00:00' AS Time), 7, 3, 1, CAST(N'2024-11-24T21:23:56.9500000' AS DateTime2), NULL)
INSERT [dbo].[Habitos] ([Id], [Nombre], [Descripcion], [Frecuencia], [Hora], [DiasRepeticiones], [ProductividadId], [Recordatorio], [fechaCreacion], [UsuarioId]) VALUES (10, N'Correr en la playa', N'Ejercicio matutino para mejorar la salud.', N'Diariamente', CAST(N'10:00:00' AS Time), 2, 2, 0, CAST(N'2024-11-26T05:20:06.6490000' AS DateTime2), 1)
INSERT [dbo].[Habitos] ([Id], [Nombre], [Descripcion], [Frecuencia], [Hora], [DiasRepeticiones], [ProductividadId], [Recordatorio], [fechaCreacion], [UsuarioId]) VALUES (14, N'Beber agua', N'prueba', N'mensual', CAST(N'17:06:00' AS Time), 21, 2, 1, CAST(N'2024-11-26T17:03:44.3365513' AS DateTime2), 1)
SET IDENTITY_INSERT [dbo].[Habitos] OFF
GO
SET IDENTITY_INSERT [dbo].[HistorialHabitos] ON 

INSERT [dbo].[HistorialHabitos] ([Id], [HabitosId], [fechaCompletado], [Racha], [Recordatorio]) VALUES (7, 3, CAST(N'2024-11-26T01:16:56.580' AS DateTime), 2, 1)
INSERT [dbo].[HistorialHabitos] ([Id], [HabitosId], [fechaCompletado], [Racha], [Recordatorio]) VALUES (10, 4, CAST(N'2024-11-25T09:44:08.987' AS DateTime), 1, 1)
INSERT [dbo].[HistorialHabitos] ([Id], [HabitosId], [fechaCompletado], [Racha], [Recordatorio]) VALUES (11, 5, CAST(N'2024-11-26T23:22:52.500' AS DateTime), 1, 1)
SET IDENTITY_INSERT [dbo].[HistorialHabitos] OFF
GO
SET IDENTITY_INSERT [dbo].[Productividad] ON 

INSERT [dbo].[Productividad] ([Id], [Nombre]) VALUES (1, N'Salud')
INSERT [dbo].[Productividad] ([Id], [Nombre]) VALUES (2, N'Trabajo')
INSERT [dbo].[Productividad] ([Id], [Nombre]) VALUES (3, N'Estudio')
SET IDENTITY_INSERT [dbo].[Productividad] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([Id], [Nombre], [Correo], [Contraseña], [imagen], [FechaCreacion]) VALUES (1, N'Diego Yera', N'usuario@email.com', N'1234', N'ruta/a/la/imagen.png', CAST(N'2024-11-24T23:00:00.327' AS DateTime))
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Usuario__60695A19426C557D]    Script Date: 26/11/2024 6:35:21 p. m. ******/
ALTER TABLE [dbo].[Usuario] ADD UNIQUE NONCLUSTERED 
(
	[Correo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Usuario] ADD  DEFAULT (getdate()) FOR [FechaCreacion]
GO
ALTER TABLE [dbo].[Habitos]  WITH CHECK ADD  CONSTRAINT [FK_Habitos_Productividad] FOREIGN KEY([ProductividadId])
REFERENCES [dbo].[Productividad] ([Id])
GO
ALTER TABLE [dbo].[Habitos] CHECK CONSTRAINT [FK_Habitos_Productividad]
GO
ALTER TABLE [dbo].[Habitos]  WITH CHECK ADD  CONSTRAINT [FK_Habitos_Usuario] FOREIGN KEY([UsuarioId])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[Habitos] CHECK CONSTRAINT [FK_Habitos_Usuario]
GO
ALTER TABLE [dbo].[HistorialHabitos]  WITH CHECK ADD FOREIGN KEY([HabitosId])
REFERENCES [dbo].[Habitos] ([Id])
GO
USE [master]
GO
ALTER DATABASE [HABITSUPRELOADED] SET  READ_WRITE 
GO
