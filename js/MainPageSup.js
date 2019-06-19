$(function(){
	var thisURL = document.URL;
	console.log(thisURL);
	var getnameval = thisURL.split('?')[1];
	var getpostval = thisURL.split('?')[2];
	var getdepval = thisURL.split('?')[3];
	var getidval = thisURL.split('?')[4];

	var name = getnameval.split('=')[1];
	var position = decodeURI(getpostval.split('=')[1]);
	var idnecessary = getidval.split('=')[1];
	var department = decodeURI(getdepval.split('=')[1]);

	if(position == 0) position = "员工";
	if(position == 1) position = "主管";
	if(position == 2) position = "经理";

	document.getElementById("identity").innerHTML = name + "!";
	document.getElementById("position").innerHTML = position;
	document.getElementById("department").innerHTML = department;

	document.getElementById("WorkInfoSup").href = encodeURI("WorkMyInfoSup.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
	document.getElementById("ViewLeave").href = encodeURI("ViewLeave.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
	document.getElementById("MyMan").href = encodeURI("MyMan.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
	document.getElementById("MyPunch").href = encodeURI("MyPunch.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
	document.getElementById("Login").href = "Login.html";
})

