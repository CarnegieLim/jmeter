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

    var data = {"OkPercent": 82.59107566285837, "KoPercent": 17.408924337141624};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.3751455054968743, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.6428820655966504, 500, 1500, "HTTP Request-3"], "isController": false}, {"data": [0.1924284717376134, 500, 1500, "HTTP Request-2"], "isController": false}, {"data": [0.6018841591067691, 500, 1500, "HTTP Request-5"], "isController": false}, {"data": [0.17463363572923934, 500, 1500, "HTTP Request-4"], "isController": false}, {"data": [0.7166782972784368, 500, 1500, "HTTP Request-1"], "isController": false}, {"data": [0.6786461967899512, 500, 1500, "HTTP Request-0"], "isController": false}, {"data": [0.013835639273212201, 500, 1500, "HTTP Request"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 23195, 4038, 17.408924337141624, 5862.771804268172, 0, 70820, 24272.9, 31427.0, 36473.750000000204, 139.38716520338687, 37584.16473803686, 26.58648228627702], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["HTTP Request-3", 2866, 109, 3.8032100488485696, 2100.523377529658, 1, 66892, 3655.6000000000004, 8342.850000000004, 31637.66, 17.83314251580467, 26.061625862567826, 2.462667837109239], "isController": false}, {"data": ["HTTP Request-2", 2866, 99, 3.454291695743196, 10289.515352407527, 8, 67085, 25490.0, 30365.5, 34869.78, 17.808653290499773, 9347.628633936562, 2.4178345957634546], "isController": false}, {"data": ["HTTP Request-5", 2866, 113, 3.942777390090719, 2093.30216329379, 1, 65580, 3889.3, 7773.6500000000015, 31570.0, 17.833586380267317, 154.81978694472272, 2.425698170361774], "isController": false}, {"data": ["HTTP Request-4", 2866, 116, 4.047452896022331, 10725.228541521281, 8, 66678, 25731.900000000012, 30041.350000000006, 33324.94999999999, 17.808210666285568, 9783.45995225422, 2.3695461966483777], "isController": false}, {"data": ["HTTP Request-1", 2866, 57, 1.988834612700628, 1455.015701325891, 1, 65366, 2373.3, 4558.550000000007, 31495.32, 17.819172086198535, 58.62452145170918, 2.11487548806874], "isController": false}, {"data": ["HTTP Request-0", 2866, 0, 0.0, 1852.4330076762053, 1, 66885, 2363.800000000001, 4513.0, 31602.33, 17.788204918134536, 44.20994288735585, 1.9629562067863306], "isController": false}, {"data": ["HTTP Request", 5999, 3544, 59.07651275212535, 9044.854809134848, 0, 70820, 30563.0, 33409.0, 41036.0, 36.05016615887553, 18808.00823033849, 13.290849721991863], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.NoRouteToHostException\/Non HTTP response message: No route to host (Host unreachable)", 605, 14.982664685487865, 2.6083207587842208], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 23, 0.5695889053987122, 0.09915930157361501], "isController": false}, {"data": ["Non HTTP response code: java.net.UnknownHostException\/Non HTTP response message: api.bank.com", 2991, 74.07132243684993, 12.895020478551412], "isController": false}, {"data": ["Non HTTP response code: java.net.UnknownHostException\/Non HTTP response message: api.bank.com: Name or service not known", 9, 0.22288261515601784, 0.0388014658331537], "isController": false}, {"data": ["Assertion failed", 410, 10.153541357107478, 1.767622332399224], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 23195, 4038, "Non HTTP response code: java.net.UnknownHostException\/Non HTTP response message: api.bank.com", 2991, "Non HTTP response code: java.net.NoRouteToHostException\/Non HTTP response message: No route to host (Host unreachable)", 605, "Assertion failed", 410, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 23, "Non HTTP response code: java.net.UnknownHostException\/Non HTTP response message: api.bank.com: Name or service not known", 9], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["HTTP Request-3", 2866, 109, "Non HTTP response code: java.net.NoRouteToHostException\/Non HTTP response message: No route to host (Host unreachable)", 103, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 6, null, null, null, null, null, null], "isController": false}, {"data": ["HTTP Request-2", 2866, 99, "Non HTTP response code: java.net.NoRouteToHostException\/Non HTTP response message: No route to host (Host unreachable)", 96, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 3, null, null, null, null, null, null], "isController": false}, {"data": ["HTTP Request-5", 2866, 113, "Non HTTP response code: java.net.NoRouteToHostException\/Non HTTP response message: No route to host (Host unreachable)", 111, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 2, null, null, null, null, null, null], "isController": false}, {"data": ["HTTP Request-4", 2866, 116, "Non HTTP response code: java.net.NoRouteToHostException\/Non HTTP response message: No route to host (Host unreachable)", 113, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 3, null, null, null, null, null, null], "isController": false}, {"data": ["HTTP Request-1", 2866, 57, "Non HTTP response code: java.net.NoRouteToHostException\/Non HTTP response message: No route to host (Host unreachable)", 53, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 4, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["HTTP Request", 5999, 3544, "Non HTTP response code: java.net.UnknownHostException\/Non HTTP response message: api.bank.com", 2991, "Assertion failed", 410, "Non HTTP response code: java.net.NoRouteToHostException\/Non HTTP response message: No route to host (Host unreachable)", 129, "Non HTTP response code: java.net.UnknownHostException\/Non HTTP response message: api.bank.com: Name or service not known", 9, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 5], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
