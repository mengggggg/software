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

	document.getElementById("Return").href = encodeURI("MainPageEmp.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);

	var MyUrl = 'http://192.168.43.215:8080/employeeAttendance/executiveadmin/querypersonworkinfo';
	getMyWorkInfo();


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
						showData(data);
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

	function showData(data) {
		var str = "";
		var num = 1;
		dateArray = new Array();
		yearArray = new Array().fill(0);
		monthArray = new Array().fill(0);

		console.log(data.workinfo);
		for (var i = 0; i < data.date.length; i++, num++) {
			dateArray[i] =  data.date[i];
			str = "<tr><td>" + num + "</td><td>" + data.date[i] + "</td><td>" + data.workTime[i] + "</td><td>" + data.offTime[i]+ "</td></tr>";
			$(".workinfo").append(str);
		}
		
		getyearandmonth();
	}
	
	function getyearandmonth() {
		for (var i = 0; i < dateArray.length; i++) {
			var temp1 = dateArray[i].split('-')[0];
			var temp2 = dateArray[i].split('-')[1];
			temp1 = parseInt(temp1);
			temp2 = parseInt(temp2);
			yearArray[temp1] = 1;
			monthArray[temp2] = 1;
		}
	}
})


function selectbyyearandmonth() {
	year = $("#month option:selected"); 
	year = year.text()
	year = parseInt(year);
	month = $("#month option:selected"); 
	month = month.text()
	month = parseInt(month);
	if(yearArray[year] != 1) alert("无当前年份的记录");
	else {
		if(monthArray[month] != 1) alert("无当前月份的记录");
		else select();
	}
}

function select() {
	var userInfo = {};
		userInfo.personId = idnecessary;
		userInfo.year = year;
		userInfo.month = month;
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
					showData(data);
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
