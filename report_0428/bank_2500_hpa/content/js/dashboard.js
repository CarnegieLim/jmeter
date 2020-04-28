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

    var data = {"OkPercent": 97.49938063918036, "KoPercent": 2.500619360819634};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.5782832117254992, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.7460576923076923, 500, 1500, "HTTP Request-3"], "isController": false}, {"data": [0.3114344314831432, 500, 1500, "HTTP Request-2"], "isController": false}, {"data": [0.7224822103981025, 500, 1500, "HTTP Request-5"], "isController": false}, {"data": [0.3032566190140394, 500, 1500, "HTTP Request-4"], "isController": false}, {"data": [0.7811818997564415, 500, 1500, "HTTP Request-1"], "isController": false}, {"data": [0.7479172007177647, 500, 1500, "HTTP Request-0"], "isController": false}, {"data": [0.5076769343019383, 500, 1500, "HTTP Request"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 125129, 3129, 2.500619360819634, 9101.387895691545, 0, 294748, 60502.60000000027, 82780.6, 112886.36000000026, 94.09468950685056, 26163.779411287807, 24.66802514861034], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["HTTP Request-3", 15600, 141, 0.9038461538461539, 955.754294871794, 0, 90668, 2601.499999999998, 4061.0, 9516.849999999997, 11.78152520906543, 16.869071063082515, 1.6760064813965185], "isController": false}, {"data": ["HTTP Request-2", 15602, 246, 1.5767209332136904, 18379.71138315593, 0, 277792, 54015.7, 81234.79999999999, 145736.99999999988, 11.782733107727953, 6304.327360123232, 1.630821415544115], "isController": false}, {"data": ["HTTP Request-5", 15599, 147, 0.942368100519264, 1284.6013205974775, 0, 175562, 3237.0, 5472.0, 15519.0, 11.780832263424212, 104.56635713055094, 1.6524638197643684], "isController": false}, {"data": ["HTTP Request-4", 15599, 238, 1.525738829412142, 19613.946855567694, 1, 291769, 58027.0, 84071.0, 150682.0, 11.780440797979677, 6641.200977940749, 1.6086911029880435], "isController": false}, {"data": ["HTTP Request-1", 15602, 128, 0.820407640046148, 840.7415715933884, 0, 102191, 2008.4000000000015, 3561.8499999999985, 9307.219999999983, 11.783062357639581, 38.91495181600161, 1.4151491782367547], "isController": false}, {"data": ["HTTP Request-0", 15604, 0, 0.0, 1069.0526147141877, 1, 102061, 2967.0, 4380.0, 10820.95, 11.778843976363806, 29.274568281099498, 1.299813837235459], "isController": false}, {"data": ["HTTP Request", 31523, 2229, 7.0710275037274375, 15270.828982013134, 0, 294748, 54826.60000000005, 86240.30000000005, 176445.3100000025, 23.704711915898393, 13084.696226803722, 15.42425839939804], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 263,476)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 968, 30.936401406200066, 0.7736016431043163], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 160,204)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 259,504)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 345,564)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 492,528)", 2, 0.06391818472355384, 0.0015983505022816454], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 556,080)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 205,220)", 2, 0.06391818472355384, 0.0015983505022816454], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 397,200)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 181,388)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 481,748)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 149,612)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 372,044)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 244,940)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 52, 1.6618728028124001, 0.041557113059322776], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 509,740)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 534,896)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 107,244)", 3, 0.09587727708533078, 0.002397525753422468], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 287,308)", 2, 0.06391818472355384, 0.0015983505022816454], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 428,976)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 288,632)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 346,888)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 259,504)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 460,752)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 365,424)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 427,652)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 213,164)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 456,780)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 471,344)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 214,488)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 556,080)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 483,260)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 242,292)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Assertion failed", 673, 21.508469159475872, 0.5378449440177736], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 291,280)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 524,304)", 2, 0.06391818472355384, 0.0015983505022816454], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 260,828)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 362,776)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 534,896)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 334,972)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 233,024)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 583,884)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 536,220)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 233,024)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 562,700)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 313,788)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 308,492)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 170,796)", 2, 0.06391818472355384, 0.0015983505022816454], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 332,324)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 524,304)", 2, 0.06391818472355384, 0.0015983505022816454], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 585,208)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 250,236)", 3, 0.09587727708533078, 0.002397525753422468], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 421,032)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 295,252)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 170,796)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 526,952)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 419,708)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 395,612)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 342,916)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 268,772)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 332,324)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 358,804)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 107,244)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 451,484)", 2, 0.06391818472355384, 0.0015983505022816454], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 312,464)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 342,916)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 516,360)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 297,900)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 311,140)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 423,680)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 379,988)", 2, 0.06391818472355384, 0.0015983505022816454], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 229,052)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 244,940)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 242,292)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 550,784)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 301,872)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 377,340)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 381,052)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 439,568)", 2, 0.06391818472355384, 0.0015983505022816454], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException\/Non HTTP response message: Connect to api.bank.com:8080 [api.bank.com\\\/10.128.0.202] failed: Connection refused (Connection refused)", 1334, 42.633429210610416, 1.0660997850218574], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 411,764)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 459,428)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 311,140)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 295,252)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 386,608)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 239,644)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 489,880)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 338,944)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 279,364)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 186,684)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 156,232)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 278,040)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 512,388)", 1, 0.03195909236177692, 7.991752511408227E-4], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 125129, 3129, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException\/Non HTTP response message: Connect to api.bank.com:8080 [api.bank.com\\\/10.128.0.202] failed: Connection refused (Connection refused)", 1334, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 968, "Assertion failed", 673, "Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 52, "Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 107,244)", 3], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["HTTP Request-3", 15600, 141, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 131, "Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 10, null, null, null, null, null, null], "isController": false}, {"data": ["HTTP Request-2", 15602, 246, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 189, "Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 12, "Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 250,236)", 3, "Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 107,244)", 3, "Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 556,392; received: 439,568)", 2], "isController": false}, {"data": ["HTTP Request-5", 15599, 147, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 137, "Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 10, null, null, null, null, null, null], "isController": false}, {"data": ["HTTP Request-4", 15599, 238, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 176, "Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 5, "Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 492,528)", 2, "Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 205,220)", 2, "Non HTTP response code: org.apache.http.ConnectionClosedException\/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 585,936; received: 287,308)", 2], "isController": false}, {"data": ["HTTP Request-1", 15602, 128, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 122, "Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 6, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["HTTP Request", 31523, 2229, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException\/Non HTTP response message: Connect to api.bank.com:8080 [api.bank.com\\\/10.128.0.202] failed: Connection refused (Connection refused)", 1334, "Assertion failed", 673, "Non HTTP response code: org.apache.http.NoHttpResponseException\/Non HTTP response message: bank.com:80 failed to respond", 213, "Non HTTP response code: java.net.SocketException\/Non HTTP response message: Connection reset", 9, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
