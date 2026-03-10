# Estágio 1: Build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copia os arquivos de projeto (todos) e restaura as dependências
COPY ["SistemaAA.API/SistemaAA.API.csproj", "SistemaAA.API/"]
COPY ["SistemaAA.Domain/SistemaAA.Domain.csproj", "SistemaAA.Domain/"]
COPY ["SistemaAA.Infrastructure/SistemaAA.Infrastructure.csproj", "SistemaAA.Infrastructure/"]
RUN dotnet restore "SistemaAA.API/SistemaAA.API.csproj"

# Copia tudo o resto e faz o build
COPY . .
WORKDIR "/src/SistemaAA.API"
RUN dotnet build "SistemaAA.API.csproj" -c Release -o /app/build

# Estágio 2: Publish
FROM build AS publish
RUN dotnet publish "SistemaAA.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Estágio 3: Runtime (Imagem final super leve)
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Copia os arquivos compilados do estágio 2
COPY --from=publish /app/publish .

# Define o que rodar ao iniciar o container
ENTRYPOINT ["dotnet", "SistemaAA.API.dll"]
