$(function(){
   $("#teacher").kendoComboBox({
      placeholder: "请选择教师...",
      dataTextField: "teacherName",
      dataValueField: "teacherName",
      filter: "contains",
      autoClose: false,
      dataSource:{
        transport: {
          read: {
            url: "json/teacher.json",
            dataType:"json"
          }
        }
      },//dataSource
      change: function(e){
         var value=this.value();
         if(value=="") return;
         //console.log("teacher",value);
         var className=$("#className").data("kendoComboBox");
             className.dataSource.filter({field: "teacher", value: value, operator: "eq"});
         var student=$("#student").data("kendoComboBox");
             student.dataSource.filter({field: "TeacherName", value: value, operator: "eq"});
         filterListView();
      }
   });
   $("#className").kendoComboBox({
      placeholder: "请选择班级...",
      dataTextField: "name",
      dataValueField: "name",
      filter: "contains",
      autoClose: false,
      dataSource:{
        transport: {
          read: {
            url: "json/className.json",
            dataType:"json"
          }
        }
      },//dataSource
      change: function(e){
         var value=this.value();
         if(value=="") return;
         //console.log("className",value);
         var student=$("#student").data("kendoComboBox");
             student.dataSource.filter({field: "className", value: value, operator: "eq"});
         filterListView();
      }
   });
   $("#student").kendoComboBox({
      placeholder: "请选择学生...",
      dataTextField: "StudentName",
      dataValueField: "StudentName",
      filter: "contains",
      autoClose: false,
      dataSource:{
        transport: {
          read: {
            url: "json/student.json",
            dataType:"json"
          }
        }
      },//dataSource
      change: function(e){
         var value=this.value();
         if(value=="") return;
         //console.log("student",value);
         var student=$("#student").data("kendoComboBox");
             student.dataSource.filter({field: "className", value: value, operator: "eq"});
         filterListView();
      }
   });
   function filterListView(){
      var teacher=$("#teacher").data("kendoComboBox");
      var className=$("#className").data("kendoComboBox");
      var student=$("#student").data("kendoComboBox");
      var field=[];
      if(teacher.value()){
         field.push({field: "TeacherName", value: teacher.value(), operator: "eq"})
      }
      if(className.value()){
         field.push({field: "className", value: className.value(), operator: "eq"})
      }
      if(student.value()){
         field.push({field: "StudentName", value: student.value(), operator: "eq"})
      }

      var listView=$("#listView").data("kendoListView");
          listView.dataSource.filter(field);
   }
});

$(document).ready(function () {
     var dataSource = new kendo.data.DataSource({
        transport: {
            read:{
                url: "json/student.json",
                dataType: "json"
            },
            parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
                }
            }
        },
        batch: true,
        pageSize: 6,
        schema: {
            model: {
                id: "ProductID",
                fields: {
                    ProductID: { editable: false, nullable: true },
                    StudentName: "StudentName",
                    Degree: "Degree",
                    className: "className",
                    TeacherName: "TeacherName"
                }
            }
        }
    });


    $("#pager").kendoPager({
        dataSource: dataSource
    });

    var listView = $("#listView").kendoListView({
        dataSource: dataSource,
        template: kendo.template($("#template").html()),
        editTemplate: kendo.template($("#editTemplate").html())
    }).data("kendoListView");

    $(".k-add-button").click(function(e) {
        listView.add();
        e.preventDefault();
    });
});