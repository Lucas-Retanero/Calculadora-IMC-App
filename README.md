# Calculadora de IMC (Aplicativo Mobile)

## Sobre o Projeto

Este aplicativo foi desenvolvido em React Native e tem como principal objetivo o cálculo do Índice de Massa Corporal (IMC). A aplicação solicita ao usuário os dados de peso e altura para processar o cálculo e exibir o resultado, juntamente com a classificação correspondente, de acordo com os padrões de saúde.

<p align="center">
  <img src="./assets/icon-calculadora.png" width="300">
</p>


---

## Tecnologias

A construção deste projeto foi baseada nas seguintes tecnologias:

- **React Native**: Framework para o desenvolvimento de aplicações móveis multiplataforma.
- **Expo**: Plataforma e conjunto de ferramentas que otimizam o desenvolvimento em React Native.
- **JavaScript**: Linguagem de programação utilizada para a lógica da aplicação.

---

## Principais Funcionalidades

- **Entrada de Dados**: Permite ao usuário inserir valores de peso (em kg) e altura (em metros).
- **Processamento de Cálculo**: Executa o cálculo do IMC após a inserção dos dados.
- **Exibição de Resultados**: Apresenta o valor numérico do IMC de forma clara.
- **Sistema de Classificação**: Informa a categoria de saúde associada ao IMC calculado (ex: Abaixo do peso, Peso normal, Sobrepeso).
- **Interface de Reset**: Oferece uma função para limpar os campos e realizar uma nova consulta.

---

## Guia de Instalação e Execução

Para executar este projeto em um ambiente de desenvolvimento local, siga as instruções abaixo.

### Pré-requisitos

Certifique-se de que os seguintes softwares estejam instalados em sua máquina:
- [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- O aplicativo **Expo Go** em um dispositivo móvel (Android/iOS) para testes.

### Passos para Execução

1.  **Clone o repositório do projeto:**
    ```bash
    git clone https://github.com/Lucas-Retanero/Calculadora-IMC-App.git
    ```

2.  **Navegue até o diretório raiz do projeto:**
    ```bash
    cd Calculadora-IMC-App
    ```

3.  **Instale todas as dependências necessárias:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento do Expo:**
    ```bash
    npx expo start
    ```

Após a execução do último comando, um QR Code será exibido no terminal. Utilize o aplicativo **Expo Go** em seu smartphone para escanear o código e carregar o aplicativo.

---

## Licença

Este projeto é distribuído sob a licença MIT. Consulte o arquivo `LICENSE` para obter mais informações.
