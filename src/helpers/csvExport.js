function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line !== '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }
    console.log(items);
    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}


const getValProps = (props) => {
    var COUNT = props.data[props.tagName];
    return COUNT
}


const prepareData = (headers,data) => {
    var formatData = data.map((item) => {
        var ret = {};
        for(var i in item){
            if(i !== "tableData"){
                if(typeof(item[i]) === 'object'){
                    ret[i] = getValProps(item[i].props);
                }else{
                    ret[i] = item[i]
                }
            }
        }
        return ret;
    })

    var formatHead = {}
    for(var ix = 0; ix < headers.length; ix++){
        formatHead[ix] = headers[ix].title;
    }

    console.log(formatHead);
    return ({
        frmData: formatData,
        frmHead: formatHead
    })
}

export default function Export(headers,data,fileTitle){
    var formatData = prepareData(headers,data);

    exportCSVFile(formatData.frmHead,formatData.frmData,fileTitle);
}
