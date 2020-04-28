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

    var data = {"OkPercent": 86.45655019635485, "KoPercent": 13.543449803645151};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.37662370355452623, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.600928542591845, 500, 1500, "HTTP Request-3"], "isController": false}, {"data": [0.22204279370205895, 500, 1500, "HTTP Request-2"], "isController": false}, {"data": [0.5922486879289464, 500, 1500, "HTTP Request-5"], "isController": false}, {"data": [0.17218409366168752, 500, 1500, "HTTP Request-4"], "isController": false}, {"data": [0.638675817521195, 500, 1500, "HTTP Request-1"], "isController": false}, {"data": [0.77735163504239, 500, 1500, "HTTP Request-0"], "isController": false}, {"data": [0.0082, 500, 1500, "HTTP Request"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 19862, 2690, 13.543449803645151, 3413.919746249108, 0, 29077, 11211.0, 15070.549999999996, 20511.32999999999, 513.1636739439349, 143944.54237683277, 101.21108383929726], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["HTTP Request-3", 2477, 17, 0.6863140896245459, 1360.13201453371, 1, 9006, 3817.0000000000014, 4991.0999999999985, 7788.419999999998, 104.8066345096048, 149.91428529872218, 14.9422243907083], "isController": false}, {"data": ["HTTP Request-2", 2477, 22, 0.8881711748082358, 5181.279773920073, 3, 24741, 12133.000000000005, 13793.3, 16311.419999999978, 75.2956196613673, 40552.11385987894, 10.494402985074627], "isController": false}, {"data": ["HTTP Request-5", 2477, 22, 0.8881711748082358, 1408.4202664513532, 1, 15737, 3830.2000000000003, 5192.4, 8373.419999999998, 89.71062257795806, 796.3092438249248, 12.590338486020064], "isController": false}, {"data": ["HTTP Request-4", 2477, 13, 0.5248284214775939, 5694.004844570048, 2, 22966, 12497.600000000002, 13776.8, 16010.399999999996, 80.70506972500978, 45904.07061617237, 11.132787045484164], "isController": false}, {"data": ["HTTP Request-1", 2477, 19, 0.7670569236980218, 1262.4566007266853, 0, 9960, 3827.2000000000003, 5325.5, 8110.319999999999, 112.92454980624572, 387.2928449823342, 13.569566332345568], "isController": false}, {"data": ["HTTP Request-0", 2477, 0, 0.0, 780.7670569236974, 1, 8365, 3088.0, 4129.099999999993, 5042.219999999999, 144.58323604949803, 359.3401716269262, 15.954986009368431], "isController": false}, {"data": ["HTTP Request", 5000, 2597, 51.94, 5790.085000000004, 0, 29077, 18225.300000000003, 19979.75, 23084.729999999996, 129.1822761917065, 72038.79174706918, 50.60554191964863], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 114, 4.237918215613383, 0.5739603262511328], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 2, 0.07434944237918216, 0.010069479407914611], "isController": false}, {"data": ["Non HTTP response code: java.net.UnknownHostException\/Non HTTP response message: api.bank.com", 2497, 92.82527881040892, 12.571745040781392], "isController": false}, {"data": ["Non HTTP response code: java.net.UnknownHostException\/Non HTTP response message: api.bank.com: Name or service not known", 3, 0.11152416356877323, 0.015104219111871917], "isController": false}, {"data": ["Assertion failed", 74, 2.7509293680297398, 0.3725707380928406], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 19862, 2690, "Non HTTP response code: java.net.UnknownHostException\/Non HTTP response message: api.bank.com", 2497, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 114, "Assertion failed", 74, "Non HTTP response code: java.net.UnknownHostException\/Non HTTP response message: api.bank.com: Name or service not known", 3, "Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 2], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["HTTP Request-3", 2477, 17, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 16, "Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 1, null, null, null, null, null, null], "isController": false}, {"data": ["HTTP Request-2", 2477, 22, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 21, "Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 1, null, null, null, null, null, null], "isController": false}, {"data": ["HTTP Request-5", 2477, 22, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 22, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["HTTP Request-4", 2477, 13, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 13, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["HTTP Request-1", 2477, 19, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 19, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["HTTP Request", 5000, 2597, "Non HTTP response code: java.net.UnknownHostException\/Non HTTP response message: api.bank.com", 2497, "Assertion failed", 74, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 23, "Non HTTP response code: java.net.UnknownHostException\/Non HTTP response message: api.bank.com: Name or service not known", 3, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
