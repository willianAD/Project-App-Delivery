# APP de Delivery FULL STACK com React Redux, Node.JS e Express, MySQL e Docker

## Funcionalidades

Este é o projeto App de Delivery! O projeto deve incluir tanto o back-end, front-end e o banco de dados também! As features incluem interações em tempo real dentre outras funcionalidades.

Até agora, na maioria dos projetos, escrevemos aplicações do zero, mas poucas vezes paramos para refatorar uma ou adicionar novas funcionalidades para torná-la mais robusta. E isso é super importante, pois é o trabalho diário de uma pessoa desenvolvedora de software.

Todo sprint terá novos bugs para serem corrigidos, fazendo com que, em alguns casos, haja refatoração de algum pedaço do sistema. Além dos bugs, um sprint adiciona novas features, inclusas no produto pelo(a) PM para que a experiência da pessoa usuária, utilizando o sistema, seja cada vez melhor.

Esse será o projeto mais desafiador até agora! Nessa aplicação, vocês serão responsáveis por criar e integrar tanto o back-end quanto o front-end!

Você vai criar uma plataforma de delivery de cerveja. 🍻



O que foi avaliado?

A aderência do código à especificação. Seu programa deve se comportar como especificado no repositório, no protótipo e no Diagrama de ER disponível no projeto;

A organização do seu código e a arquitetura geral da aplicação (tanto da API quando do front-end);

A aderência ao padrão REST na API;

O respeito a estrutura do banco de dados. Sua implementação não deve adicionar ou remover tabelas, campos ou relacionamentos e sua API deve estar preparada para aproveitar essa estrutura por completo;

A cobertura de testes. Seu código deve ser testável e possuir uma suíte de testes unitários e/ou de integração robusta e com alta cobertura.

A implementação da funcionalidade de interação em tempo real, utilizando o socket.io.

A aderência aos princípios SOLID;


## Requisitos

<img src="https://raw.githubusercontent.com/willianAD/Project-App-Delivery/main/image/Projeto%20App%20de%20Delivery.png">
<img src="https://raw.githubusercontent.com/willianAD/Project-App-Delivery/main/image/Projeto%20App%20de%20DeliveryII.png">
<img src="https://raw.githubusercontent.com/willianAD/Project-App-Delivery/main/image/Projeto%20App%20de%20DeliveryIII.png">


# Requisitos Obrigatórios


## `Fluxo Comum`

O Fluxo comum deve garantir que seja possível **fazer login** e **registrar** no sistema.

>⚠️ **Nesse projeto existe o arquivo `back-end/jwt.evaluation.key` que deverá ser lido e usado como o `secret` para realizar a criptografia de _tokens_, dispensando assim, a necessidade de criar uma variável de ambiente para isso.**

---

### `01login.test`

Todos os testes desse arquivo:

- Verificarão se o banco de dados contém as pessoas usuárias padrão (conforme referência em `db.example.sql`);
- Farão a navegação para a página principal em `localhost:3000/login`.

---

#### 1 - Crie uma tela de login que deve ser acessível pelos endpoints / e /login no navegador

**Observações técnicas**

- Aqui deve-se garantir que a aplicação possui acesso a uma rota `/login`;
- A rota padrão (`/`) deve fazer redirecionamento para rota `/login`.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador navegará para o endereço do host utilizando o endpoint `/`;
  - O avaliador verificará o redirecionamento para página `/login`;
- O avaliador navegará para o endereço do host utilizando o endpoint `/login`.

</details>

---

#### 2 - Crie os elementos da tela de login com os data-testids disponíveis no protótipo

**Observações técnicas**

