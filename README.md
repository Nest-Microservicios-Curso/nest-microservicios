# nest-microservicios
Decidí hacer este repo como seguimiento del curso: NestJS + Microservicios: Aplicaciones escalables y modulares, de [Fernando Herrera](https://github.com/Klerith) en [Udemy](https://www.udemy.com/course/nestjs-microservicios/). 
Stack, conceptos y prácticas de: NATS, Webhooks, CI/CD, Git submodules, Gateways, Docker, Kubernetes, GCloud, PosstgreSQL, Mongo, SQLite.

El curso tiene una serie de videos gratuitos que pueden ver en esta [playlist](https://youtube.com/playlist?list=PLCKuOXG0bPi0Xv_49gclxudq0A53-BR2Z&si=eXn_HLELWF9-aXOK) --* Aclaración: Aunque hay una gran porción de videos "gratis", no están todos los que sí están pagos en Udemy.

# products-ms

Para trabajar con este proyecto en modo DEV:
1. Instalar dependencias: `npm install`
2. Crear un archivo `.env` basado en `.env.example`
3. Ejecutar migración de prisma: `npx prisma migrate dev`
4. Ejecutar la aplicación: `npm run start:dev`
