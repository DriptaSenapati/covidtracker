import _ from 'underscore';

export const chartDataFormat = (stateCode, dataArray,seldates = null) => {
    var filterArray = dataArray.filter((x) => x.CODE === stateCode)[0];

    if(seldates !== null){
        filterArray = _.pick(filterArray,...[seldates])
    }

    var res = _.omit(filterArray,"STATE/UT","CODE");
    var dates = Object.keys(res);

    return [res, dates];
}


export const DataDate = (date) => {
    return (new Date(date))
}

const numberFormatter = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 1,
});

export const abbreviateNumber = (number) => {
    const numberCleaned = Math.round(Math.abs(number));
    if (numberCleaned < 1e3) return numberFormatter.format(Math.floor(number));
    else if (numberCleaned >= 1e3 && numberCleaned < 1e5)
        return numberFormatter.format(number / 1e3) + 'K';
    else if (numberCleaned >= 1e5 && numberCleaned < 1e7)
        return numberFormatter.format(number / 1e5) + 'L';
    else if (numberCleaned >= 1e7 && numberCleaned < 1e10)
        return numberFormatter.format(number / 1e7) + 'Cr';
    else if (numberCleaned >= 1e10 && numberCleaned < 1e14)
        return numberFormatter.format(number / 1e10) + 'K Cr';
    else if (numberCleaned >= 1e14)
        return numberFormatter.format(number / 1e14) + 'L Cr';
};


export const getUniformScale = (ChartData,stateCode,dates) => {
    var AllData = []
    for (const [,v] of Object.entries(ChartData)){
        var [data] = chartDataFormat(stateCode,v,dates)
        AllData = [
            ...AllData,
            ...Object.values(data)
        ]
    }

    return AllData;
}