- Se oriente pela seguinte tela do protótipo: [`Comum / Login`](#construcao-do-front-end-e-componentizacao);

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador buscará pelos elementos fundamentais aos demais testes.

</details>

---

#### 3 - Desenvolva a tela de login de maneira que ela impossibilite o login com dados mal formatados

**Observações técnicas**

- A senha recebe qualquer tipo de caractere;
- Aqui, os critérios para considerar dados de login **mal formatados** são:
  - Email incompleto, fora de um padrão comum como: `<email>@<domínioPrincipal>.<domínioGenérico>`;
  - Senha com número de caracteres menor que `6`.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador testará 3 situações aleatórias diferentes (uma para cada validação) de maneira isolada, sendo uma delas válida;
- O avaliador testará seu formulário com as 3 situações de maneira sequencial;
- O avaliador não vai executar o login pelo botão de login, ele validará se o botão ficará habilitado ou não, a depender dos critérios durante o input dos dados;
- É esperado que haja a validação dos dados durante a escrita dos mesmos.

</details>

---

#### 4 - Desenvolva a tela de login de maneira que ela impossibilite o login com dados inexistentes no banco de dados

**Observações técnicas**

- Sua página deve ser capaz de alertar a pessoa usuária de que aquele login é inválido após sua tentativa, já que apesar de formatado corretamente, os dados não existem no banco de dados.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador tentará fazer login através do botão de login, com dados aleatórios válidos;
- O avaliador espera que haja uma requisição `POST` para API, que retorne o status `404 - Not found`;
- O avaliador deve identificar que o endereço da página não foi alterado;
- O avaliador espera que apareça na tela um elemento, antes oculto, com uma mensagem de erro qualquer.
  - Elemento: `common_login__element-invalid-email`

</details>

---

#### 5 - Desenvolva a tela de login de maneira que ela possibilite fazer o login com dados válidos e existentes no banco de dados

**Observações técnicas**

Sua página deve ser capaz de utilizar os dados do cliente previstos em `db.example.sql`:

- Note que, a senha armazenada no banco é uma [`hash md5`](https://pt.wikipedia.org/wiki/MD5), cuja tradução também está comentada no arquivo;
- Sua API deve ser capaz de traduzir uma senha comum para uma `hash md5`, comparando-a e validando-a com a do banco de dados;
- É possível utilizar bibliotecas de terceiros como a [`md5`](https://www.npmjs.com/package/md5) ou a nativa [`crypto`](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options), para conversão de valores para `md5`.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador tentará fazer a ação de login com dados válidos. **Esse teste pressupõe a validade de anteriores**;
  - O avaliador utilizará o e-mail `zebirita@email.com` e senha `$#zebirita#$` para fazer o login;

</details>

---

### `02register.test`

Todos os testes desse arquivo:

- Farão a navegação para a página principal em `localhost:3000/login`;
- Farão a navegação para a página de registro através do `Botão de registro`;

---

#### 6 - Crie uma tela de registro que deve ser acessível via endpoint /register no navegador e pelo botão de registro na tela de login

**Observações técnicas**

- Aqui deve-se garantir que a aplicação possui acesso a uma rota `/register`;
- Também deve ser possível acessar a tela de registro clicando no botão de cadastro via tela de `login`.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador navegará para o endereço do host utilizando o endpoint `/register`;
- O avaliador tentará, pela tela de login, acessar a página de registro clicando no `Botão de cadastro`.

</details>

---

#### 7 - Crie os elementos da tela de registro com os data-testids disponíveis no protótipo

**Observações técnicas**

- Se oriente pela seguinte tela do protótipo: [`Comum / Cadastro`](#construcao-do-front-end-e-componentizacao);

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador buscará pelos elementos fundamentais aos demais testes.

</details>

---

#### 8 - Desenvolva a tela de registro de maneira que ela impossibilite o cadastro com dados mal formatados

**Observações técnicas**

- A senha recebe qualquer tipo de caractere;
- Aqui, os critérios para considerar os dados mal formatados são:
  - Nome completo com número de caracteres menor que `12`.
  - Email incompleto, fora de um padrão comum: `<email>@<domínioPrincipal>.<domínioGenérico>`;
  - Senha com número de caracteres menor que `6`.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador testará 4 situações aleatórias diferentes (uma para cada validação) de maneira isolada, sendo uma delas válida;
- O avaliador testará seu formulário com as 4 situações de maneira sequencial;
- O avaliador não vai executar o registro pelo botão de registro. Ele validará se o botão ficará habilitado ou não, a depender dos critérios durante o input dos dados;
- É esperado que haja a validação dos dados durante a escrita dos mesmos.

</details>

---

#### 9 - Desenvolva a tela de registro de maneira que ela possibilite cadastrar com dados válidos

**Observações técnicas**

Sua página deve ser capaz de cadastrar pessoas usuárias com dados válidos:

- Note que a senha deve ser armazenada no banco como uma [`hash md5`](https://pt.wikipedia.org/wiki/MD5). A tradução deve ocorrer na API;
- É possível utilizar bibliotecas de terceiros como a [`md5`](https://www.npmjs.com/package/md5) ou a nativa [`crypto`](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options), para conversão de valores para `md5`.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador tentará fazer a ação de cadastro com dados aleatórios válidos, validando-os posteriormente no banco de dados;
- O avaliador espera que haja uma requisição `POST` para API ao clicar no `Botão de registro`, que retorne o status `201 - Created`;
- O avaliador espera acessar uma página `localhost:3000/customer/products` como padrão para o usuário do tipo cliente;
- Não é necessário ter a página pronta, mas a rota no front deve estar acessível para que o avaliador a identifique.

</details>

---

#### 10 - Desenvolva a tela de registro de maneira que ela impossibilite o cadastro de um usuário já existente

**Observações técnicas**

- Sua página deve impedir o cadastro de pessoas com o mesmo Nome ou E-mail.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador tentará realizar o fluxo de cadastro anterior duas vezes, com um dado gerado aleatoriamente.
- Na primeira vez o avaliador espera que haja uma requisição `POST` para API ao clicar no `Botão de registro`, que retorne o status `201 - Created`;
- Na segunda vez o avaliador espera que haja uma requisição `POST` para API ao clicar no `Botão de registro`, que retorne o status `409 - Conflict`;
- O avaliador espera que apareça na tela um elemento, antes oculto, com uma mensagem de erro qualquer.
  - Elemento: `common_register__element-invalid_register`;

</details>

---

## `Fluxo do Cliente`

O fluxo do cliente deve garantir que seja possível **navegar e escolher produtos**, **adicionar produtos ao carrinho**, **fazer checkout (gerar uma nova venda)**, **consultar pedidos** e **acessar detalhes do mesmo**.

---

### `03customer_products.test`

Todos os testes desse arquivo:

- Farão o fluxo de login com o cliente "Zé Birita" (o login é sempre validado nos testes);
- Esse fluxo deve dar acesso a uma página padrão de produtos em `localhost:3000/customer/products`;
- Verificarão no banco de dados, se consta a lista de produtos padrão, conforme a tabela `products` do modelo em `db.example.sql`.

---

#### 11 - Crie uma tela de produtos do cliente contendo uma barra de navegação - navbar -, que servirá também para demais telas das pessoas usuárias

**Observações técnicas**

- Se oriente pela seguinte tela do protótipo: [`Cliente / Produtos`](#construcao-do-front-end-e-componentizacao);

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

  O avaliador **buscará pelos elementos** fundamentais aos demais testes:

- Elemento genérico que seja um item de menu para página de produtos;
- Elemento genérico que seja um item de menu para página de pedidos;
- Elemento genérico para o nome da pessoa usuária;
- Elemento genérico que seja um item de menu para o logout.

</details>

---

#### 12 - Desenvolva a tela de produtos do cliente criando os demais elementos com os data-testids disponíveis no protótipo

**Observações técnicas**

- Se oriente pela seguinte tela do protótipo: [`Cliente / Produtos`](#construcao-do-front-end-e-componentizacao);
- Deve-se construir um total de `11` cards, cada um correspondente a um item da tabela produtos, conforme a tabela `products` do modelo em `db.example.sql`.
- Os `data-testid` desses itens devem terminar com o id de cada produto, exemplo:
  - `customer_products__element-card-price-1`; `customer_products__element-card-price-2`; ...; `customer_products__element-card-price-11`.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

  **O avaliador buscará pelos elementos relacionados a todos os cards de produtos:**

- Elemento genérico do nome/título do produto;
- Elemento genérico do preço do produto;
- Imagem do produto;
- Botão para adicionar quantidade de itens;
- Botão para remover quantidade de itens;
- Input de quantidade de itens.

</details>

---

#### 13 - Desenvolva a tela de produtos do cliente de forma que ela pressuponha dados válidos da pessoa usuária armazenados no localStorage

**Observações técnicas**

- **Após o login (e durante a navegação), deve-se manter os dados da pessoa usuária no `localStorage`, conforme o modelo:**

```js script
{
  name: "Nome Da Pessoa Usuária",
  email: "email@dominio.com",
  role: "customer",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTm9tZSBEYSBQZXNzb2EgVXN1w6FyaWEiLCJlbWFpbCI6ImVtYWlsQGRvbWluaW8uY29tIiwicm9sZSI6ImN1c3RvbWVyIn0.s5cmiyY16yViCXkHuzWekxkMeYBi75eT8uJnSbfadNE"
}
```

- **Sua página também deve ser capaz de deslogar a pessoa usuária que não possuir um `token` válido no `localStorage`**
  - Note que aqui, é necessário que sua API seja capaz de gerar um `token` [`JWT`](https://jwt.io/), com base na chave em `./back-end/jwt.evaluation.key` após um login válido.
  - Também será validado se esses dados são descartados ao logout.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador testará se o `local storage` contém os dados da pessoa usuária após o login;
- O avaliador testará se o nome da pessoa, contido no `local storage`, também está na navbar;
- O avaliador testará se o `local storage` contém um `token` válido;
- O avaliador testará se o logout descarta os dados do `local storage` da pessoa usuária.

</details>

---

#### 14 - Desenvolva a tela de produtos do cliente de forma que os cards de todos os produtos pré-cadastrados contenham os valores corretos

**Observações técnicas**

- Há um total de `11` cards, cada um correspondente a um item da tabela produtos, conforme a tabela `products` do modelo em `db.example.sql`;
- Os dados desses produtos devem condizer com os dados do banco de dados;
- Nesse requisito, deve-se garantir que as imagens dos produtos estejam disponíveis para acesso direto via rota estática na sua API.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador testará se os dados de cada card condizem com os dados do banco de dados.
- O avaliador testará se é possível fazer uma requisição para os endereços das imagens de cada produto.

</details>

---

#### 15 - Desenvolva a tela de produtos do cliente de forma que o preço total esteja correto após a adição de itens aleatórios

**Observações técnicas**

- **Cada card deve possibilitar a adição, remoção ou definição manual da quantidade de itens de cada produto**
  - Esses itens devem compor um "carrinho de compras", que deve ser persistente no fluxo do cliente até o momento do checkout (quando o carrinho se torna uma venda concretizada);

👀**De olho nas dicas:**

- Considere utilizar o `localStorage` como forma de armazenar uma entidade `carrinho`;
- Considere a utilização de um contexto específico para acessar e manipular esses dados (tirando essa competência dos componentes filho). Esse contexto não deve ser geral, ou seja, não deve ser acessado por outras páginas fora do escopo do cliente.
- Para facilitar o processo, considere o carrinho como um 'modelo' de uma entidade banco de dados, mas programado no front-end (por ser temporário). Esses dados não devem persistir ao logout.
- O valor total do pedido é a soma dos resultados das quantidades de cada item, multiplicada pelo preço unitário dos mesmos.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador vai utilizar um recorte aleatório de produtos para fazer o pedido (esses dados são imprimidos durante o teste);
- Para cada item da lista gerada:
  - O avaliador testará se a adição do item (`Botão de adição`) adiciona ao `input` da quantidade;
  - O avaliador testará se após a adição do item, a ação de remoção (`Botão de remoção`) do dobro da quantidade manterá o `input` da quantidade em `0` (não gerando valores negativos);
  - O avaliador testará se é possível fazer a alteração manual `input` da quantidade;
  - O avaliador testará o fluxo completo de adição de itens, validando o valor total de produtos.

</details>

---

#### 16 - Desenvolva a tela de produtos do cliente de forma que haja um botão de carrinho que redirecionará para a tela de checkout caso itens sejam adicionados

**Observações técnicas**

- Sua página deve garantir que alterações no carrinho também mudem o valor total da venda:
 👀**De olho na dica:** tire proveito do **contexto específico** mencionado anteriormente para realizar a lógica e fornecer o resultado do cálculo.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador testará a existência de um botão de carrinho com um valor total válido e que seja capaz de nos direcionar à tela de checkout.
  - O avaliador espera acessar uma página `localhost:3000/customer/checkout` após o clique no botão do carrinho;
  - Não é necessário ter a página pronta, mas a rota no front deve estar acessível para que o avaliador a identifique.

</details>

---

### `04customer_checkout.test`

Todos os testes desse arquivo:

- Vão utilizar uma amostragem de produtos do banco de dados (impresso na tela durante o teste);
- Vão gerar um novo pedido com o preço total presumido e dados aleatórios para utilização nos testes (impresso na tela durante o teste);
- Vão fazer login com o cliente "Zé Birita";
- Vão validar o valor total dos produtos adicionados na tela de produtos;
- Vão navegar para a tela de checkout através do botão do carrinho de compras;
- O endereço da página deve ser `localhost:3000/customer/checkout`.

---

#### 17 - Crie uma tela de checkout do cliente com elementos com os data-testids disponíveis no protótipo

**Observações técnicas**

- Se oriente pela seguinte tela do protótipo: [`Comum / Checkout`](#construcao-do-front-end-e-componentizacao);
- A quantidade de itens no checkout deve corresponder à quantidade de itens no recorte aleatório de produtos utilizados no teste;
- Aqui, a referência de identificação dos campos das linhas da tabela deve ser o índice (`index`) da matriz (`array`) dos produtos no carrinho de compras. Por exemplo:
  - `element-order-table-name-0`; `element-order-table-name-1`; ...; `element-order-table-name-x`.
- O `value` das `options` do `select` das pessoas vendedoras deve ser o `id` da pessoa vendedora.
  - Essa instrução será utilizada na validação do requisito 20.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador testará os data-testids referentes aos itens do carrinho e demais elementos.

</details>

---

#### 18 - Desenvolva a tela de checkout do cliente de forma a possuir os dados corretos do carrinho e preço total

**Observações técnicas**

- Os dados propostos no recorte aleatório de produtos (itens e preço total) no teste devem condizer com os dados contidos no carrinho durante o checkout.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador testará se os itens contidos na venda correspondem aos itens do checkout

</details>

---

#### 19 - Desenvolva a tela de checkout do cliente de forma que seja possível remover itens do carrinho

**Observações técnicas**

- O cliente deve ser capaz de remover itens do carrinho pela tela de checkout, alterando o valor total da venda.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador tentará realizar a remoção de itens validando-os na tabela.
  - O avaliador vai deletar uma quantidade aleatória de itens do carrinho (esses dados são impressos no teste).

</details>

---

#### 20 - Desenvolva a tela de checkout do cliente de forma a nos redirecionar para a tela de detalhes do pedido após a finalização do mesmo

**Observações técnicas**

- Não se preocupe aqui em ter a tela de detalhes do pedido pronta: o que deve estar garantido, é que é possível ter acesso a uma rota `localhost:3000/customer/orders/<id>` no front, onde o `id` é retornado da requisição da venda;
- Ao final do pedido (ao clicar no 'Botão de finalização do pedido'), a tela de checkout deve disparar uma requisição para a API, inserindo a venda e retornando o `id` da mesma, para utilização no redirecionamento.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador verificará se ao final do checkout é disparado uma request `POST` com uma autorização (`token`) válida, que retorne status `201 - Created`;
- O avaliador verificará se após isso o endereço da url contém o `id` do pedido criado. Por exemplo, se o `id` gerado for `3`, então: `localhost:3000/customer/orders/3`.
- O avaliador selecionará a `pessoa vendedora` pelo `id` como informado no [requisito 17](#17---crie-uma-tela-de-checkout-do-cliente-com-elementos-com-os-data-testids-disponíveis-no-protótipo)

</details>

---

#### 21 - Desenvolva a tela de checkout do cliente de forma a gerar uma nova venda na tabela sales, assim como relações em sales_products, ao finalizar o pedido

**Observações técnicas**

**Os status de um pedido podem ser:**
      - `Pendente`;
      - `Preparando`;
      - `Em Trânsito`;
      - `Entregue`.

- O "status" padrão de cada pedido deve ser `Pendente`;

- Deve-se garantir que a requisição para API se encarregue de criar uma venda, e na mesma requisição, relacionar essa venda com os produtos do carrinho:
  - Aqui possuímos uma relação de `N:N` (muitos para muitos) onde se relacionam as tabelas: `sales` < 1:N > `sales_products` < N:1 > `products`.

- Os testes farão a inserção da venda via checkout e após isso farão a validação desses dados no banco de dados.

- Atente-se que, no [protótipo](#construcao-do-front-end-e-componentizacao), a tela `Cliente / Detalhes do Pedido` possui a data do pedido:
  - A data deve ser inserida automaticamente durante o processo de inserção da venda após o checkout;
  - O banco de dados está configurado para o [`fuso horário Zulu (Z)`](https://pt.wikipedia.org/wiki/Fuso_hor%C3%A1rio#Meridianos) (`timezone: 'Z'` em `./back-end/database/config/config.js`), que é alinhado com o `UTC+0`;
    - Saiba mais sobre o [`UTC` (Tempo universal coordenado)](https://pt.wikipedia.org/wiki/Tempo_Universal_Coordenado);
    - Isso é necessário para evitar conflitos de horário na hora da leitura e escrita da informação no banco de dados.
  - É possível utilizar bibliotecas externas para manipulação de datas como o [`Moment.js`](https://momentjs.com/), ou mesmo utilizar o objeto [`Date`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date) para normatizar horários na hora da leitura ou escrita no formato `UTC`.
 👀**De olho na dica:** é possível utilizar o Sequelize para definir um valor padrão para um campo durante a criação do seu modelo. Valores padrão podem incluir a [data atual](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html).

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador testará se, após realizado o checkout, as alterações constarão no banco de dados.

</details>

---

### `05customer_orders.test`

Todos os testes desse arquivo:

- Vão utilizar uma amostragem de produtos do banco de dados (impresso na tela durante o teste);
- Vão fazer login com o cliente "Zé Birita";
- Vão gerar um novo pedido com o preço total presumido e dados aleatórios para utilização nos testes (impresso na tela durante o teste);
- Vão fazer o checkout desse novo pedido;
- Vão acessar a `HomePage` do usuário, navegando para a tela de login (que deve fazer o redirecionamento). Lembrando que, ao acessar a tela de login com um usuário já logado, deve-se fazer o direcionamento para a página padrão do mesmo;
- Vão navegar para a tela de produtos através do menu de navegação (saindo da tela de detalhes do pedido);
- Vão navegar para a tela de pedidos do cliente através do menu de navegação;
- Vão coletar os dados de vendas da tabela `sales` referentes ao usuário (id `3`);
- O endereço da página deve ser `localhost:3000/customer/orders`.

---

#### 22 - Crie uma tela de pedidos do cliente com elementos a partir dos data-testids disponíveis no protótipo

**Observações técnicas**

- Se oriente pela seguinte tela do protótipo: [`Comum / Meus Pedidos`](#construcao-do-front-end-e-componentizacao);
- Os `data-testid` desses itens devem terminar com o `id` de cada venda no banco. Por exemplo:
  - `customer_products__element-order-date-1`; `customer_products__element-order-date-2`; ...; `customer_products__element-order-date-x`.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador vai testar se existem `data-testids` para os dez primeiros itens contidos na tabela 'sales';
  ⚠️**Importante**: o avaliador oficial vai testar somente uma venda, mas caso você opte por usar o parâmetro de ambiente `EVAL_ALWAYS_RESTORE_DEV_DB=false` no back-end, localmente o teste fará avaliação de até dez vendas.

</details>

---

#### 23 - Desenvolva a tela de pedidos do cliente de forma a conter a lista de pedidos do mesmo com os dados corretos

**Observações técnicas**

- Garanta que os dados dos itens de cada card condizem com as vendas registradas na tabela `sales` (vendas);

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador vai testar se os dados associados aos `data-testids` dos dez primeiros itens coincidem com os do banco de dados.
   ⚠️**Importante**: o avaliador oficial vai testar somente uma venda, mas caso você opte por usar o parâmetro de ambiente `EVAL_ALWAYS_RESTORE_DEV_DB=false` no back-end, localmente o teste fará avaliação de até dez vendas.

</details>

---

#### 24 - Desenvolva a tela de pedidos do cliente de forma a dar acesso à tela de detalhes de um pedido ao clicar no card do mesmo

**Observações técnicas**

- Não se preocupe aqui em ter a tela de detalhes do pedido pronta: o que deve estar garantido é que é possível ter acesso a uma rota `localhost:3000/customer/orders/<id>` no front;
- Aqui, o acesso a cada item deve ser possível pelos cards na tela de pedidos;

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador acessará a tela de detalhes do último pedido pela tela de pedidos, após o checkout do mesmo. Por exemplo:
  - Se o pedido gerado for o de `id` `5`, o avaliador espera acessar o endereço `localhost:3000/customer/orders/5` via aquele card,

</details>

---

### `06customer_order_details.test`

Todos os testes desse arquivo:

- Vão utilizar uma amostragem de produtos do banco de dados (impresso na tela durante o teste);
- Vão fazer login com o cliente "Zé Birita";
- Vão gerar um novo pedido com o preço total presumido e dados aleatórios para utilização nos testes (impresso na tela durante o teste);
- Vão fazer o checkout desse novo pedido, o que deve redirecionar para tela de detalhes daquele pedido;
- O endereço da página deve ser `localhost:3000/customer/orders/<idVenda>`.

---

#### 25 - Crie uma tela de detalhes do pedido do cliente com elementos a partir dos data-testids disponíveis no protótipo

**Observações técnicas**

- Se oriente pela seguinte tela do protótipo: [`Comum / Detalhes do Pedido`](#construcao-do-front-end-e-componentizacao);

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador testará os `data-testids` referentes aos itens da venda e demais elementos.

</details>

---

#### 26 - Desenvolva a tela de detalhes do pedido do cliente de forma a possuir os dados corretos da venda

**Observações técnicas**

- Sua aplicação deve garantir que os dados do pedido do cliente estejam atualizados ao acessar o detalhe de algum deles.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador testará se os dados contidos nos campos das linhas (produtos relacionados à venda), tal como demais valores (id do pedido, nome da pessoa vendedora, data de pedido, status da venda, preço total) conferem com os dados da venda feita anteriormente.

</details>

---

## `Fluxo da Pessoa Vendedora`

O fluxo da pessoa vendedora deve garantir que é possível listar pedidos relacionados àquela pessoa vendedora e manipular o status desses pedidos.

---

### `07seller_orders.test`

Todos os testes desse arquivo:

- Vão utilizar uma amostragem de produtos do banco de dados (impresso na tela durante o teste);
- Vão fazer login com o cliente "Zé Birita";
- Vão gerar um novo pedido com o preço total presumido e dados aleatórios para utilização nos testes (impresso na tela durante o teste);
- Vão fazer o checkout desse novo pedido, portanto a venda estará registrada no banco de dados;
- Vão fazer o logout do sistema;
- Vão fazer o login com a vendedora "Fulana Pereira" utilizando o e-mail `fulana@deliveryapp.com` e senha `fulana@123`;
- Vão coletar os dados de vendas da tabela `sales` referentes ao usuário (id `2`);
- A página padrão esperada para pessoa vendedora é `localhost:3000/seller/orders`.

---

#### 27 - Crie uma tela de pedidos da pessoa vendedora com elementos a partir dos data-testids disponíveis no protótipo

**Observações técnicas**

- Se oriente pela seguinte tela do protótipo: [`P. Vend / Pedidos`](#construcao-do-front-end-e-componentizacao);
- Os `data-testid` desses itens devem terminar com o `id` de cada venda no banco. Por exemplo:
  - `seller_orders__element-order-date-1`; `seller_orders__element-order-date-2`; ...; `seller_orders__element-order-date-x`.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador vai testar se existem `data-testids` para os dez primeiros itens contidos na tabela 'sales'.

</details>

⚠️**Importante**: o avaliador oficial vai testar somente uma venda, mas caso você opte por usar o parâmetro de ambiente `EVAL_ALWAYS_RESTORE_DEV_DB=false` no back-end, localmente o teste fará avaliação de até dez vendas.

---

#### 28 - Desenvolva a tela de pedidos da pessoa vendedora de forma a conter a lista de pedidos do mesmo com os dados corretos

**Observações técnicas**

- Garanta que os dados dos itens de cada card condizem com as vendas registradas na tabela `sales` (vendas);

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador vai testar se os dados associados aos `data-testids` dos dez primeiros itens batem com os do banco de dados.

</details>

⚠️**Importante**: o avaliador oficial vai testar somente uma venda, mas caso você opte por usar o parâmetro de ambiente `EVAL_ALWAYS_RESTORE_DEV_DB=false` no back-end, localmente o teste fará avaliação de até dez vendas.

---

#### 29 - Desenvolva a tela de pedidos da pessoa vendedora de forma a dar acesso à tela de detalhes de um pedido ao clicar no card do mesmo

**Observações técnicas**

- Não se preocupe aqui em ter a tela de detalhes do pedido pronta: oque deve estar garantido, é que é possível ter acesso a uma rota `localhost:3000/seller/orders/<id>` no front;
- Aqui, o acesso a cada item deve ser possível pelos cards na tela de pedidos.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador acessará a tela de detalhes do último pedido pela tela de pedidos, após o checkout do mesmo. Por exemplo:
  - Se o pedido gerado for o de `id` `5`, o avaliador espera acessar o endereço `localhost:3000/seller/orders/5`,  via aquele card.

</details>

---

### `08seller_order_details.test`

Todos os testes desse arquivo:

- Vão utilizar uma amostragem de produtos do banco de dados (impresso na tela durante o teste);
- Vão fazer login com o cliente "Zé Birita";
- Vão gerar um novo pedido com o preço total presumido e dados aleatórios para utilização nos testes (impresso na tela durante o teste);
- Vão fazer o checkout desse novo pedido, portanto a venda estará registrada no banco de dados;
- Vão fazer o logout do sistema;
- Vão fazer o login com a vendedora "Fulana Pereira" utilizando o e-mail `fulana@deliveryapp.com` e senha `fulana@123`;
- Vão clicar no card referente à venda realizada para ter acesso à tela de detalhes do mesmo.

---

#### 30 - Crie uma tela de detalhes do pedido da pessoa vendedora com elementos a partir dos data-testids disponíveis no protótipo

**Observações técnicas**

- Se oriente pela seguinte tela do protótipo: [`P. Vend / Detalhes do Pedido`](#construcao-do-front-end-e-componentizacao);

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador testará os `data-testids` referentes aos itens da venda e demais elementos.

</details>

---

#### 31 - Desenvolva a tela de detalhes do pedido da pessoa vendedora de forma a possuir os dados corretos da venda

**Observações técnicas**

- Sua aplicação deve garantir que os dados do pedido do cliente estejam atualizados ao acessar o detalhe de algum deles.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador testará se os dados contidos nos campos das linhas (produtos relacionados à venda), tal como demais valores (id do pedido, nome da pessoa vendedora, data de pedido, status da venda, preço total) conferem com os dados da venda feita anteriormente.

</details>

---

## `Validação do Status do Pedido`

A validação de status consiste em uma série de testes que devem assegurar que os status do pedido sejam alterados e refletidos para clientes e pessoas vendedoras.

---

#### 32 - Desenvolva a tela de detalhes do pedido da pessoa vendedora de forma a ser capaz de alterar o status do pedido

**Observações técnicas**

- Os status de um pedido podem ser:
  - `Pendente` - **Valor padrão** na criação do pedido;
  - `Preparando` - Status que **pode ser alterado pela pessoa vendedora**;
  - `Em Trânsito` - Status que **pode ser alterado pela pessoa vendedora**;
  - `Entregue` - Status que **pode ser alterado pelo cliente**.

- Esse requisito vai avaliar se as alterações do status do pedido na tela da pessoa vendedora são persistentes ao clicar em: `Botão de marcar para 'preparo'`, `Botão de marcar para 'saiu para entrega'`:
  - O `Botão de marcar para 'preparo'` deve estar habilitado caso o status do pedido esteja como `Pendente`. Esse botão deve alterar o status do pedido para `Preparando`;
  - O `Botão de marcar para 'preparo'` deve estar desabilitado caso o status do pedido esteja como `Preparando`, `Em Trânsito` ou `Entregue`;
  - O `Botão de marcar para 'saiu para entrega'` deve estar habilitado caso o status do pedido esteja como `Preparando`. Esse botão deve alterar o status do pedido para `Em Trânsito`;
  - O `Botão de marcar para 'saiu para entrega'` deve estar desabilitado caso o status do pedido esteja como `Pendente`, `Em Trânsito` ou `Entregue`;

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador testará se a alteração do pedido é persistente após atualizar a página fazendo o processo de logout/login.

</details>

---

### `09customer_seller_status_sync.test`

Todos os testes desse arquivo:

- Vão utilizar uma amostragem de produtos do banco de dados (impresso na tela durante o teste);
- Vão fazer login com o cliente "Zé Birita";
- Vão gerar um novo pedido com o preço total presumido e dados aleatórios para utilização nos testes (impresso na tela durante o teste);
- Vão fazer o checkout desse novo pedido, portanto a venda estará registrada no banco de dados;
- Vão gerar outro contexto de navegação (anônimo) para utilizar no fluxo da pessoa vendedora;
- Vão fazer o login (no novo contexto) com a vendedora "Fulana Pereira";
- Vão clicar no card referente à venda realizada para ter acesso à tela de detalhes do mesmo.

---

#### 33 - Garanta que o status do pedido atualizado na tela de detalhes do pedido da pessoa vendedora seja refletido na tela de detalhes do pedido do cliente após atualização das páginas

**Observações técnicas**

- Sua aplicação deve garantir que:
  - Dado o fluxo de criação de um pedido pelo cliente, que leva a tela de detalhes daquele pedido;
  - Dado o acesso dos detalhes desse pedido pela pessoa vendedora em paralelo (não há logout no processo);
- Seja possível **fazer a alteração no status do pedido pela pessoa vendedora**, e ao **atualizar as páginas**, esse status **esteja refletido na tela de detalhes do pedido do cliente**.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador verificará se, ao alterar o status do pedido na tela da pessoa vendedora, o mesmo também é alterado na tela de detalhes do pedido do cliente após atualização das páginas fazendo o processo de logout/login nas mesmas.

</details>

---

#### 34 - Garanta que o status do pedido atualizado na tela de detalhes do pedido da pessoa vendedora seja refletido na tela de lista de pedidos do cliente após atualização das páginas

**Observações técnicas**

**Sua aplicação deve garantir que seja possível fazer a alteração no status do pedido pela pessoa vendedora**, e ao atualizar as páginas, esse status esteja refletido no mesmo item listado na tela de pedido do cliente. Isso deve ocorrer em dois cenários:

- Dado o fluxo de criação de um pedido pelo cliente, acessando após isso a tela de lista de pedidos do mesmo;
- Dado o acesso dos detalhes desse pedido pela pessoa vendedora em paralelo (não há logout no processo);

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador verificará se, ao alterar o status do pedido na tela da pessoa vendedora, o mesmo também é alterado na tela de pedidos do cliente após atualização das páginas fazendo o processo de logout/login nas mesmas.

</details>

---

#### 35 - Garanta que o status do pedido atualizado na tela de detalhes do pedido do cliente seja refletido na tela de lista de pedidos da pessoa vendedora após atualização das páginas

**Observações técnicas**

**Sua aplicação deve garantir que seja possível fazer a alteração no status do pedido pelo cliente**, e ao atualizar as páginas, esse status esteja refletido no mesmo item listado na tela de pedido da pessoa vendedora. Isso deve ocorrer em dois cenários:

- Dado o fluxo de criação de um pedido pelo cliente, que leva a tela de detalhes daquele pedido;
- Dado o acesso aos detalhes desse pedido pela pessoa vendedora em paralelo (não há logout no processo);
- Dada a alteração de status do pedido da pessoa vendedora (colocando o pedido "Em trânsito");
- Dado o acesso da lista de pedidos pela pessoa vendedora em paralelo (não há logout no processo);

- Esse requisito também validará a interação com: `Botão de marcar como 'entregue'`:
  - O `Botão de marcar como 'entregue'` deve estar habilitado caso o status do pedido esteja como `Em Trânsito`. Esse botão deve alterar o status do pedido para `Entregue`;
  - O `Botão de marcar como 'entregue'` deve estar desabilitado caso o status do pedido esteja como `Pendente`, `Preparando` ou `Entregue`;

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador verificará se, ao alterar o status do pedido na tela do cliente, o mesmo também é alterado na tela de detalhes do pedido da pessoa vendedora após atualização das páginas fazendo o processo de logout/login nas mesmas.

</details>

---

## `Fluxo da Pessoa Administradora`

O fluxo da pessoa administradora deve possibilitar o cadastro de clientes e pessoas vendedoras, tal como a remoção dos mesmos.

---

### `10admin_manage_users.test`

Todos os testes desse arquivo devem:

- Fazer login utilizando dados da pessoa administradora;
  - email `adm@deliveryapp.com` e senha `--adm2@21!!--`.
- Ter a seguinte página esperada pelo avaliador: `localhost:3000/admin/manage`.

---

#### 36 - Crie uma tela de pessoa administradora com elementos a partir dos data-testids disponíveis no protótipo

**Observações técnicas**

- Se oriente pela seguinte tela do protótipo: [`P. Adm. / Gerenciamento`](#construcao-do-front-end-e-componentizacao);
  - Em um primeiro momento, não serão considerados os itens da tabela de usuários. Foque aqui em consolidar o formulário de cadastro.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador testará os `data-testids` referentes aos elementos do formulário de cadastro.

</details>

---

#### 37 - Desenvolva a tela da pessoa administradora de forma a validar o formulário de cadastro

**Observações técnicas**

- Assim como no formulário de registro aqui também serão validados os campos para registro;
- Aqui, os critérios para considerar os dados mal formatados são:
  - Nome completo com número de caracteres menor que `12`.
  - Email incompleto, fora de um padrão comum: `<email>@<domínioPrincipal>.<domínioGenérico>`;
  - Senha com número de caracteres menor que `6`;
  - Não definir o cargo (`role`):
   👀**De olho na dica**: o `select` do cargo (`role`) pode ter um valor default.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador testará 4 situações aleatórias diferentes (uma para cada validação) de maneira isolada, sendo uma delas válida;
- O avaliador testará seu formulário com as 4 situações de maneira sequencial;
- O avaliador não vai executar o registro pelo botão de registro: ele validará se o botão ficará habilitado ou não, a depender dos critérios durante o input dos dados;
- É esperado que haja a validação dos dados durante a escrita dos mesmos.

</details>

---

#### 38 - Desenvolva a tela da pessoa administradora de forma que seja possível cadastrar pessoas usuárias válidas

**Observações técnicas**

Sua página deve ser capaz de cadastrar pessoas usuárias com dados válidos:

- Note que, a senha deve ser armazenada no banco como uma [`hash md5`](https://pt.wikipedia.org/wiki/MD5). A tradução **deve ocorrer na API**;
- É possível utilizar bibliotecas de terceiros como a [`md5`](https://www.npmjs.com/package/md5) ou a nativa [`crypto`](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options) para conversão de valores para `md5`;

Aqui, **a rota de cadastro deve ser diferente da rota de cadastro comum**, pois também é possível definir a categoria de usuário aqui (`role`);

- Essa é uma rota específica para pessoa administradora, portanto a mesma rota na API deve considerar um token válido e referente ao usuário de categoria `administrator`;

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador tentará fazer a ação de cadastro com uma lista de pessoas (impressa durante o teste) com dados aleatórios válidos, validando-os posteriormente no banco de dados;
- Para cada pessoa, o avaliador espera que haja uma requisição `POST` para API ao clicar no `Botão de registro`, que retorne o status `201 - Created`;
- Os dados dessa pessoa serão validados na tabela `user` do banco de dados.

</details>

---

#### 39 - Desenvolva a tela da pessoa administradora de forma que ela impossibilite o cadastro de pessoas usuárias já existentes

**Observações técnicas**

Sua página deve impedir o cadastro de pessoas com o mesmo Nome ou E-mail.

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador tentará realizar o fluxo de cadastro anterior duas vezes, mas com apenas uma pessoa usuária gerada aleatoriamente.
- Na primeira vez o avaliador espera que haja uma requisição `POST` para API ao clicar no `Botão de registro`, que retorne o status `201 - Created`;
- Na segunda vez o avaliador espera que haja uma requisição `POST` para API ao clicar no `Botão de registro`, que retorne o status `409 - Conflict`;
- O avaliador espera que apareça na tela um elemento, antes oculto, com uma mensagem de erro qualquer.
  - Elemento: `admin_manage__element-invalid-register`.

</details>

---

#### 40 - (`Bônus`) Desenvolva a tela da pessoa administradora de forma que haja uma tabela de pessoas usuárias cadastradas

**Observações técnicas**

- Aqui, é necessário que a página também retorne os dados atualizados das pessoas usuárias cadastradas (não incluindo pessoas administradoras):
  👀**De olho na dica**: é possível utilizar um contexto específico que contemple o formulário e a tabela de usuários;

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador testará os data-testids referentes aos elementos da tabela de pessoas usuárias;
- O avaliador tentará realizar o fluxo de cadastro com uma quantidade aleatória de pessoas usuárias válidas e verificará se as mesmas aparecem na tabela.

</details>

---

#### 41 - (`Bônus`) Desenvolva a tela da pessoa administradora de forma que seja possível deletar pessoas usuárias na tabela

**Observações técnicas**

- A pessoa administradora deve ser capaz de remover pessoas usuárias através da tabela.
  - Na API, **essa é uma rota protegida e exclusiva da pessoa administradora**, portanto deve considerar um token válido e referente ao usuário de categoria `administrator`;

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

- O avaliador tentará realizar a remoção de itens validando-os na tabela.
  - O avaliador vai deletar uma quantidade aleatória de itens do carrinho (esses dados são impressos no teste).

</details>

---




## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [Trybe](https://www.betrybe.com/).
