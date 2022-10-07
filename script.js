let relogio = document.querySelector('.relogioAnalogico')

for(let i=1; i<=12; i++){
    let span = document.createElement('span')
    span.appendChild(document.createTextNode('|'))
    span.classList.add('pipe')
    console.log(getGrausSegundoMinuto(i))
    span.style.transform = `rotate(${getGrausHora(i)}deg)`
    relogio.appendChild(span)
}

let saltoGrauMinutoSegundo = (360/60)
let saltoGrauHora = (360/12)


setInterval(() => {

    let data = new Date()
    let contadorSegundo = data.getSeconds()
    let contadorMinuto = data.getMinutes()
    let contadorHora = data.getHours()

    let contadorGrausSegundo = getGrausSegundoMinuto(contadorSegundo)
    let contadorGrausMinuto = getGrausSegundoMinuto(contadorMinuto)
    let contadorGrausHora = getGrausHora(contadorHora)

    document.querySelector('.ponteiroSegundo').style.transform = `rotate(${contadorGrausSegundo}deg)`
    document.querySelector('.marcadorSegundo').innerHTML = formatDuasCasas(contadorSegundo)

    if(contadorGrausSegundo === 360){
        contadorGrausSegundo = 0
        contadorGrausMinuto += saltoGrauMinutoSegundo
    }else{
        contadorGrausSegundo+=saltoGrauMinutoSegundo
    }

    document.querySelector('.ponteiroMinuto').style.transform = `rotate(${contadorGrausMinuto}deg)`
    document.querySelector('.marcadorMinuto').innerHTML = formatDuasCasas(contadorMinuto)

    if(contadorGrausMinuto === 360){
        contadorGrausMinuto = 0
        contadorGrausHora+=saltoGrauHora
    }
    
    document.querySelector('.ponteiroHora').style.transform = `rotate(${contadorGrausHora}deg)`
    document.querySelector('.marcadorHora').innerHTML = formatDuasCasas(contadorHora)

    if(contadorGrausHora === 360){
        contadorGrausHora = 0
    }

}, 1000)

function getGrausSegundoMinuto(valor){
   return (360 * valor) / 60
}

function getGrausHora(valor) {
    if(valor > 12){
        valor = 12 - (24 - valor)
    }

    return (360 * valor) / 12
}

function formatDuasCasas(valor){
    return valor < 10 ? `0${valor}` : valor
}
