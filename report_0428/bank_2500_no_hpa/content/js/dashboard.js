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

    var data = {"OkPercent": 97.59983553476897, "KoPercent": 2.4001644652310223};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.511808089633551, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.6489997937719117, 500, 1500, "HTTP Request-3"], "isController": false}, {"data": [0.2330377397401526, 500, 1500, "HTTP Request-2"], "isController": false}, {"data": [0.6137347906784905, 500, 1500, "HTTP Request-5"], "isController": false}, {"data": [0.2253041864301918, 500, 1500, "HTTP Request-4"], "isController": false}, {"data": [0.6878737884099815, 500, 1500, "HTTP Request-1"], "isController": false}, {"data": [0.6891111569395751, 500, 1500, "HTTP Request-0"], "isController": false}, {"data": [0.49837067209775965, 500, 1500, "HTTP Request"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 38914, 934, 2.4001644652310223, 10442.435550187602, 0, 214948, 58240.10000000003, 83251.75, 111235.52000000008, 162.78738998025503, 44846.70461548256, 43.47098634479268], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["HTTP Request-3", 4849, 91, 1.876675603217158, 1443.1540523819303, 0, 129635, 3495.0, 5085.5, 14485.0, 20.84049649291707, 29.988177261069232, 2.9356055009842184], "isController": false}, {"data": ["HTTP Request-2", 4849, 107, 2.206640544442153, 21184.668591462185, 3, 203226, 62995.0, 80648.5, 108678.5, 20.839690391566133, 11079.102129095198, 2.865914062600728], "isController": false}, {"data": ["HTTP Request-5", 4849, 80, 1.6498247061249742, 1893.9632914002923, 0, 129569, 4263.0, 7471.5, 19338.0, 20.840406923020723, 183.9443963470192, 2.902347292391038], "isController": false}, {"data": ["HTTP Request-4", 4849, 125, 2.5778511033202722, 22272.336358011948, 4, 205179, 68360.0, 83513.5, 109245.5, 20.820988449482588, 11610.351411543541, 2.81285558632831], "isController": false}, {"data": ["HTTP Request-1", 4849, 96, 1.979789647349969, 1239.2621159001837, 0, 93709, 3233.0, 4523.0, 12551.0, 20.840406923020723, 68.54102327219961, 2.4736802024729987], "isController": false}, {"data": ["HTTP Request-0", 4849, 0, 0.0, 1133.382965559906, 1, 35871, 3177.0, 4626.5, 9806.5, 20.73799727998221, 51.54121394292453, 2.288470402966787], "isController": false}, {"data": ["HTTP Request", 9820, 435, 4.429735234215886, 17102.57454175143, 2, 214948, 66332.69999999995, 84965.54999999994, 113167.90999999997, 41.079615809377195, 22426.07477679038, 27.61260617637462], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 425, 45.50321199143469, 1.0921519247571567], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 350,860)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 399,848)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 508,416)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 262,152)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 243,616)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 271,420)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 395,876)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 256,856)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 566,672)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 139,020)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 423,680)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 190,656)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 64, 6.852248394004283, 0.1644652310222542], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 486,152)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 287,308)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 107,244)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 537,280)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 259,504)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 95,328)", 2, 0.21413276231263384, 0.005139538469445443], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 411,764)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 374,692)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 414,412)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 420,252)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 246,264)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 516,360)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Assertion failed", 374, 40.04282655246253, 0.9610936937862979], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 251,560)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 231,700)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 336,296)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 517,684)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 446,188)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 170,796)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 525,628)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 280,688)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 435,596)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 181,388)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 238,320)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 438,244)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 386,608)", 2, 0.21413276231263384, 0.005139538469445443], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 560,052)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 127,104)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 170,796)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 305,844)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 450,160)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 268,772)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 107,244)", 3, 0.32119914346895073, 0.007709307704168166], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 557,404)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 390,580)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 481,936)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 311,140)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 548,136)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 178,740)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 242,292)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 340,268)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException\/Non HTTP response message: Connect to bank.com:80 [bank.com\\\/10.128.0.201] failed: Connection timed out (Connection timed out)", 4, 0.4282655246252677, 0.010279076938890887], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 195,952)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 215,812)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 146,964)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 95,328)", 2, 0.21413276231263384, 0.005139538469445443], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 338,944)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 497,824)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 168,148)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 477,964)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 511,064)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 389,256)", 1, 0.10706638115631692, 0.0025697692347227217], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 38914, 934, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 425, "Assertion failed", 374, "Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 64, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException\/Non HTTP response message: Connect to bank.com:80 [bank.com\\\/10.128.0.201] failed: Connection timed out (Connection timed out)", 4, "Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 107,244)", 3], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["HTTP Request-3", 4849, 91, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 79, "Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 11, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException\/Non HTTP response message: Connect to bank.com:80 [bank.com\\\/10.128.0.201] failed: Connection timed out (Connection timed out)", 1, null, null, null, null], "isController": false}, {"data": ["HTTP Request-2", 4849, 107, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 68, "Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 8, "Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 386,608)", 2, "Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 95,328)", 2, "Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 238,320)", 1], "isController": false}, {"data": ["HTTP Request-5", 4849, 80, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 68, "Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 10, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException\/Non HTTP response message: Connect to bank.com:80 [bank.com\\\/10.128.0.201] failed: Connection timed out (Connection timed out)", 2, null, null, null, null], "isController": false}, {"data": ["HTTP Request-4", 4849, 125, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 76, "Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 12, "Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 107,244)", 3, "Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 95,328)", 2, "Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 438,244)", 1], "isController": false}, {"data": ["HTTP Request-1", 4849, 96, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 85, "Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 11, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["HTTP Request", 9820, 435, "Assertion failed", 374, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 49, "Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 12, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
