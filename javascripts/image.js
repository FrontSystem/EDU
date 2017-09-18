/**
 * 图片上传本地预览
 * @author  LiuDongMing
 * @area   图像采集、异常报备页面的图片上传预览功能
 * @param   配合kendoUpload一同使用
 * @param  兼容IE9+、Chrome、FireFox
 * @time  2017-08-03
 */
jQuery.fn.extend({
    uploadPreview: function(opts) {
        var _self = this,
            _this = $(this);
        
        opts = jQuery.extend({
            ImgType: ["jpeg", "jpg","png"],
            multiple: false //是否允许一次性选择多个图片，默认一次选择一个，上传一个
        }, opts || {});
        
       _self.getObjectURL = function(file) {
            var url = null;
            if (window.createObjectURL != undefined) {
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) {
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) {
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        };
        _this.change(function() {
            if (this.value) {
                if (!RegExp("\.(" + opts.ImgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                    alert("选择文件错误,图片类型必须是" + opts.ImgType.join("，") + "中的一种");
                    this.value = "";
                    return false;
                }
                var $li=$("#photo").closest(".k-upload.k-header").find("ul.k-upload-files li.k-file");
                var $img;
                //console.log("mode", opts.multiple);
                if(opts.multiple==false){
                  $img = $li.eq( $li.length-1 ).find(".uploadPreview");
                  getImagesUrl(this.files[0], $img);
                }else if(opts.multiple==true && this.files.length==1){
                  $img = $li.eq( $li.length-1 ).find(".uploadPreview");
                  getImagesUrl(this.files[0], $img);
                }else if(opts.multiple==true && this.files.length>1){//一次性选择多个图片
                  for(var i=0, len=this.files.length;i<len;i++){
                    //console.log("NO.", $li.length-len+i)
                    $img = $li.eq( $li.length-len+i ).find(".uploadPreview"); 
                    getImagesUrl(this.files[i], $img);
                  }//
                }//if-else
            }//if
        });
        function getImagesUrl(file,img){
          //高版本Jquey使用  if ($.support.leadingWhitespace)
            if ($.support.leadingWhitespace) { //低版本jquery中使用$.browser.msie
                try {
                    img.attr('src', _self.getObjectURL( file ));
                } catch (e) {
                    var src = "";
                    _self.select();
                    _self.focus();
                    //document.body.blur();
                    $("#photo,.k-upload-button").blur();
                    /*if (top != self) {
                        window.parent.document.body.focus()
                    } else {
                        _self.blur();
                    }*/
                    src = document.selection.createRange().text;
                    //src=_self.val();
                    //alert(src);
                    document.selection.empty();
                    if(src==""){
                      src="${ctx}/images/webfed/upload.jpg";
                    }
                    img.css({
                        "filter": 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale, src='+src+')'
                    });
                }
            } else {
                img.attr('src', _self.getObjectURL( file ))
            }
        }//getImagesUrl
    }//uploadPreview
});

$(function(){
   $("#imageType").kendoComboBox({
      placeholder: "请选择图片类型...",
      dataTextField: "text",
      dataValueField: "value",
      filter: "contains",
      autoClose: false,
      dataSource:{
        data: [
          {text:"班级",value:"className"},
          {text:"教师",value:"teacher"},
          {text:"学生",value:"student"}
        ]
      },
      change:function(e){
        var value=this.value();
        console.log("value", value);
        $(".filterBox .imageMutex").hide();
        $(".filterBox .placeholder").hide();
        $(".filterBox #"+value).closest(".imageMutex").show();
      }
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
      }
   });

   $("#photoSave").click(function(){
     var imageType=$("#imageType").data("kendoComboBox").value();
     if(imageType==""||imageType==undefined){
         customKendoConfirm({
            text: "图片类型不能为空",
            autoClose: true,
            okVal: "",
            cancelVal: ""
          });
         return;
     }
     var sub=$("#"+imageType).data("kendoComboBox").value();
     var str="";
     if(sub==""){
        switch(imageType){
         case "className":
            str="班级名";
         break;
         case "teacher":
            str="教师名";
         break;
         case "student":
            str="学生姓名";
         break;
       }
       customKendoConfirm({
            text: str+"不能为空",
            autoClose: true,
            okVal: "",
            cancelVal: ""
          });
         return;
     }//if
     var $ul=$("#photoForm .k-widget.k-upload.k-header ul.k-upload-files");
     if($ul.length==0){
        customKendoConfirm({
            text: "没有选择图片",
            autoClose: true,
            okVal: "",
            cancelVal: ""
          });
         return;
     }else{
         $("#photoForm input[name=imageType]").val(imageType);
         $("#photoForm input[name=subType]").val(sub);
         $("#photoForm").submit();
     }
   });
});

