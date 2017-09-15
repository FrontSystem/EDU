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
