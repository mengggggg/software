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

	document.getElementById("FillOutForm").href = encodeURI("FillOutForm.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);
	document.getElementById("Return").href = encodeURI("MainPageEmp.html?" + "name=" + name + "?position=" + position + "?department=" + department + "?id=" + idnecessary);


	document.getElementById("identity").innerHTML = name + "!";
	document.getElementById("position").innerHTML = position;
	document.getElementById("department").innerHTML = department;
})