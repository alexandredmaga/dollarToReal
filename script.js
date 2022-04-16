const url = 'https://economia.awesomeapi.com.br/json/last/USD-BRL'

let firstInput = document.getElementById('firstInput')
let secondInput = document.getElementById('secondInput')

// função para criar uma máscara de moeda

String.prototype.reverse = function () {
    return this.split('').reverse().join('');
}

function maskMoney(field, event) {

    let value = field.value.replace(/[^\d]+/gi, '').reverse()
    let result = ""
    let mask = "##.###.###,##".reverse()

    for (let x = 0, y = 0; x < mask.length && y < value.length;) {

        if (mask.charAt(x) != '#') {
            result += mask.charAt(x)
            x++
            // caso a posição do objeto for diferente do #, ele entrara dentro da
            //condição, e adicionará um . ou , na string. porque ele esta recebendo a sua própria
            //posição atual, e depois incrementa o x para continuar o for
        } else {
            result += value.charAt(y)
            y++
            x++
            // essa condição faz com que ele concatene o valor dentro do result de acordo com sua posição no objeto
        }
    }

    field.value = result.reverse();
}

fetch(url)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        let rate = (data.USDBRL.ask)

        firstInput.value = (1.00).toLocaleString('pt-br', { style: 'currency', currency: 'USD' })

        secondInput.value = Number(rate).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })



        const inputSwap = (event, func) => {
            //chamando função da máscara
            func(firstInput, event)

            // retirando os pontos e vírgulas que a máscara coloca, para conseguir realizar os cálculos
            let dolarValue = firstInput.value.replace(/[^0-9]/g, '')
            rate = Number(rate).toFixed(2)

            // verificando se o valor é menor que 100, no caso quando é maior, a mascara
            //adiciona uma , porque está na posição 2 do array, então por isso preciso converter.
            // Se eu não converter o campo ficará dem decimal 1,00 , e o resutado 400 por exemplo.
            if (dolarValue < 100)
                secondInput.value = (dolarValue * rate).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            else
                secondInput.value = (dolarValue * rate / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

        }
        // chamando a função pelo evento keyup
        firstInput.addEventListener('keyup', function (event) {
            maskMoney
            inputSwap(event, maskMoney)

        })

        const secondInputSwap = (event, func) => {

            func(secondInput, event)

            let realValue = secondInput.value.replace(/[^0-9]/g, '')

            if (realValue > 100)
                firstInput.value = ((realValue / 100) / rate).toLocaleString('pt-br', { style: 'currency', currency: 'USD' })
            else
                firstInput.value = (realValue / rate).toLocaleString('pt-br', { style: 'currency', currency: 'USD' })

        }

        secondInput.addEventListener('keyup', function (event) {
            maskMoney
            secondInputSwap(event, maskMoney)
        })

    })
