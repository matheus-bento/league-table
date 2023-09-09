# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY *.sln .
COPY src/LeagueTable/LeagueTable.csproj ./src/LeagueTable/
COPY src/LeagueTable.Dao/LeagueTable.Dao.csproj ./src/LeagueTable.Dao/
RUN dotnet restore

# copy everything else and build app
COPY src/. ./src/
WORKDIR /source/src/LeagueTable
RUN dotnet publish -c release -o /app --no-restore /restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "LeagueTable.dll"]
