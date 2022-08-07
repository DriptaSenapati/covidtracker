function formatDate(date){
    var y = date.getFullYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();

    return [
        (mm > 9 ? "" : "0") + mm,
        (dd > 9 ? "" : "0") + dd,
        y
    ].join("/")

}


export function formatDateUsecase(date){
    var y = date.getFullYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();

    return [
        mm,
        dd,
        y
    ].join("/")

}

export default formatDate;