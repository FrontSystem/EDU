$(function(){

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
      }//dataSource
   });
   $("#student").kendoComboBox({
      placeholder: "请选择学生...",
      dataTextField: "StudentName",
      dataValueField: "id",
      filter: "contains",
      autoClose: false,
      dataSource:{
        transport: {
          read: {
            url: "json/student.json",
            dataType:"json"
          }
        }
      }//dataSource
   });
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
      }//dataSource
   });
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
            pageSize: 4,
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