/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 6;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 99.56903031821598, "KoPercent": 0.430969681784014};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6979829616637434, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.876629889669007, 500, 1500, "HTTP Request-3"], "isController": false}, {"data": [0.4112337011033099, 500, 1500, "HTTP Request-2"], "isController": false}, {"data": [0.8642928786359078, 500, 1500, "HTTP Request-5"], "isController": false}, {"data": [0.40421263791374124, 500, 1500, "HTTP Request-4"], "isController": false}, {"data": [0.9039117352056169, 500, 1500, "HTTP Request-1"], "isController": false}, {"data": [0.870110330992979, 500, 1500, "HTTP Request-0"], "isController": false}, {"data": [0.62695, 500, 1500, "HTTP Request"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 39910, 172, 0.430969681784014, 2378.2899273365065, 0, 46846, 12268.0, 16742.95, 23046.99, 525.2214194533276, 147964.58482670147, 141.73767490656297], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["HTTP Request-3", 4985, 22, 0.44132397191574724, 397.2086258776333, 0, 25441, 1106.4000000000005, 1937.0999999999976, 4183.960000000005, 71.0397309468164, 101.49071767407229, 10.153079776299665], "isController": false}, {"data": ["HTTP Request-2", 4985, 19, 0.3811434302908726, 4971.544232698096, 3, 41017, 14272.0, 17204.8, 22463.980000000003, 70.87711316167375, 38381.65432378382, 9.929105114242248], "isController": false}, {"data": ["HTTP Request-5", 4985, 18, 0.36108324974924777, 439.37572718154524, 0, 25220, 1261.2000000000016, 2082.7, 5608.920000000009, 71.04074332701543, 633.3737266596955, 10.02315715804962], "isController": false}, {"data": ["HTTP Request-4", 4985, 21, 0.42126379137412234, 5314.064192577737, 3, 46578, 15331.60000000001, 18060.69999999999, 22805.160000000014, 71.04175573606955, 40489.21816269862, 9.809992696308964], "isController": false}, {"data": ["HTTP Request-1", 4985, 15, 0.30090270812437314, 300.697492477432, 0, 25207, 1061.4000000000005, 1376.8999999999987, 3576.420000000001, 70.87711316167375, 234.56974877546813, 8.556949618244637], "isController": false}, {"data": ["HTTP Request-0", 4985, 0, 0.0, 388.58094282848487, 0, 11518, 1128.0, 2001.3999999999996, 4343.4800000000105, 70.25084554678693, 174.59804874665306, 7.752290573034104], "isController": false}, {"data": ["HTTP Request", 10000, 77, 0.77, 3603.7367000000063, 1, 46846, 14350.499999999998, 18019.04999999996, 23296.85, 131.60145814415625, 73990.36452421549, 89.69658512722572], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Percentile 1
            case 8:
            // Percentile 2
            case 9:
            // Percentile 3
            case 10:
            // Throughput
            case 11:
            // Kbytes/s
            case 12:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 109, 63.372093023255815, 0.2731145076421949], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 1, 0.5813953488372093, 0.0025056376847907794], "isController": false}, {"data": ["Assertion failed", 62, 36.04651162790697, 0.15534953645702831], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 39910, 172, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 109, "Assertion failed", 62, "Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 1, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["HTTP Request-3", 4985, 22, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 22, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["HTTP Request-2", 4985, 19, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 19, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["HTTP Request-5", 4985, 18, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 18, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["HTTP Request-4", 4985, 21, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 21, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["HTTP Request-1", 4985, 15, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 15, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["HTTP Request", 10000, 77, "Assertion failed", 62, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 14, "Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 1, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
