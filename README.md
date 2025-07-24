1. **NUTRI-AI Backend**

   - Nutri-AI Backend: API para gerenciamento dos macrunutrientes e gerar uma dieta personalizada de acordo com as exigências dos usuários.

2. **Tecnologias Utilizadas**
<div style="display: flex">
  <ul style="list-style: none">
    <li><img src="https://img.shields.io/badge/google%20gemini-8E75B2?style=for-the-badge&logo=google%20gemini&logoColor=white" /></li>
    <li><img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/></li>
    <li><img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/></li>
    <li><img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/></li>
    <li><img src="https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD" /></li>
    <li><img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=for-the-badge&logo=Prettier&logoColor=black"/></li>
    <li><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/></li>
    <li><img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" /></li>
    <li><img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=for-the-badge&logo=ESLint&logoColor=white"/></li>
    <li><img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" /></li>
    <li><img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"/></li>
    <li><img src="https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white"/></li>

  </ul>
</div>

3. **Instalação**

   ```bash
   git clone https://github.com/MauricioJrB/backend-nutri-ai.git
   ```

   ```bash
   cd .\backend-nutri-ai\
   ```

   ```bash
   npm install
   ```

4. **Configuração**

   - Crie um arquivo `.env` na raiz do backend com as mesmas variáveis do `.env.example`

5. **Como Executar**

   - O projeto utiliza Prisma como ORM, então utilize esse comando para definir o esquema do banco de dados:

   ```bash
   npx prisma generate
   ```

   - E em seguida para rodar o projeto:

   ```bash
   npm run dev
   ```

   - O servidor estará disponível em `http://localhost:8000`.

   - Caso escolha rodar o projeto com Docker faça:

     - 1. Matenha a variável de ambiente
          `DATABASE_URL=mongodb://mongodb:27017/db?replicaSet=rs0` que está em `.env.example`.

     - 2. Para construir as imagens e iniciar todos os serviços use este comando uma única vez:

       ```bash
       docker-compose up --build -d
       ```

       E para finalizar o Docker utilize:

       ```bash
       docker-compose down
       ```

       Para deletar o container criado utilize:

       ```bash
       docker-compose down -v
       ```

6. **Rotas/Endpoints**

   - Após rodar o projeto acesse o seu navegador e insira`localhost:8000/api-docs` para acessar a documentação detalhada de cada endoipoint.

7. **Licença**

   [MIT License.](LICENSE)