$(function(){
  $("#photo").kendoUpload({
     // multiple: false,
      // async: {
      //     saveUrl:"${ctx}/record/image/uploadImages?time="+new Date().getTime(),                          
      //     removeUrl: "remove",
      //     batch: false,
      //     autoUpload: false
      // },
      showFileList: true,
      upload: function (e) {
          // e.data = getUploadParameters(); 
      },
       select: function (e) {
          // e.data = getUploadParameters();                                                      
      },                          
      localization: {
          remove: "移除",
          retry: "重试",
          select: '<span class="k-font-icon k-i-insert-file" style="vertical-align:text-bottom;">选择图像</span>',
          statusFailed: "失败",
          statusUploaded: "已上传",
          statusUploading: "上传中",
          uploadSelectedFiles: "上传",
          clearSelectedFiles: "清除",
          dropFilesHere: "可以将文件拖拽到这里！"                                
      }, 
      // success:onSuccess,
      template: kendo.template($('#fileTemplate').html()),
      complete:showImage
  });
      
    function showImage(e) {  // 显示目标的相关图像
        var files = e.files;
        console.log("files", files);

        isOk = false;
        $.post("${ctx}/record/anomaly/showImage?anomalyId=" + "${anomaly.id}" + "&r=" + Math.random(), function(obj) {
          if ("" == obj) {
            $(".wait_photo ul").empty();
            customKendoConfirm({
              text: "没有查询到图片！",
              title: "提示",
              cancelVal: ""
            });
          } else {
            $(".wait_photo ul").empty();
            obj = eval("(" + obj + ")");
            numberOfImages = obj.count;
            if (0 < numberOfImages) {
              currentImageIndex = 0;
              imageData = obj.imageData;
              Zoomify.DEFAULTS = {
                scale:0.8 //放大后的图片占据的屏幕宽度
              };
              getPhotoIndex();
              imgHover();
              var li = $(".wait_photo").find('li');
              li.slideToggle(1200);
              loadimg();  //页面加载完毕之后，加载页面
            } else {
              $(".wait_photo ul").empty();
              customKendoConfirm({
                text: "没有查询到图片！",
                title: "提示",
                cancelVal: ""
              });
            }
          }
        });
      }

});

$(function() {
    var products=[{
          ProductID : 1,
          ProductName : "Chai",
          SupplierID : 1,
          CategoryID : 1,
          QuantityPerUnit : "10 boxes x 20 bags",
          UnitPrice : 18.0000,
          UnitsInStock : 39,
          UnitsOnOrder : 0,
          ReorderLevel : 10,
          Discontinued : false,
          Category : {
              CategoryID : 1,
              CategoryName : "Beverages",
              Description : "Soft drinks, coffees, teas, beers, and ales"
          }
      }, {
          ProductID : 2,
          ProductName : "Chang",
          SupplierID : 1,
          CategoryID : 1,
          QuantityPerUnit : "24 - 12 oz bottles",
          UnitPrice : 19.0000,
          UnitsInStock : 17,
          UnitsOnOrder : 40,
          ReorderLevel : 25,
          Discontinued : false,
          Category : {
              CategoryID : 1,
              CategoryName : "Beverages",
              Description : "Soft drinks, coffees, teas, beers, and ales"
          }
      }, {
          ProductID : 3,
          ProductName : "Aniseed Syrup",
          SupplierID : 1,
          CategoryID : 2,
          QuantityPerUnit : "12 - 550 ml bottles",
          UnitPrice : 10.0000,
          UnitsInStock : 13,
          UnitsOnOrder : 70,
          ReorderLevel : 25,
          Discontinued : false,
          Category : {
              CategoryID : 2,
              CategoryName : "Condiments",
              Description : "Sweet and savory sauces, relishes, spreads, and seasonings"
          }
      }
];
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "http://demos.telerik.com/kendo-ui/service/Products",
                dataType: "jsonp"
            }
        },
        pageSize: 21
    });

    $("#pager").kendoPager({
        dataSource: dataSource
    });

    $("#listView").kendoListView({
        dataSource: dataSource,
        template: kendo.template($("#template").html())
    });
});