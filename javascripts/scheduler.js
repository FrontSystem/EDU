$(function(){
  //------------------------------绘制日程表-----------------------------------//
  $("#schedulerType").kendoComboBox({
      placeholder: "请选择教师...",
      dataTextField: "text",
      dataValueField: "value",
      filter: "contains",
      autoClose: false,
      change: function(e){
        var value=this.value();
        var scheduler=$("#scheduler").data("kendoScheduler");
        if(value!="全部"){
           scheduler.dataSource.filter({field: "teacher", operator: "startswith", value: value});
        }else{
           scheduler.dataSource.filter({field: "teacher", operator: "startswith", value: ""});
        }
      }
   });
  function getView(data){
     var dataSource=new kendo.data.DataSource({
         data: data
     });
     dataSource.group({field:"teacher"});
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
  $("#scheduler").kendoScheduler({
      date: new Date("2017/9/13"),
      allDaySlot: true,
      workDayStart: new Date("2017/9/13 8:00 AM"),
      workDayEnd: new Date("2017/9/13 9:00 PM"),
      height: 600,
      messages: {
        time: "Time of the day",
        today: "今日",
        editor:{
          title:"事件"
        }
      },
      dataSource: {
        type: "json",
        transport: {
          read: {
            url: "json/schedular.json"
          }
        },
        requestEnd: function(e){
          var response=e.response;
          //console.log("response", response);
          if(response!=undefined){
            var view=getView(response);
            //console.log("view", view);
            var schedulerType=$("#schedulerType").data("kendoComboBox")
                schedulerType.setDataSource(getDataSourceByData(view));
                schedulerType.select(0);
                schedulerType.trigger("change");
          }
        }
      }
    });
});
