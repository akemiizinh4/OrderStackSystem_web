# Backend do OrderStack System (Java puro) para rodar no Render.
# Etapa 1: compila os arquivos .java
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app
COPY backend ./backend
RUN javac -d out $(find backend -name "*.java")

# Etapa 2: imagem final, so com o Java necessario para rodar
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/out ./out
# O Render informa a porta pela variavel PORT; 8080 e o padrao local.
ENV PORT=8080
EXPOSE 8080
CMD ["java", "-cp", "out", "backend.application.Main", "--servidor"]
