function getDataSourceByData(data){
    return new kendo.data.DataSource({
      data: data,
      pageSize: 10
    });
  }
function getAllDataSourceByData(data){
    return new kendo.data.DataSource({
      data: data
    });
  }
var getRandomColor = function(){    
  return  '#' +    
    (function(color){    
    return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])    
      && (color.length == 6) ?  color : arguments.callee(color);    
  })('');    
};
//教师列表
var teacherList=[];
var classNameList=[];

$(function(){
  //菜单
  $("#menu").kendoMenu({
    animation: false,
    dataSource: [
      {
        text: "上传Execl", 
        url:"upload.html"
      },
      {
        text: "教学信息", 
        url:"index.html"
      },
      {
        text: "教学统计",
        url:"chart.html"
      },
      {
        text: "教学日程", 
        url:"scheduler.html"
      },
      {
        text: "学生信息",
        url:"listView.html"
      },
      {
        text: "教师信息"
      }
    ]
  });
  $("#degree").kendoComboBox({
      placeholder: "请选择学习阶段...",
      dataSource:[
         {text: "一阶", value: "first"},
         {text: "二阶", value: "second"},
         {text: "三阶", value: "third"},
         {text: "四阶", value: "fourth"}
      ],
      dataTextField: "text",
      dataValueField: "value",
      autoClose: false
   });
  // $("#teacher").kendoComboBox({
  //     placeholder: "请选择教师...",
  //     dataTextField: "text",
  //     dataValueField: "value",
  //     filter: "contains",
  //     autoClose: false
  //  });
  function getView(data, field){
     var dataSource=new kendo.data.DataSource({
         data: data
     });
     dataSource.group({field: field});
     var view = dataSource.view();
     var items=[];
     items.push({
        text :"全部",
        value: "全部"
     });
     for(var i=0;i<view.length;i++){
        items.push({
          text :view[i].value,
          value: view[i].value
        });
     }
     return items;
  }

  $.ajax({
        type: "GET",
        url: "json/teachingList.json",
        dataType:"json",
        success: function(data){
           if(data.length){

            teacherList=getView(data, "teacher");
            console.log("teacherList", teacherList);

            classNameList=getView(data, "className");
            console.log("classNameList", classNameList);
            
            // init();
          }
        }//success
    });


});