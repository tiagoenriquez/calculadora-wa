# Calculadora

É mais uma calculadora desenvolvida por mim. Mas, dessa vez, fiz com o framework wails, que usa Go no backend e tecnologias web no frontend. E a calculadora resolve expressões complexas com as operações básicas da Matemática de acordo com as regras de prioridade da Matemática. Resolve expressões entre parênteses antes das potências, estas antes das multiplicações, divisões e cálculo de resto e estes antes das somas e subtrações

## Tecnologias utilizadas

<li>Wails</li>
<li>Go</li>
<li>Typescript</li>
<li>Reacy</li>

## Como rodar em modo de desenvolvimento

A primeira etapa para rodar em modo de desenvolvimento é se certificar de que o sistema operacional tem as bibliotecas necessárias para o funcionamento do software. Eu desenvolvi em Linux, portanto tive que instalar as dependências relacionadas ao GTK.<br>
A segunda etapa é se certificar de que a versão do Go instalada no sistema operacional é compatível com o Wails.<br>
Para rodar os comandos do Wails, é necessário instalar o Wails-CLI.<br>
O comando para rodar a aplicação em modo dev é:

```
wails dev
```

E para gerar o executável:

```
wails build
```
