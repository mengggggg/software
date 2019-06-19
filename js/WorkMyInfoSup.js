$(function(){
	var thisURL = document.URL;
	console.log(thisURL);
	var getnameval = thisURL.split('?')[1];
	var getpostval = thisURL.split('?')[2];
	var getdepval = thisURL.split('?')[3];
	var getidval = thisURL.split('?')[4];
	

	var name = getnameval.split('=')[1];
	var position = decodeURI(getpostval.split('=')[1]);//解决url中传递中文参数乱码问题
	var department = decodeURI(getdepval.split('=')[1]);
	var idnecessary = getidval.split('=')[1];
	

	document.getElementById("identity").innerHTML = name + "!";
	document.getElementById("position").innerHTML = position;
	document.getElementById("department").innerHTML = department;

	document.getElementById("Return").href = encodeURI("MainPageSup.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
	document.getElementById("dept").href = encodeURI("WorkMyDeptInfoSup.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);

	var MyUrl = 'http://192.168.43.215:8080/employeeAttendance/executiveadmin/querypersonworkinfo';

	getMyWorkInfo();//页面初始化时执行

	function getMyWorkInfo() {
		var userInfo = {};
			userInfo.personId = idnecessary;
			$.ajax({
				url:MyUrl,
				type:"GET",
				data:userInfo ,
				dataType:"jsonp",
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				success:function(data) {
					if(data.success) {
						alert('提交成功！');
						console.log(data);
						showMyWorkInfo(data);
						}
					else {
						console.log(data);
						alert('提交失败！' + data.errMsg);
					}
				},
				error:function() {
					alert('异常！')
				}
			})

	}

	function showMyWorkInfo(data) {
		var str = "";
		var num = 1;
		console.log(data.workinfo);
		for (var i = 0; i < data.workinfo.length; i++, num++) {
			str = "<tr><td>" + num + "</td><td>" + data.workinfo[i].date + "</td><td>" + data.workinfo[i].workTime + "</td><td>" + data.workinfo[i].offTime + "</td></tr>";
			$(".workinfo").append(str);
		}
		
	}
})


