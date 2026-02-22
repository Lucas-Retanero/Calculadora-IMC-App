# Calculadora de IMC Multiperfil (Aplicativo Mobile)

## Sobre o Projeto

Este aplicativo foi desenvolvido em React Native e oferece uma solução completa para o cálculo do Índice de Massa Corporal (IMC). Diferente de calculadoras convencionais, este projeto foi projetado com algoritmos específicos para diferentes perfis (adultos, idosos e crianças), suporte para gestantes e um design moderno focado na experiência do usuário e visualização de dados.

<p align="center">
  <br>
  <img src="./assets/icon-app.png" width="300">
  <br>
</p>

---

## Design e Interface

O aplicativo utiliza uma identidade visual moderna na cor **Azul (#4180ab)**, proporcionando uma leitura clara e profissional. O feedback visual inclui:
- **Círculo de IMC**: Destaque numérico imediato.
- **Barra de Progresso Colorida**: Segmentos que indicam visualmente onde o usuário se encontra na escala de saúde.
- **Marcador Dinâmico**: Posicionamento preciso na régua de resultados.

---

## Principais Funcionalidades

- **Seleção de Perfil Inteligente**: Ajusta a lógica de cálculo para **Adultos**, **Idosos (60+)** e **Crianças (2-19 meses    )**.
- **Suporte a Gestantes**: Seção específica para mulheres grávidas, considerando peso pré-gestacional e semana da gestação.
- **Análise de Peso Ideal**: O app calcula automaticamente a sua faixa de peso saudável com base na sua altura.
- **Metas Dinâmicas**: Exibe mensagens personalizadas informando quantos quilos você precisa ganhar ou perder para atingir o peso ideal.
- **Entrada de Dados Flexível**: Suporte para números decimais utilizando tanto ponto quanto vírgula, adaptado ao padrão brasileiro.
- **Sistema de Classificação Detalhado**: Categorias que vão desde Magreza até Obesidade Grau III.
- **Interface de Reset**: Limpa todos os estados e campos com um único clique para novos cálculos.

---

## Tecnologias

A construção deste projeto foi baseada nas seguintes tecnologias:

- **React Native**: Framework para o desenvolvimento multiplataforma.
- **Expo**: Plataforma de ferramentas para otimização do fluxo de desenvolvimento.
- **JavaScript (ES6+)**: Lógica de programação e manipulação de estados.
- **Expo Vector Icons**: Biblioteca de ícones (MaterialCommunityIcons, Ionicons, FontAwesome5, Feather).

---

## Guia de Instalação e Execução

### Pré-requisitos

Certifique-se de que os seguintes softwares estejam instalados:
- [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- Aplicativo **Expo Go** no celular para testes físicos.

### Passos para Execução

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Lucas-Retanero/Calculadora-IMC-App.git](https://github.com/Lucas-Retanero/Calculadora-IMC-App.git)
    ```

2.  **Entre na pasta do projeto:**
    ```bash
    cd Calculadora-IMC-App
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor do Expo:**
    ```bash
    npx expo start
    ```

Escaneie o QR Code com o aplicativo **Expo Go** no seu Android ou com a câmera no seu iOS.

---

## Licença

Este projeto é distribuído sob a licença MIT. Consulte o arquivo `LICENSE` para obter mais informações.
