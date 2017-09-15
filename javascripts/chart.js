$(document).ready(function (){
   //------------------------------绘制图表-----------------------------------//
    $("#chartType").kendoComboBox({
      placeholder: "请选择图表类型...",
      dataSource:[
         {text: "在读人数", value: "studying"},
         {text: "在读人数（pie）", value: "studying_pie"},
         {text: "实际升学率", value: "actualEnrollmentRate"},
         {text: "预计升学率", value: "expectEnrollmentRate"}
      ],
      dataTextField: "text",
      dataValueField: "value",
      filter: "contains",
      autoClose: false,
      change: changeChartType
   });

   function changeChartType(e){
     var value=this.value();
     switch(value){
       case "studying":
          createChart_studying();
       break;
       case "studying_pie":
          createChart_studying_pie();
       break;
       case "expectEnrollmentRate":
          createChart_expectEnrollmentRate();
       break;
       case "actualEnrollmentRate":
          createChart_actualEnrollmentRate();
       break;
       default:
          alert("没有该类型的数据");
     }
   }

  // Sample data
  var chart = [];
  function createChart_studying() {
      $("#chart").empty();
      $("#chart").kendoChart({
          title:{
              text: "在读人数"
          },
          renderAs: "canvas",
          dataSource: {
              data: chart
          },
          categoryAxis: {
              min: 0,
              max: 30,
              labels: {
                  rotation: "auto"
              }
          },
          series: [{
              type: "column",
              field: "studying",
              categoryField: "category"
          }],
          pannable: {
              lock: "y"
          }
      });
  }

  function createChart_studying_pie() {
      $("#chart").empty();
      var chartPie=[];
      $.extend(true, chartPie, chart);
      var totle=0;
      // for(var i=0;i<chart.length;i++){
      //     totle+=chart[i].studying;
      // }
      for(var i=0;i<chart.length;i++){
          chartPie[i]["value"]=chart[i].studying;
          chartPie[i]["color"]=getRandomColor();
      }

      $("#chart").kendoChart({
          title:{
              text: "在读人数（pie）"
          },
          renderAs: "canvas",
          // chartArea: {
          //     background: ""
          // },
          seriesDefaults: {
              labels: {
                  visible: true,
                  background: "transparent",
                  template: "#= category #: #= value#%"
              }
          },
          series: [{
              type: "pie",
              startAngle: 50,
              data: chartPie
          }],
          tooltip: {
              visible: true,
              format: "{0}"
          }
      });
  }

  function createChart_expectEnrollmentRate() {
      $("#chart").empty();
      $("#chart").kendoChart({
          title:{
              text: "预计升学率"
          },
          renderAs: "canvas",
          dataSource: {
              data: chart
          },
          categoryAxis: {
              min: 0,
              max: 100,
              labels: {
                  rotation: "auto"
              }
          },
          series: [{
              type: "column",
              field: "expectEnrollmentRate",
              categoryField: "category"
          }],
          pannable: {
              lock: "y"
          }
      });
  }
  function createChart_actualEnrollmentRate() {
      $("#chart").empty();
      $("#chart").kendoChart({
          title:{
              text: "实际升学率"
          },
          renderAs: "canvas",
          dataSource: {
              data: chart
          },
          categoryAxis: {
              min: 0,
              max: 100,
              labels: {
                  rotation: "auto"
              }
          },
          series: [{
              type: "column",
              field: "actualEnrollmentRate",
              categoryField: "category"
          }],
          pannable: {
              lock: "y"
          }
      });
  }

  $.ajax({
        type: "GET",
        url: "json/teachingList.json",
        dataType:"json",
        success: function(data){
          chart=[];
          for (var i=0; i<data.length; i++) {
            chart.push({
              category: data[i].className,
              actualEnrollmentRate: Number(data[i].actualEnrollmentRate)*100,
              expectEnrollmentRate: Number(data[i].expectEnrollmentRate)*100,
              studying: Number(data[i].studying)
            });
          }//
          var comboBox=$("#chartType").data("kendoComboBox");
              comboBox.select(0);
              comboBox.trigger("change");
        }
    });

});

