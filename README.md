# AirState 🌬️

Bem-vindo ao AirState! Esta é uma aplicação web para consulta da qualidade do ar em cidades ao redor do mundo. O projeto foi construído com um front-end em HTML, CSS (com Tailwind) e JavaScript puro, e um back-end em Node.js com Express.

## 🚀 Como Rodar o Projeto Localmente

Para rodar esta aplicação, você precisará ter o **Node.js** e o **npm** instalados na sua máquina. O projeto é dividido em duas partes: o **back-end** (servidor da API) e o **front-end** (interface visual). Ambos precisam estar rodando simultaneamente.

### 1. Configuração do Back-end

O back-end é responsável por se comunicar com a API da OpenWeatherMap e fornecer os dados para o front-end.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU_USUARIO/air-state-app.git](https://github.com/SEU_USUARIO/air-state-app.git)
    cd air-state-app
    ```

2.  **Navegue até a pasta do back-end:**
    ```bash
    cd backend-api
    ```

3.  **Instale as dependências:** Este comando irá baixar o Express, Axios e Cors.
    ```bash
    npm install
    ```

4.  **Configure a Chave da API:**
    * Abra o arquivo `app.js`.
    * Encontre a linha `const API_KEY = "SUA_CHAVE_API_AQUI";` e substitua `"SUA_CHAVE_API_AQUI"` pela sua própria chave da API da OpenWeatherMap.

5.  **Inicie o servidor back-end:**
    ```bash
    node app.js
    ```
    * O terminal deve exibir a mensagem: `Servidor rodando na porta 3000`.
    * **Deixe este terminal aberto.**

### 2. Configuração do Front-end

O front-end é a interface visual que roda no navegador.

1.  **Abra um novo terminal.**
2.  Navegue até a pasta principal do projeto (`air-state-app`, caso não esteja nela) e depois entre na pasta do front-end:
    ```bash
    cd frontend-site
    ```
    *(Observação: Não é necessário rodar `npm install` aqui, pois não temos dependências de Node.js no front-end).*

3.  **Inicie um servidor local:** A forma mais fácil é usando a extensão **Live Server** no VS Code.
    * Abra a pasta `frontend-site` no VS Code.
    * Clique com o botão direito no arquivo `index.html`.
    * Selecione a opção **"Open with Live Server"**.

4.  **Pronto!** O seu navegador abrirá automaticamente no endereço `http://127.0.0.1:5500` e a aplicação estará pronta para uso.

## 🛠️ Tecnologias Utilizadas

* **Front-end:** HTML5, Tailwind CSS, JavaScript (puro)
* **Back-end:** Node.js, Express.js, Axios, Cors
* **APIs Externas:** OpenWeatherMap, Flags API
* **Design:** Figma