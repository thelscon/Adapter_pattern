"use strict";
// Розробіть клас адаптера (CurrencyAdapter), який реалізує існуючий інтерфейс валюти в FinancialSystem, 
// але внутрішньо використовує CurrencyConverter для виконання конвертації валют.
class CurrencyConverter {
    _USDExchangeRate = 37;
    _EURExchangeRate = 40;
    _GBPExchangeRate = 46;
    _AUDExchangeRate = 25;
    _CADExchangeRate = 27;
    get USDExchangeRate() {
        return this._USDExchangeRate;
    }
    get EURExchangeRate() {
        return this._EURExchangeRate;
    }
    get GBPExchangeRate() {
        return this._GBPExchangeRate;
    }
    get AUDExchangeRate() {
        return this._AUDExchangeRate;
    }
    get CADExchangeRate() {
        return this._CADExchangeRate;
    }
    convertionToUSD(hryvnia) {
        return this._USDExchangeRate * hryvnia;
    }
    convertionToEUR(hryvnia) {
        return this._EURExchangeRate * hryvnia;
    }
    convertionToGBP(hryvnia) {
        return this._GBPExchangeRate * hryvnia;
    }
    convertionToAUD(hryvnia) {
        return this._AUDExchangeRate * hryvnia;
    }
    convertionToCAD(hryvnia) {
        return this._CADExchangeRate * hryvnia;
    }
    changeTheCurrentExchangeRate(newExchangeRate) {
        if (newExchangeRate.USD) {
            this._USDExchangeRate = newExchangeRate.USD;
        }
        if (newExchangeRate.EUR) {
            this._EURExchangeRate = newExchangeRate.EUR;
        }
        if (newExchangeRate.GBP) {
            this._GBPExchangeRate = newExchangeRate.GBP;
        }
        if (newExchangeRate.AUD) {
            this._AUDExchangeRate = newExchangeRate.AUD;
        }
        if (newExchangeRate.CAD) {
            this._CADExchangeRate = newExchangeRate.CAD;
        }
    }
}
class FinancialSystem {
    currencyConverter;
    exchangeRates;
    constructor(currencyConverter) {
        this.currencyConverter = currencyConverter;
        this.exchangeRates = {
            USD: this.currencyConverter.USDExchangeRate,
            EUR: this.currencyConverter.EURExchangeRate,
            GBP: this.currencyConverter.GBPExchangeRate,
            AUD: this.currencyConverter.AUDExchangeRate,
            CAD: this.currencyConverter.CADExchangeRate
        };
    }
    exchange(currency, hryvnia) {
        switch (currency) {
            case 'USD':
                return this.currencyConverter.convertionToUSD(hryvnia);
                break;
            case 'EUR':
                return this.currencyConverter.convertionToEUR(hryvnia);
                break;
            case 'GBP':
                return this.currencyConverter.convertionToGBP(hryvnia);
                break;
            case 'AUD':
                return this.currencyConverter.convertionToAUD(hryvnia);
                break;
            case 'CAD':
                return this.currencyConverter.convertionToCAD(hryvnia);
                break;
        }
        return this.exchangeRates[currency] * hryvnia;
    }
    changeTheExchangeRate(currency, newCourse) {
        this.currencyConverter.changeTheCurrentExchangeRate({
            [currency]: newCourse
        });
    }
    exchangeRatesTable() {
        // for (const [currency , value] of Object.entries (this.exchangeRates)) {
        //     console.log (`${currency} - ${value}`)
        // }
        Object.entries(this.exchangeRates)
            .forEach(item => {
            console.log(`${item[0]} - ${item[1]}`);
        });
    }
}
// examples
function clientСurrencyExchange(exchangeSystem) {
    console.log(exchangeSystem.exchange('USD', 10));
    exchangeSystem.changeTheExchangeRate('USD', 35);
    console.log(exchangeSystem.exchange('USD', 10));
    exchangeSystem.exchangeRatesTable();
}
clientСurrencyExchange(new FinancialSystem(new CurrencyConverter()));
