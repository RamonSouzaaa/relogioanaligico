
# Relógio

Olá tudo bem?

Neste projeto fui desafiado por mim mesmo, como seria criar um relógio digital e analógico
utilizando HTML, CSS, e JavaScript?

[Link do projeto](https://relogiojs-rose.vercel.app/)

![Projeto](https://github.com/RamonSouzaaa/relogiojs/blob/master/projeto.PNG)

# Relógio Analógico

Primeira etapa foi pensar como funcionária a rotação dos ponteiros, pesquisando um pouco e 
com mais alguns conhecimento agregados encontrei
a solução utilizando `transform-origin: bottom` e `transform: rotate()`. Após entender como
essas duas propriedades funcionam foi hora de pensar qual o valor em graus equivalente a cada 
casa do relógio, com isso primeiro pensei qual o espaço entre um grau e outro quando passado para 
a próxima casa quando iniciado no grau 0.

#

Utilizando essa formúla abaixo consegui entender que o ponteiro dos segundos e minutos deveriam obter um salto de `6 deg`
entre as casas, dessa forma inicia-se `0 deg` e segue `6 deg, 12 deg, 18 deg..` até `360 deg` quanto volta para `0 deg` novamente.
`let saltoGrauMinutoSegundo = (360/60)`
Diferente dos segundos utilizei `12` equivalente a quantidade de horas do relógio para descobrir o valor em graus que deve ser realizado entre uma casa de hora e outra, 
sendo assim obtive o valor `30 deg`.
```
let saltoGrauHora = (360/12)
```
Depois de obter os saltos entre minutos segundos e horas e os valores em graus faltou criar os contadores para cada item,
para que dessa forma pudesse incrementar os minutos, segundos e horas automáticamente atravez do `setInterval`.
```
function getGrausSegundoMinuto(valor){
   return (360 * valor) / 60
}

function getGrausHora(valor) {
    if(valor > 12){
        valor = 12 - (24 - valor)
    }

    return (360 * valor) / 12
}
let data = new Date()
let contadorGrausSegundo = getGrausSegundoMinuto(data.getSeconds())
let contadorGrausMinuto = getGrausSegundoMinuto(data.getMinutes())
let contadorGrausHora = getGrausHora(data.getHours())
```
Agora com todas as informações necessárias para criar o relógio foi apenas criar o controle de visualização atualizando as
informações dos ponteiros de segundo em segundo.
```
setInterval(() => {
..
..
}, 1000)
```
Para cada ponteiro (Hora, Minuto e Segundo) foi manipulado atualizando o valor de rotação alterando a propriedade transform do elemento
```
document.querySelector('.ponteiroSegundo').style.transform = `rotate(${contadorGrausSegundo}deg)`
document.querySelector('.ponteiroMinuto').style.transform = `rotate(${contadorGrausSegundo}deg)`
document.querySelector('.ponteiroHora').style.transform = `rotate(${contadorGrausSegundo}deg)`
```
E por fim para todos os ponteiros foi feito a validação quando obtive o valor em graus `360` o valor dos contadores de graus seria `0` para 
que pudesse realizar a rotação novamente no sentido horário.
```
if(contadorGrausSegundo === 360){
    contadorGrausSegundo = 0
}

if(contadorGrausMinuto === 360){
    contadorGrausMinuto = 0
}

if(contadorGrausHora === 360){
    contadorGrausHora = 0
}

```
# Relógio Digital

Diferente do relógio análógico foi muito mais tranquilo de pensar na lógica para o relógio digital, foi iniciado
três contadores de hora, minuto e segundo obtendo o valores de hora atual do servidor e incluídos no `setInterval` 
e cada interação o valores de hora, minuto e segundo são obtidos.
```
let data = new Date()
let contadorSegundo = data.getSeconds()
let contadorMinuto = data.getMinutes()
let contadorHora = data.getHours()
```

Por fim os valores dos contadores são atualizados nos elementos do relógio digital
```
document.querySelector('.marcadorSegundo').innerHTML = formatDuasCasas(contadorSegundo)
document.querySelector('.marcadorMinuto').innerHTML = formatDuasCasas(contadorMinuto)
document.querySelector('.marcadorHora').innerHTML = formatDuasCasas(contadorHora)
```
