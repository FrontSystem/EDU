$(document).ready(function (){
    //表格数据源
    var gridData=[];
    //
    var gridColumns=[
        { 
          command: ["edit"],
          width:80
        },
        {
            field:'className',
            title: "班号/姓名",
            width: "55px",
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
            width: "115px",
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
            width: "90px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'planEndTime',
            title: "计划结课时间",
            width: "90px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'actualEndTime',
            title: "实际结课时间",
            width: "90px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'exhibitionClass1',
            title: "展示课1",
            width: "90px",
            headerAttributes: {
              style: "text-align: center;"
            }
        },{
            field: 'exhibitionClass2',
            title: "展示课2",
            width: "90px",
            headerAttributes: {
              style: "text-align: center;"
            }
        }
    ];

    $("#grid").kendoGrid({
        columns: gridColumns,
        groupable: false,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        toolbar: ["create","save", "cancel", "excel", "pdf", "group", "ungroup"],
        messages:{
          commands: {
            create: "新建班级",
            save: "保存",
            edit: "编辑",
            canceledit: "取消",
            excel: "导出Execl",
            pdf: "导出Pdf",
            chart:"图表分析",
            group: "分组",
            ungroup: "取消分组"
          }
        },
        excel:{
          fileName: "Cammie_Teaching.xlsx",
          allPages:true
        },
        detailTemplate: kendo.template($("#class-etail-template").html()),
        detailInit: detailInit,
        editable: {
          mode: "popup",
          window:{
            title:"编辑",
            width:"550px",
            modal: true
          },
          template: kendo.template($("#popup-editor").html())
        },
        edit: popupEdit
    });

    //按教师姓名对表格进行分组、取消分组
    $(".k-grid-group").click(function(e){
       var grid = $("#grid").data("kendoGrid");
           grid.dataSource.group({ field: "teacher" });
    });
    $(".k-grid-ungroup").click(function(e){
       var grid = $("#grid").data("kendoGrid");
           grid.setDataSource(getDataSourceByData(gridData));
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
        //var className=e.container.find("input[name=className]");
            //className.attr("readonly", true);
       //}
       e.container.find("input.time").kendoDatePicker({
          format:"yyyy/MM/dd"
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

    $.ajax({
        type: "GET",
        url: "json/teachingList.json",
        dataType:"json",
        success: function(data){
          var grid = $("#grid").data("kendoGrid");
          gridData=data;
          var myDataSource=new kendo.data.DataSource({
              type: "json",
              // transport: {
              //     read: {
              //       url: "/json/teachingList",
              //       dataType: "json",
              //       data: {type: "all",d: Math.random()}
              //     }
              // },
              data: data,
              pageSize:10,
              // requestEnd: function(e){
              //   var response=e.response;
              //   if(response){
              //      gridData=response;
              //   }
              // },
              schema: {
                id: "className",
                model: {
                  fields: {
                    className: {validation: { required: true } }
                  }
                }
              }
          });
          grid.setDataSource(myDataSource);
        }
    });
});

$(function(){
   var $error=$("#uploadDialog .error");
   $('#importExecl').on('click',function(){
      //var file = $('#file').filebox('getValue');
      var file = $('#file').val();
      if(file.length == 0){
        $error.text('请选择要上传的文件!').css("visibility","visible");
        return false;
      }
      var extName = file.substring(file.lastIndexOf('.'),file.length).toLowerCase();
      if(extName != '.xlsx' && extName != '.xls'){
         $error.text('只支持xlsx文件').css("visibility","visible");             
         return false;        
      }
      var fileType=$("input[name='fileType']:checked").val();
      console.log("fileType", fileType)
      if(fileType==undefined || fileType==""){
        $error.text('请选择文件类型').css("visibility","visible");             
         return false; 
      }
      $("#fileForm").submit();  
  });
   //获取上传文件名
   //必须使用代理，在dialog中，直接用#file不起作用
   $("#uploadDialog").on("change","input[type='file']", function(){
      var filePath=$(this).val();
      var arr=filePath.split('\\');
      var fileName=arr[arr.length-1];
      $("#fileName").val(fileName);
  });
   $("#uploadDialog").kendoWindow({
      pinned: true,
      actions: [ "Minimize", "Maximize"],
      //modal: true,
      width:450,
      height:200,
      position: {
        top: "35%", // or "100px"
        left: "35%"
      },
      title:"上传文件"
    });
});
