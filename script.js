const url = 'https://economia.awesomeapi.com.br/json/last/USD-BRL'

let firstInput = document.getElementById('firstInput')
let secondInput = document.getElementById('secondInput')

fetch(url)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        let rate = (data.USD.ask)


        firstInput.value = parseFloat(1.00).toFixed(2).replace(".", ",")

        secondInput.value = parseFloat(rate).toFixed(2).replace(".", ",")



        const inputSwap = () => {

            let dolarValue = firstInput.value.replace(",", ".")
            let realValue = secondInput.value.replace(",", ".")


            console.log(dolarValue, realValue)

            let valueOfFirstInput = realValue = dolarValue * rate

            secondInput.value = valueOfFirstInput.toFixed(2).replace(".", ",")

        }

        firstInput.addEventListener('input', inputSwap)

        const secondInputSwap = () => {

            let dolarValue = firstInput.value.replace(",", ".")
            let realValue = secondInput.value.replace(",", ".")


            let valueOfSecondInput = dolarValue = realValue / rate
            firstInput.value = valueOfSecondInput.toFixed(2).replace(".", ",")

        }

        secondInput.addEventListener('input', secondInputSwap)

    })
