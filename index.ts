// Розробіть клас адаптера (CurrencyAdapter), який реалізує існуючий інтерфейс валюти в FinancialSystem, 
// але внутрішньо використовує CurrencyConverter для виконання конвертації валют.

// Адаптер повинен безперешкодно інтегрувати нову службу конвертації валют в існуючу фінансову систему.

const enum EExchangeRates {
    USD = 'USD',
    EUR = 'EUR' ,
    GBP = 'GBP' ,
    AUD = 'AUD',
    CAD = 'CAD'
}

// текущая система обмена валюты
interface ICurrencyConverter {
    USDExchangeRate : number
    EURExchangeRate : number
    GBPExchangeRate : number
    AUDExchangeRate : number
    CADExchangeRate : number

    readonly convertionToUSD : (hryvnia : number) => number
    readonly convertionToEUR : (hryvnia : number) => number
    readonly convertionToGBP : (hryvnia : number) => number
    readonly convertionToAUD : (hryvnia : number) => number
    readonly convertionToCAD : (hryvnia : number) => number

    readonly changeTheCurrentExchangeRate : (newExchangeRate : Partial<Record<EExchangeRates , number>>) => void
}
class CurrencyConverter implements ICurrencyConverter {
    private _USDExchangeRate : number = 37
    private _EURExchangeRate : number = 40
    private _GBPExchangeRate : number = 46
    private _AUDExchangeRate : number = 25
    private _CADExchangeRate : number = 27

    get USDExchangeRate () : number {
        return this._USDExchangeRate
    }
    get EURExchangeRate () : number {
        return this._EURExchangeRate
    }
    get GBPExchangeRate () : number {
        return this._GBPExchangeRate
    }
    get AUDExchangeRate () : number {
        return this._AUDExchangeRate
    }
    get CADExchangeRate () : number {
        return this._CADExchangeRate
    }

    convertionToUSD (hryvnia : number) {
        return this._USDExchangeRate * hryvnia
    }
    convertionToEUR (hryvnia : number) {
        return this._EURExchangeRate * hryvnia
    }
    convertionToGBP (hryvnia : number) {
        return this._GBPExchangeRate * hryvnia
    }
    convertionToAUD (hryvnia : number) {
        return this._AUDExchangeRate * hryvnia
    }
    convertionToCAD (hryvnia : number) {
        return this._CADExchangeRate * hryvnia
    }

    changeTheCurrentExchangeRate (newExchangeRate : Partial<Record<EExchangeRates , number>>) {
        if (newExchangeRate.USD) {
            this._USDExchangeRate = newExchangeRate.USD
        }
        if (newExchangeRate.EUR) {
            this._EURExchangeRate = newExchangeRate.EUR
        }
        if (newExchangeRate.GBP) {
            this._GBPExchangeRate = newExchangeRate.GBP
        }
        if (newExchangeRate.AUD) {
            this._AUDExchangeRate = newExchangeRate.AUD
        }
        if (newExchangeRate.CAD) {
            this._CADExchangeRate = newExchangeRate.CAD
        }
    }
}

// реализация Adapter
interface IFinancialSystem {
    readonly exchangeRates : Record<EExchangeRates , number>

    readonly exchange : (currency : keyof typeof EExchangeRates , hryvnia : number) => number
    readonly changeTheExchangeRate : (currency : keyof typeof EExchangeRates , newCourse : number) => void
    readonly exchangeRatesTable : () => void
}
class FinancialSystem implements IFinancialSystem {
    private readonly currencyConverter : ICurrencyConverter 

    readonly exchangeRates

    constructor (currencyConverter : ICurrencyConverter) {
        this.currencyConverter = currencyConverter

        this.exchangeRates = {
            USD : this.currencyConverter.USDExchangeRate ,
            EUR : this.currencyConverter.EURExchangeRate ,
            GBP : this.currencyConverter.GBPExchangeRate ,
            AUD : this.currencyConverter.AUDExchangeRate ,
            CAD : this.currencyConverter.CADExchangeRate
        }
    }

    exchange (currency : keyof typeof EExchangeRates , hryvnia : number) {
        switch (currency) {
            case 'USD' :
                return this.currencyConverter.convertionToUSD (hryvnia)
            break
            case 'EUR' :
                return this.currencyConverter.convertionToEUR (hryvnia)
            break
            case 'GBP' :
                return this.currencyConverter.convertionToGBP (hryvnia)
            break
            case 'AUD' :
                return this.currencyConverter.convertionToAUD (hryvnia)
            break
            case 'CAD' :
                return this.currencyConverter.convertionToCAD (hryvnia)
            break
        }
        return this.exchangeRates[currency] * hryvnia
    }
    changeTheExchangeRate (currency : keyof typeof EExchangeRates , newCourse : number) {
        this.currencyConverter.changeTheCurrentExchangeRate (
            {
                [currency] : newCourse
            }
        )
    }
    exchangeRatesTable () {
        // for (const [currency , value] of Object.entries (this.exchangeRates)) {
        //     console.log (`${currency} - ${value}`)
        // }
        Object.entries (this.exchangeRates)
                .forEach (item => {
                    console.log (`${item[0]} - ${item[1]}`)
                })
    }
}


// examples
function clientСurrencyExchange (exchangeSystem : IFinancialSystem) {
    console.log (exchangeSystem.exchange ('USD' , 10))
    exchangeSystem.changeTheExchangeRate ('USD' , 35)
    console.log (exchangeSystem.exchange ('USD' , 10))
    
    exchangeSystem.exchangeRatesTable ()
}

clientСurrencyExchange (new FinancialSystem (new CurrencyConverter()))

