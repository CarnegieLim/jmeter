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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 2.0, "minX": 0.0, "maxY": 2870.0, "series": [{"data": [[0.0, 2.0], [0.1, 2.0], [0.2, 2.0], [0.3, 2.0], [0.4, 2.0], [0.5, 2.0], [0.6, 2.0], [0.7, 2.0], [0.8, 2.0], [0.9, 2.0], [1.0, 2.0], [1.1, 2.0], [1.2, 2.0], [1.3, 2.0], [1.4, 2.0], [1.5, 2.0], [1.6, 2.0], [1.7, 2.0], [1.8, 2.0], [1.9, 3.0], [2.0, 3.0], [2.1, 3.0], [2.2, 3.0], [2.3, 3.0], [2.4, 3.0], [2.5, 3.0], [2.6, 3.0], [2.7, 3.0], [2.8, 3.0], [2.9, 3.0], [3.0, 3.0], [3.1, 3.0], [3.2, 3.0], [3.3, 3.0], [3.4, 3.0], [3.5, 3.0], [3.6, 3.0], [3.7, 3.0], [3.8, 3.0], [3.9, 3.0], [4.0, 3.0], [4.1, 3.0], [4.2, 3.0], [4.3, 3.0], [4.4, 3.0], [4.5, 3.0], [4.6, 3.0], [4.7, 3.0], [4.8, 3.0], [4.9, 3.0], [5.0, 3.0], [5.1, 3.0], [5.2, 3.0], [5.3, 3.0], [5.4, 3.0], [5.5, 3.0], [5.6, 3.0], [5.7, 3.0], [5.8, 3.0], [5.9, 3.0], [6.0, 3.0], [6.1, 3.0], [6.2, 3.0], [6.3, 3.0], [6.4, 3.0], [6.5, 3.0], [6.6, 3.0], [6.7, 3.0], [6.8, 3.0], [6.9, 3.0], [7.0, 3.0], [7.1, 3.0], [7.2, 3.0], [7.3, 3.0], [7.4, 3.0], [7.5, 3.0], [7.6, 3.0], [7.7, 3.0], [7.8, 3.0], [7.9, 3.0], [8.0, 3.0], [8.1, 3.0], [8.2, 3.0], [8.3, 3.0], [8.4, 3.0], [8.5, 3.0], [8.6, 3.0], [8.7, 3.0], [8.8, 3.0], [8.9, 3.0], [9.0, 3.0], [9.1, 3.0], [9.2, 3.0], [9.3, 3.0], [9.4, 3.0], [9.5, 3.0], [9.6, 3.0], [9.7, 3.0], [9.8, 3.0], [9.9, 3.0], [10.0, 3.0], [10.1, 3.0], [10.2, 3.0], [10.3, 3.0], [10.4, 3.0], [10.5, 3.0], [10.6, 3.0], [10.7, 3.0], [10.8, 3.0], [10.9, 3.0], [11.0, 3.0], [11.1, 3.0], [11.2, 3.0], [11.3, 3.0], [11.4, 3.0], [11.5, 3.0], [11.6, 3.0], [11.7, 3.0], [11.8, 3.0], [11.9, 3.0], [12.0, 3.0], [12.1, 3.0], [12.2, 3.0], [12.3, 3.0], [12.4, 3.0], [12.5, 3.0], [12.6, 3.0], [12.7, 3.0], [12.8, 3.0], [12.9, 3.0], [13.0, 3.0], [13.1, 3.0], [13.2, 3.0], [13.3, 4.0], [13.4, 4.0], [13.5, 4.0], [13.6, 4.0], [13.7, 4.0], [13.8, 4.0], [13.9, 4.0], [14.0, 4.0], [14.1, 4.0], [14.2, 4.0], [14.3, 4.0], [14.4, 4.0], [14.5, 4.0], [14.6, 4.0], [14.7, 4.0], [14.8, 4.0], [14.9, 4.0], [15.0, 4.0], [15.1, 4.0], [15.2, 4.0], [15.3, 4.0], [15.4, 4.0], [15.5, 4.0], [15.6, 4.0], [15.7, 4.0], [15.8, 4.0], [15.9, 4.0], [16.0, 4.0], [16.1, 4.0], [16.2, 4.0], [16.3, 4.0], [16.4, 4.0], [16.5, 4.0], [16.6, 4.0], [16.7, 4.0], [16.8, 4.0], [16.9, 4.0], [17.0, 4.0], [17.1, 4.0], [17.2, 4.0], [17.3, 4.0], [17.4, 4.0], [17.5, 4.0], [17.6, 4.0], [17.7, 4.0], [17.8, 4.0], [17.9, 4.0], [18.0, 4.0], [18.1, 4.0], [18.2, 4.0], [18.3, 4.0], [18.4, 4.0], [18.5, 4.0], [18.6, 4.0], [18.7, 4.0], [18.8, 4.0], [18.9, 4.0], [19.0, 4.0], [19.1, 4.0], [19.2, 4.0], [19.3, 4.0], [19.4, 4.0], [19.5, 4.0], [19.6, 4.0], [19.7, 4.0], [19.8, 4.0], [19.9, 4.0], [20.0, 4.0], [20.1, 4.0], [20.2, 4.0], [20.3, 4.0], [20.4, 4.0], [20.5, 4.0], [20.6, 4.0], [20.7, 4.0], [20.8, 4.0], [20.9, 4.0], [21.0, 4.0], [21.1, 4.0], [21.2, 4.0], [21.3, 4.0], [21.4, 4.0], [21.5, 4.0], [21.6, 4.0], [21.7, 4.0], [21.8, 4.0], [21.9, 4.0], [22.0, 4.0], [22.1, 4.0], [22.2, 4.0], [22.3, 4.0], [22.4, 4.0], [22.5, 4.0], [22.6, 4.0], [22.7, 4.0], [22.8, 4.0], [22.9, 4.0], [23.0, 4.0], [23.1, 4.0], [23.2, 4.0], [23.3, 4.0], [23.4, 4.0], [23.5, 5.0], [23.6, 5.0], [23.7, 5.0], [23.8, 5.0], [23.9, 5.0], [24.0, 5.0], [24.1, 5.0], [24.2, 5.0], [24.3, 5.0], [24.4, 5.0], [24.5, 5.0], [24.6, 5.0], [24.7, 5.0], [24.8, 5.0], [24.9, 5.0], [25.0, 5.0], [25.1, 5.0], [25.2, 5.0], [25.3, 5.0], [25.4, 5.0], [25.5, 5.0], [25.6, 5.0], [25.7, 5.0], [25.8, 5.0], [25.9, 5.0], [26.0, 5.0], [26.1, 5.0], [26.2, 5.0], [26.3, 5.0], [26.4, 5.0], [26.5, 5.0], [26.6, 5.0], [26.7, 5.0], [26.8, 5.0], [26.9, 5.0], [27.0, 5.0], [27.1, 5.0], [27.2, 5.0], [27.3, 5.0], [27.4, 5.0], [27.5, 5.0], [27.6, 5.0], [27.7, 5.0], [27.8, 5.0], [27.9, 5.0], [28.0, 5.0], [28.1, 5.0], [28.2, 5.0], [28.3, 5.0], [28.4, 5.0], [28.5, 5.0], [28.6, 5.0], [28.7, 5.0], [28.8, 5.0], [28.9, 5.0], [29.0, 5.0], [29.1, 5.0], [29.2, 5.0], [29.3, 5.0], [29.4, 5.0], [29.5, 5.0], [29.6, 5.0], [29.7, 6.0], [29.8, 6.0], [29.9, 6.0], [30.0, 6.0], [30.1, 6.0], [30.2, 6.0], [30.3, 6.0], [30.4, 6.0], [30.5, 6.0], [30.6, 6.0], [30.7, 6.0], [30.8, 6.0], [30.9, 6.0], [31.0, 6.0], [31.1, 6.0], [31.2, 6.0], [31.3, 6.0], [31.4, 6.0], [31.5, 6.0], [31.6, 6.0], [31.7, 6.0], [31.8, 6.0], [31.9, 6.0], [32.0, 6.0], [32.1, 6.0], [32.2, 6.0], [32.3, 6.0], [32.4, 6.0], [32.5, 6.0], [32.6, 6.0], [32.7, 6.0], [32.8, 6.0], [32.9, 6.0], [33.0, 6.0], [33.1, 6.0], [33.2, 6.0], [33.3, 6.0], [33.4, 6.0], [33.5, 6.0], [33.6, 6.0], [33.7, 6.0], [33.8, 6.0], [33.9, 6.0], [34.0, 6.0], [34.1, 6.0], [34.2, 7.0], [34.3, 7.0], [34.4, 7.0], [34.5, 7.0], [34.6, 7.0], [34.7, 7.0], [34.8, 7.0], [34.9, 7.0], [35.0, 7.0], [35.1, 7.0], [35.2, 7.0], [35.3, 7.0], [35.4, 7.0], [35.5, 7.0], [35.6, 7.0], [35.7, 7.0], [35.8, 7.0], [35.9, 7.0], [36.0, 7.0], [36.1, 7.0], [36.2, 7.0], [36.3, 7.0], [36.4, 7.0], [36.5, 7.0], [36.6, 8.0], [36.7, 8.0], [36.8, 8.0], [36.9, 8.0], [37.0, 8.0], [37.1, 8.0], [37.2, 8.0], [37.3, 8.0], [37.4, 8.0], [37.5, 8.0], [37.6, 8.0], [37.7, 8.0], [37.8, 8.0], [37.9, 8.0], [38.0, 8.0], [38.1, 8.0], [38.2, 8.0], [38.3, 8.0], [38.4, 8.0], [38.5, 8.0], [38.6, 8.0], [38.7, 8.0], [38.8, 8.0], [38.9, 9.0], [39.0, 9.0], [39.1, 9.0], [39.2, 9.0], [39.3, 9.0], [39.4, 9.0], [39.5, 9.0], [39.6, 9.0], [39.7, 9.0], [39.8, 9.0], [39.9, 9.0], [40.0, 9.0], [40.1, 9.0], [40.2, 9.0], [40.3, 9.0], [40.4, 9.0], [40.5, 9.0], [40.6, 9.0], [40.7, 10.0], [40.8, 10.0], [40.9, 10.0], [41.0, 10.0], [41.1, 10.0], [41.2, 10.0], [41.3, 10.0], [41.4, 10.0], [41.5, 10.0], [41.6, 10.0], [41.7, 10.0], [41.8, 10.0], [41.9, 11.0], [42.0, 11.0], [42.1, 11.0], [42.2, 11.0], [42.3, 11.0], [42.4, 11.0], [42.5, 11.0], [42.6, 11.0], [42.7, 11.0], [42.8, 11.0], [42.9, 11.0], [43.0, 11.0], [43.1, 11.0], [43.2, 12.0], [43.3, 12.0], [43.4, 12.0], [43.5, 12.0], [43.6, 12.0], [43.7, 12.0], [43.8, 12.0], [43.9, 12.0], [44.0, 12.0], [44.1, 12.0], [44.2, 12.0], [44.3, 12.0], [44.4, 13.0], [44.5, 13.0], [44.6, 13.0], [44.7, 13.0], [44.8, 13.0], [44.9, 13.0], [45.0, 13.0], [45.1, 13.0], [45.2, 13.0], [45.3, 14.0], [45.4, 14.0], [45.5, 14.0], [45.6, 14.0], [45.7, 14.0], [45.8, 14.0], [45.9, 15.0], [46.0, 15.0], [46.1, 15.0], [46.2, 15.0], [46.3, 15.0], [46.4, 15.0], [46.5, 16.0], [46.6, 16.0], [46.7, 16.0], [46.8, 16.0], [46.9, 17.0], [47.0, 17.0], [47.1, 17.0], [47.2, 17.0], [47.3, 17.0], [47.4, 17.0], [47.5, 17.0], [47.6, 17.0], [47.7, 18.0], [47.8, 18.0], [47.9, 18.0], [48.0, 18.0], [48.1, 18.0], [48.2, 18.0], [48.3, 18.0], [48.4, 19.0], [48.5, 19.0], [48.6, 19.0], [48.7, 19.0], [48.8, 19.0], [48.9, 19.0], [49.0, 19.0], [49.1, 19.0], [49.2, 19.0], [49.3, 20.0], [49.4, 20.0], [49.5, 20.0], [49.6, 20.0], [49.7, 20.0], [49.8, 20.0], [49.9, 20.0], [50.0, 20.0], [50.1, 21.0], [50.2, 21.0], [50.3, 21.0], [50.4, 21.0], [50.5, 21.0], [50.6, 21.0], [50.7, 21.0], [50.8, 22.0], [50.9, 22.0], [51.0, 22.0], [51.1, 22.0], [51.2, 22.0], [51.3, 22.0], [51.4, 23.0], [51.5, 23.0], [51.6, 25.0], [51.7, 25.0], [51.8, 25.0], [51.9, 25.0], [52.0, 26.0], [52.1, 26.0], [52.2, 26.0], [52.3, 26.0], [52.4, 26.0], [52.5, 27.0], [52.6, 27.0], [52.7, 27.0], [52.8, 28.0], [52.9, 28.0], [53.0, 29.0], [53.1, 29.0], [53.2, 29.0], [53.3, 29.0], [53.4, 30.0], [53.5, 30.0], [53.6, 30.0], [53.7, 30.0], [53.8, 31.0], [53.9, 31.0], [54.0, 31.0], [54.1, 32.0], [54.2, 32.0], [54.3, 32.0], [54.4, 32.0], [54.5, 32.0], [54.6, 32.0], [54.7, 33.0], [54.8, 33.0], [54.9, 33.0], [55.0, 34.0], [55.1, 34.0], [55.2, 34.0], [55.3, 34.0], [55.4, 34.0], [55.5, 34.0], [55.6, 35.0], [55.7, 35.0], [55.8, 35.0], [55.9, 35.0], [56.0, 35.0], [56.1, 36.0], [56.2, 36.0], [56.3, 36.0], [56.4, 36.0], [56.5, 36.0], [56.6, 36.0], [56.7, 37.0], [56.8, 37.0], [56.9, 37.0], [57.0, 37.0], [57.1, 37.0], [57.2, 37.0], [57.3, 37.0], [57.4, 38.0], [57.5, 38.0], [57.6, 38.0], [57.7, 38.0], [57.8, 39.0], [57.9, 39.0], [58.0, 39.0], [58.1, 39.0], [58.2, 39.0], [58.3, 39.0], [58.4, 40.0], [58.5, 40.0], [58.6, 40.0], [58.7, 40.0], [58.8, 40.0], [58.9, 40.0], [59.0, 41.0], [59.1, 41.0], [59.2, 41.0], [59.3, 41.0], [59.4, 42.0], [59.5, 42.0], [59.6, 42.0], [59.7, 43.0], [59.8, 43.0], [59.9, 43.0], [60.0, 44.0], [60.1, 44.0], [60.2, 44.0], [60.3, 45.0], [60.4, 45.0], [60.5, 45.0], [60.6, 45.0], [60.7, 46.0], [60.8, 46.0], [60.9, 46.0], [61.0, 47.0], [61.1, 47.0], [61.2, 47.0], [61.3, 47.0], [61.4, 48.0], [61.5, 48.0], [61.6, 48.0], [61.7, 48.0], [61.8, 49.0], [61.9, 49.0], [62.0, 49.0], [62.1, 49.0], [62.2, 49.0], [62.3, 50.0], [62.4, 50.0], [62.5, 50.0], [62.6, 50.0], [62.7, 50.0], [62.8, 51.0], [62.9, 51.0], [63.0, 51.0], [63.1, 51.0], [63.2, 52.0], [63.3, 52.0], [63.4, 53.0], [63.5, 53.0], [63.6, 53.0], [63.7, 54.0], [63.8, 54.0], [63.9, 54.0], [64.0, 55.0], [64.1, 55.0], [64.2, 55.0], [64.3, 56.0], [64.4, 56.0], [64.5, 56.0], [64.6, 56.0], [64.7, 56.0], [64.8, 57.0], [64.9, 57.0], [65.0, 57.0], [65.1, 57.0], [65.2, 58.0], [65.3, 58.0], [65.4, 58.0], [65.5, 58.0], [65.6, 59.0], [65.7, 59.0], [65.8, 59.0], [65.9, 60.0], [66.0, 60.0], [66.1, 61.0], [66.2, 61.0], [66.3, 61.0], [66.4, 62.0], [66.5, 63.0], [66.6, 63.0], [66.7, 63.0], [66.8, 64.0], [66.9, 64.0], [67.0, 64.0], [67.1, 65.0], [67.2, 65.0], [67.3, 66.0], [67.4, 66.0], [67.5, 66.0], [67.6, 67.0], [67.7, 67.0], [67.8, 68.0], [67.9, 68.0], [68.0, 68.0], [68.1, 68.0], [68.2, 68.0], [68.3, 69.0], [68.4, 71.0], [68.5, 71.0], [68.6, 72.0], [68.7, 74.0], [68.8, 74.0], [68.9, 74.0], [69.0, 75.0], [69.1, 75.0], [69.2, 75.0], [69.3, 76.0], [69.4, 77.0], [69.5, 77.0], [69.6, 78.0], [69.7, 78.0], [69.8, 79.0], [69.9, 79.0], [70.0, 80.0], [70.1, 81.0], [70.2, 82.0], [70.3, 82.0], [70.4, 82.0], [70.5, 83.0], [70.6, 83.0], [70.7, 83.0], [70.8, 84.0], [70.9, 84.0], [71.0, 85.0], [71.1, 85.0], [71.2, 86.0], [71.3, 86.0], [71.4, 87.0], [71.5, 87.0], [71.6, 88.0], [71.7, 88.0], [71.8, 88.0], [71.9, 89.0], [72.0, 89.0], [72.1, 90.0], [72.2, 91.0], [72.3, 91.0], [72.4, 92.0], [72.5, 93.0], [72.6, 94.0], [72.7, 95.0], [72.8, 96.0], [72.9, 96.0], [73.0, 96.0], [73.1, 97.0], [73.2, 97.0], [73.3, 97.0], [73.4, 99.0], [73.5, 99.0], [73.6, 100.0], [73.7, 100.0], [73.8, 101.0], [73.9, 102.0], [74.0, 104.0], [74.1, 105.0], [74.2, 108.0], [74.3, 109.0], [74.4, 111.0], [74.5, 112.0], [74.6, 116.0], [74.7, 117.0], [74.8, 118.0], [74.9, 120.0], [75.0, 120.0], [75.1, 121.0], [75.2, 123.0], [75.3, 125.0], [75.4, 127.0], [75.5, 130.0], [75.6, 132.0], [75.7, 134.0], [75.8, 140.0], [75.9, 141.0], [76.0, 147.0], [76.1, 150.0], [76.2, 154.0], [76.3, 161.0], [76.4, 168.0], [76.5, 182.0], [76.6, 186.0], [76.7, 197.0], [76.8, 200.0], [76.9, 204.0], [77.0, 205.0], [77.1, 207.0], [77.2, 208.0], [77.3, 225.0], [77.4, 226.0], [77.5, 248.0], [77.6, 255.0], [77.7, 315.0], [77.8, 320.0], [77.9, 363.0], [78.0, 375.0], [78.1, 387.0], [78.2, 391.0], [78.3, 399.0], [78.4, 401.0], [78.5, 415.0], [78.6, 445.0], [78.7, 477.0], [78.8, 485.0], [78.9, 496.0], [79.0, 502.0], [79.1, 514.0], [79.2, 520.0], [79.3, 526.0], [79.4, 537.0], [79.5, 557.0], [79.6, 558.0], [79.7, 575.0], [79.8, 577.0], [79.9, 601.0], [80.0, 603.0], [80.1, 621.0], [80.2, 630.0], [80.3, 639.0], [80.4, 647.0], [80.5, 659.0], [80.6, 664.0], [80.7, 670.0], [80.8, 674.0], [80.9, 690.0], [81.0, 690.0], [81.1, 695.0], [81.2, 699.0], [81.3, 701.0], [81.4, 702.0], [81.5, 725.0], [81.6, 728.0], [81.7, 738.0], [81.8, 747.0], [81.9, 765.0], [82.0, 782.0], [82.1, 798.0], [82.2, 808.0], [82.3, 819.0], [82.4, 825.0], [82.5, 833.0], [82.6, 835.0], [82.7, 839.0], [82.8, 842.0], [82.9, 845.0], [83.0, 850.0], [83.1, 853.0], [83.2, 857.0], [83.3, 863.0], [83.4, 865.0], [83.5, 870.0], [83.6, 874.0], [83.7, 875.0], [83.8, 876.0], [83.9, 879.0], [84.0, 882.0], [84.1, 889.0], [84.2, 895.0], [84.3, 900.0], [84.4, 908.0], [84.5, 910.0], [84.6, 911.0], [84.7, 917.0], [84.8, 919.0], [84.9, 921.0], [85.0, 926.0], [85.1, 932.0], [85.2, 933.0], [85.3, 945.0], [85.4, 951.0], [85.5, 957.0], [85.6, 960.0], [85.7, 964.0], [85.8, 965.0], [85.9, 977.0], [86.0, 986.0], [86.1, 993.0], [86.2, 1005.0], [86.3, 1010.0], [86.4, 1016.0], [86.5, 1028.0], [86.6, 1030.0], [86.7, 1035.0], [86.8, 1041.0], [86.9, 1057.0], [87.0, 1059.0], [87.1, 1063.0], [87.2, 1067.0], [87.3, 1084.0], [87.4, 1086.0], [87.5, 1094.0], [87.6, 1103.0], [87.7, 1119.0], [87.8, 1123.0], [87.9, 1141.0], [88.0, 1143.0], [88.1, 1152.0], [88.2, 1157.0], [88.3, 1174.0], [88.4, 1190.0], [88.5, 1200.0], [88.6, 1208.0], [88.7, 1219.0], [88.8, 1237.0], [88.9, 1266.0], [89.0, 1271.0], [89.1, 1280.0], [89.2, 1286.0], [89.3, 1300.0], [89.4, 1331.0], [89.5, 1348.0], [89.6, 1355.0], [89.7, 1366.0], [89.8, 1371.0], [89.9, 1376.0], [90.0, 1394.0], [90.1, 1408.0], [90.2, 1414.0], [90.3, 1421.0], [90.4, 1421.0], [90.5, 1441.0], [90.6, 1453.0], [90.7, 1462.0], [90.8, 1473.0], [90.9, 1480.0], [91.0, 1490.0], [91.1, 1498.0], [91.2, 1506.0], [91.3, 1523.0], [91.4, 1537.0], [91.5, 1540.0], [91.6, 1544.0], [91.7, 1568.0], [91.8, 1576.0], [91.9, 1586.0], [92.0, 1591.0], [92.1, 1601.0], [92.2, 1608.0], [92.3, 1620.0], [92.4, 1624.0], [92.5, 1631.0], [92.6, 1637.0], [92.7, 1651.0], [92.8, 1654.0], [92.9, 1665.0], [93.0, 1667.0], [93.1, 1681.0], [93.2, 1699.0], [93.3, 1744.0], [93.4, 1756.0], [93.5, 1773.0], [93.6, 1791.0], [93.7, 1808.0], [93.8, 1813.0], [93.9, 1816.0], [94.0, 1821.0], [94.1, 1832.0], [94.2, 1834.0], [94.3, 1845.0], [94.4, 1849.0], [94.5, 1866.0], [94.6, 1875.0], [94.7, 1894.0], [94.8, 1900.0], [94.9, 1917.0], [95.0, 1929.0], [95.1, 1942.0], [95.2, 1949.0], [95.3, 1963.0], [95.4, 1964.0], [95.5, 1976.0], [95.6, 1977.0], [95.7, 1982.0], [95.8, 1992.0], [95.9, 2033.0], [96.0, 2037.0], [96.1, 2063.0], [96.2, 2066.0], [96.3, 2088.0], [96.4, 2108.0], [96.5, 2112.0], [96.6, 2119.0], [96.7, 2139.0], [96.8, 2171.0], [96.9, 2191.0], [97.0, 2192.0], [97.1, 2192.0], [97.2, 2197.0], [97.3, 2200.0], [97.4, 2242.0], [97.5, 2256.0], [97.6, 2297.0], [97.7, 2326.0], [97.8, 2372.0], [97.9, 2395.0], [98.0, 2400.0], [98.1, 2421.0], [98.2, 2439.0], [98.3, 2462.0], [98.4, 2482.0], [98.5, 2491.0], [98.6, 2534.0], [98.7, 2567.0], [98.8, 2569.0], [98.9, 2587.0], [99.0, 2590.0], [99.1, 2600.0], [99.2, 2605.0], [99.3, 2616.0], [99.4, 2644.0], [99.5, 2788.0], [99.6, 2811.0], [99.7, 2828.0], [99.8, 2836.0], [99.9, 2868.0], [100.0, 2870.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 2.0, "minX": 0.0, "maxY": 1840.0, "series": [{"data": [[0.0, 1840.0], [600.0, 33.0], [700.0, 23.0], [800.0, 53.0], [900.0, 48.0], [1000.0, 35.0], [1100.0, 23.0], [1200.0, 20.0], [1300.0, 19.0], [1400.0, 27.0], [1500.0, 23.0], [1600.0, 29.0], [100.0, 79.0], [1700.0, 10.0], [1800.0, 29.0], [1900.0, 27.0], [2000.0, 12.0], [2100.0, 24.0], [2200.0, 8.0], [2300.0, 8.0], [2400.0, 15.0], [2500.0, 14.0], [2600.0, 9.0], [2800.0, 12.0], [2700.0, 2.0], [200.0, 22.0], [300.0, 17.0], [400.0, 15.0], [500.0, 24.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 2800.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 222.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1974.0, "series": [{"data": [[0.0, 1974.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 304.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 222.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 114.79920000000028, "minX": 1.58807436E12, "maxY": 114.79920000000028, "series": [{"data": [[1.58807436E12, 114.79920000000028]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.58807436E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -14400000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 3.432515337423313, "minX": 1.0, "maxY": 2612.0, "series": [{"data": [[2.0, 5.121900826446281], [3.0, 8.074324324324321], [4.0, 10.476190476190478], [5.0, 16.999999999999996], [6.0, 13.303030303030301], [7.0, 16.555555555555554], [8.0, 21.07142857142857], [9.0, 19.923076923076923], [10.0, 23.636363636363637], [11.0, 26.166666666666664], [12.0, 26.000000000000004], [13.0, 20.545454545454543], [14.0, 30.714285714285715], [15.0, 20.0], [16.0, 17.833333333333332], [17.0, 13.75], [18.0, 20.0], [19.0, 24.833333333333336], [20.0, 30.25], [21.0, 21.93333333333333], [22.0, 40.0], [23.0, 35.0], [24.0, 15.625], [25.0, 24.0], [26.0, 29.0], [27.0, 30.833333333333332], [28.0, 39.0], [29.0, 24.666666666666668], [31.0, 40.15384615384616], [32.0, 56.0], [35.0, 62.0], [34.0, 83.63636363636363], [36.0, 66.66666666666667], [37.0, 79.3], [39.0, 70.5], [38.0, 73.5], [41.0, 56.17647058823529], [40.0, 41.27272727272727], [43.0, 58.00000000000001], [42.0, 82.66666666666667], [44.0, 52.111111111111114], [45.0, 46.0], [47.0, 75.0], [46.0, 75.25], [49.0, 39.0], [48.0, 39.0], [51.0, 43.46666666666667], [50.0, 48.0], [52.0, 61.75000000000001], [53.0, 89.25], [54.0, 65.57142857142858], [55.0, 83.0], [57.0, 61.599999999999994], [56.0, 75.57142857142857], [59.0, 143.0], [58.0, 54.0], [61.0, 111.66666666666667], [60.0, 80.0], [62.0, 58.5], [63.0, 72.41666666666666], [64.0, 60.99999999999999], [66.0, 41.0], [67.0, 61.833333333333336], [71.0, 81.5], [68.0, 39.0], [69.0, 40.333333333333336], [72.0, 75.0], [75.0, 64.5], [74.0, 75.85714285714286], [73.0, 58.4375], [76.0, 116.0], [78.0, 85.6], [79.0, 74.77777777777777], [77.0, 111.0], [80.0, 64.23529411764706], [83.0, 62.25], [82.0, 94.57142857142857], [81.0, 110.75], [87.0, 58.33333333333333], [85.0, 78.53333333333333], [84.0, 47.0], [86.0, 68.0], [88.0, 55.57142857142857], [91.0, 62.5], [89.0, 87.0], [93.0, 66.2], [95.0, 18.5], [94.0, 36.79166666666667], [92.0, 25.0], [98.0, 83.44444444444444], [97.0, 60.92307692307691], [96.0, 35.666666666666664], [99.0, 65.2], [101.0, 27.666666666666668], [106.0, 49.0], [105.0, 52.5], [157.0, 91.0], [158.0, 58.0], [159.0, 73.0], [165.0, 493.0], [163.0, 2567.0], [167.0, 68.0], [160.0, 82.0], [173.0, 94.5], [168.0, 72.0], [181.0, 1709.125], [176.0, 2600.0], [180.0, 396.5], [182.0, 1648.5], [178.0, 97.0], [191.0, 693.0], [189.0, 833.0], [188.0, 825.5], [187.0, 711.0], [185.0, 1160.7222222222224], [186.0, 1699.0], [184.0, 834.0], [198.0, 900.0], [197.0, 911.0], [196.0, 471.0], [195.0, 690.0], [193.0, 1028.0], [192.0, 838.0], [199.0, 81.89999999999999], [207.0, 784.5], [205.0, 796.0], [203.0, 876.0], [202.0, 960.0], [200.0, 863.0], [214.0, 1228.5], [213.0, 1304.25], [210.0, 2036.0], [209.0, 2482.0], [208.0, 908.0], [220.0, 2086.2], [219.0, 1498.0], [218.0, 2036.5], [221.0, 354.0], [222.0, 81.0], [231.0, 1336.0], [230.0, 698.6666666666667], [227.0, 1319.5], [238.0, 1067.5], [236.0, 1982.0], [235.0, 964.0], [247.0, 979.3333333333334], [245.0, 1005.5], [244.0, 857.0], [243.0, 986.0], [242.0, 781.5], [241.0, 1030.0], [240.0, 928.5], [246.0, 1141.0], [255.0, 1219.0], [253.0, 1104.0], [252.0, 1088.5], [250.0, 1103.0], [249.0, 812.5], [259.0, 1440.2222222222222], [271.0, 1270.3333333333335], [268.0, 2254.0], [269.0, 2612.0], [270.0, 1583.5], [266.0, 1435.0], [267.0, 966.8076923076923], [264.0, 421.0], [265.0, 83.0], [263.0, 1331.0], [262.0, 1376.0], [261.0, 1361.5], [260.0, 101.0], [256.0, 2201.5], [285.0, 228.56249999999994], [283.0, 638.1538461538462], [284.0, 1116.75], [275.0, 1864.3333333333335], [279.0, 2322.8181818181815], [273.0, 2352.6666666666665], [272.0, 682.0], [274.0, 2111.2], [282.0, 202.25000000000003], [281.0, 162.0], [276.0, 1220.3333333333333], [277.0, 1522.142857142857], [280.0, 1116.5], [278.0, 1228.25], [286.0, 55.854166666666664], [295.0, 1562.0], [292.0, 1604.1666666666667], [289.0, 260.0], [288.0, 483.0], [364.0, 1533.0], [391.0, 159.0], [396.0, 74.0], [409.0, 327.0], [428.0, 1008.25], [427.0, 913.2608695652175], [429.0, 1396.8333333333333], [444.0, 1073.0], [445.0, 847.0], [432.0, 1301.25], [435.0, 1881.0], [434.0, 1142.0], [436.0, 1635.0], [439.0, 1530.75], [438.0, 1600.0], [446.0, 1430.5], [447.0, 1253.0], [442.0, 1491.0], [451.0, 731.3333333333334], [463.0, 993.0], [462.0, 1007.0], [460.0, 1162.3], [461.0, 1394.0], [457.0, 1152.0], [453.0, 1926.5], [452.0, 1780.0], [450.0, 1631.0], [449.0, 1606.4545454545455], [448.0, 1327.75], [478.0, 1685.5], [472.0, 1731.3333333333333], [479.0, 1723.75], [475.0, 1399.625], [473.0, 1377.5], [477.0, 891.6666666666666], [476.0, 1564.3333333333333], [467.0, 874.0], [466.0, 1451.5], [465.0, 1295.0], [464.0, 1522.25], [474.0, 661.0], [471.0, 870.75], [470.0, 1518.1999999999998], [469.0, 1189.5], [468.0, 1741.6666666666667], [495.0, 1302.0], [493.0, 1432.3333333333333], [494.0, 1159.5], [491.0, 1817.5], [490.0, 1351.6000000000001], [489.0, 1327.0], [487.0, 1699.0], [484.0, 1544.4285714285713], [492.0, 1690.3333333333333], [486.0, 1616.0], [485.0, 1112.3333333333333], [499.0, 1171.8], [510.0, 1816.0], [509.0, 956.0], [508.0, 1471.5], [507.0, 874.0], [505.0, 1679.0], [503.0, 743.0], [502.0, 982.25], [496.0, 1297.5238095238096], [497.0, 987.0769230769231], [515.0, 1791.0], [514.0, 1472.0], [513.0, 1176.0], [512.0, 1810.5], [1.0, 3.432515337423313]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[114.79720000000027, 327.4379999999999]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 515.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 10208.333333333334, "minX": 1.58807436E12, "maxY": 24416.666666666668, "series": [{"data": [[1.58807436E12, 10208.333333333334]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.58807436E12, 24416.666666666668]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.58807436E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -14400000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 327.4379999999999, "minX": 1.58807436E12, "maxY": 327.4379999999999, "series": [{"data": [[1.58807436E12, 327.4379999999999]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.58807436E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -14400000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 325.93200000000024, "minX": 1.58807436E12, "maxY": 325.93200000000024, "series": [{"data": [[1.58807436E12, 325.93200000000024]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.58807436E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -14400000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 12.940799999999989, "minX": 1.58807436E12, "maxY": 12.940799999999989, "series": [{"data": [[1.58807436E12, 12.940799999999989]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.58807436E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -14400000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 2.0, "minX": 1.58807436E12, "maxY": 2870.0, "series": [{"data": [[1.58807436E12, 2870.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.58807436E12, 2.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.58807436E12, 1397.6000000000004]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.58807436E12, 2590.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.58807436E12, 1929.9499999999998]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.58807436E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -14400000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 3.0, "minX": 69.0, "maxY": 1267.0, "series": [{"data": [[263.0, 5.0], [274.0, 13.5], [69.0, 3.0], [310.0, 52.0], [391.0, 1267.0], [443.0, 106.0], [249.0, 4.0], [250.0, 4.0], [251.0, 4.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 443.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 3.0, "minX": 69.0, "maxY": 1267.0, "series": [{"data": [[263.0, 5.0], [274.0, 13.0], [69.0, 3.0], [310.0, 52.0], [391.0, 1267.0], [443.0, 99.0], [249.0, 4.0], [250.0, 4.0], [251.0, 4.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 443.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 41.666666666666664, "minX": 1.58807436E12, "maxY": 41.666666666666664, "series": [{"data": [[1.58807436E12, 41.666666666666664]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.58807436E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -14400000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 41.666666666666664, "minX": 1.58807436E12, "maxY": 41.666666666666664, "series": [{"data": [[1.58807436E12, 41.666666666666664]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.58807436E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -14400000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 41.666666666666664, "minX": 1.58807436E12, "maxY": 41.666666666666664, "series": [{"data": [[1.58807436E12, 41.666666666666664]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.58807436E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -14400000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 41.666666666666664, "minX": 1.58807436E12, "maxY": 41.666666666666664, "series": [{"data": [[1.58807436E12, 41.666666666666664]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.58807436E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -14400000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

