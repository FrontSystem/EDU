function getDataSourceByData(data){
    return new kendo.data.DataSource({
      data: data,
      pageSize: 10
    });
  }
var getRandomColor = function(){    
  return  '#' +    
    (function(color){    
    return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])    
      && (color.length == 6) ?  color : arguments.callee(color);    
  })('');    
};
$(document).ready(function (){
    var gridColumns=[
        {
          command: ["edit"], 
          title: "操作 ",
          width: "80px"
        },
        {
            field:'className',
            title: "班号/姓名",
            // locked: true,
            width: "50px",
            headerAttributes: {
              style: "text-align:center;"
            }
        },{
            field: 'base',
            title: "班级基数",
            width: "45px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'studying',
            title: "在读人数",
            width: "45px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'actualEnrollment',
            title: "实际升学人数",
            width: "60px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'actualEnrollmentRate',
            title: "实际升学率",
            width: "55px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'expectEnrollment',
            title: "预计升学人数",
            width: "60px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'expectEnrollmentRate',
            title: "预计升学率",
            width: "55px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'execptEnrollmentStutents',
            title: "可能升学人员",
            width: "60px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'classType',
            title: "班型",
            width: "45px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'teacher',
            title: "教师",
            width: "55px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'supervisor',
            title: "督导",
            width: "55px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'classRoom',
            title: "教室",
            width: "45px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'classTime',
            title: "上课时间",
            width: "120px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'totalHour',
            title: "课时数",
            width: "45px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'remianHour',
            title: "剩余课时",
            width: "45px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'progress',
            title: "教学进度",
            width: "70px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'startTime',
            title: "开班时间",
            width: "120px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'planEndTime',
            title: "计划结课时间",
            width: "120px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'actualEndTime',
            title: "实际结课时间",
            width: "120px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'exhibitionClass1',
            title: "展示课1",
            width: "120px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'exhibitionClass2',
            title: "展示课2",
            width: "120px",
            headerAttributes: {
              style: "text-align: center;"
            }
        }
    ];

    $("#grid").kendoGrid({
        dataSource: {
            type: "json",
            transport: {
                read: "json/teachingList.json"
            },
            // group:{field: "teacher"},
            pageSize:20
        },
        columns: gridColumns,
        groupable: false,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        toolbar: ["create","save", "cancel", "excel", "pdf", "group"],
        messages:{
          commands: {
            create: "新建班级",
            save: "保存",
            edit: "编辑",
            canceledit: "取消",
            excel: "导出Execl",
            pdf: "导出Pdf",
            chart:"图表分析",
            group: "分组"
          }
        },
        excel:{
          fileName: "Cammie_Teaching.xlsx",
          allPages:true
        },
        detailTemplate: kendo.template($("#class-etail-template").html()),
        detailInit: detailInit,
        editable: {
          mode:"popup",
          window:{
            title:"编辑",
            width:"550px"
          },
          update: true,
          template: kendo.template($("#popup-editor").html())
        },
        edit: popupEdit,
        dataBound: function(){
           //this.expandRow(this.tbody.find("tr.k-master-row").first());//展开第一行
        }
    });
    $(".k-grid-edit").click(function(e){
       var grid = $("#grid").data("kendoGrid");
           grid.editRow($("#grid tr:eq(1)"));
    });
    
    // $(".k-edit-form-container .k-grid-update").click(function(e){
    //    var grid = $("#grid").data("kendoGrid");
    //    alert("!")
    //    var win=$(".k-edit-form-container").closest(".k-window").data("kendoWindow");
    //        win.close();
    // });

    $(".k-grid-group").click(function(e){
       var grid = $("#grid").data("kendoGrid");
       
       if($(this).hasClass("add")){
           $(this).removeClass("add");
           grid.dataSource.group({ field: "" });
       }else{
           $(this).addClass("add");
           grid.dataSource.group({ field: "teacher" });
       }
        
       // grid.setOptions({
       //   dataSource:{
       //      group:{field: "teacher"}
       //   } 
       // });
    });

    function popupEdit(e){
        e.container.find(".tabstrip").kendoTabStrip({
          animation:{
            open:{
              duration: 50,
              effects: "fadeIn"
            }
          }
        });

       //if(!e.model.isNew()){
        var className=e.container.find("input[name=className]");
            //className.attr("readonly", true);
       //}
       e.container.find("input.time").kendoDatePicker({
        format:"yyyy-MM-dd"
       });

       // e.container.find(".popup-editor-table").data("kendoGrid");
       
       

    }
    
    function detailInit(e){
       var detailRow=e.detailRow;
       var data=e.data;
       detailRow.find(".studentGrid").kendoGrid({
           dataSource: [ data ],
           columns: [
              {field: "st1", title:"学生1",template: "<p>#:st1#</p>"},
              {field: "st2", title:"学生2",template: "<p>#:st2#</p>"},
              {field: "st3", title:"学生3",template: "<p>#:st3#</p>"},
              {field: "st4", title:"学生4",template: "<p>#:st4#</p>"},
              {field: "st5", title:"学生5",template: "<p>#:st5#</p>"},
              {field: "st6", title:"学生6",template: "<p>#:st6#</p>"},
              {field: "st7", title:"学生7",template: "<p>#:st7#</p>"},
              {field: "st8", title:"学生8",template: "<p>#:st8#</p>"},
              {field: "st9", title:"学生9",template: "<p>#:st9#</p>"},
              {field: "st10", title:"学生10",template: "<p>#:st10#</p>"},
              {field: "st11", title:"学生11",template: "<p>#:st11#</p>"},
              {field: "st12", title:"学生12",template: "<p>#:st12#</p>"},
              {field: "st13", title:"学生13",template: "<p>#:st13#</p>"},
              {field: "st14", title:"学生14",template: "<p>#:st14#</p>"}
           ]
       });
    }
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

  //------------------------------绘制日程表-----------------------------------//
  $("#scheduler").kendoScheduler({
      date: new Date("2017/3/3"),
      allDaySlot: true,
      workDayStart: new Date("2017/3/3 1:00 PM"),
      workDayEnd: new Date("2017/3/3 9:00 PM"),
      height: 680,
      messages: {
        time: "Time of the day",
        today: "今日",
        editor:{
          title:"事件"
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2017/3/3 2:00 PM"),
          end: new Date("2017/3/3 3:20 PM"),
          title: "L1-12"
        },
        {
          id: 2,
          start: new Date("2017/3/3 5:00 PM"),
          end: new Date("2017/3/3 6:20 PM"),
          title: "L1-04"
        },
        {
          id: 3,
          start: new Date("2017/9/8 5:00 PM"),
          end: new Date("2017/9/8 6:20 PM"),
          title: "L1-05"
        },
        {
          id: 4,
          start: new Date("2017/9/9 3:00 PM"),
          end: new Date("2017/9/9 4:20 PM"),
          title: "L1-05"
        },
        {
          id: 5,
          start: new Date("2017/9/7 5:00 PM"),
          end: new Date("2017/9/7 6:20 PM"),
          title: "L1-05"
        },
        {
          id: 6,
          start: new Date("2017/9/10 1:00 PM"),
          end: new Date("2017/9/10 4:20 PM"),
          title: "L1-05"
        }
      ]
    });


});