/*
Project Name: Firebase SGT Prototype
File Name: script.js
Author: Lance Takiguchi
Date: 10/18/2016 Time: 16:13 
Objective: Try doing the backend for SGT using Firebase	
Prompt: https://docs.google.com/presentation/d/1BchTvPKiJpol8ooIBGCwIaKKJdlVOfxTw-L5kTZ4uO0/pub?start=false&loop=false&delayms=3000&slide=id.g165ee7341a_0_208
Plunker: https://plnkr.co/edit/XYyzXiNbcxOR3JRQBwYL?p=preview
*/

// There is no need to create any extra functions or add anything to the DOM
// Just directly call each method with hard coded data

// 3. Add your config data here
var config = {
	apiKey: "AIzaSyAb-frJAyvwARPS4_zov4SiSglw9qG14dc",
	authDomain: "introtest-fef98.firebaseapp.com",
	databaseURL: "https://introtest-fef98.firebaseio.com",
	storageBucket: "introtest-fef98.appspot.com",
	messagingSenderId: "272459267595"
};
// 4. Initialize firebase
firebase.initializeApp(config);
// 5. Create a reference to your firebase database
var fb_ref = firebase.database()
// var fb_ref = firebase.database().ref("students");
// 6. Push a new student to your database, just use a hardcoded object
var send_fb_student = {
	id: 0003,
	name: "Dan",
	course: "Firebase 101",
	grade: 96	
}
fb_ref.ref("students").push(send_fb_student);
// 7. Update a value in an existing student
/*var updates = {};*/
/*updates["111/course"] = "Firebase 105";
fb_ref.update(updates);*/
// 8a. Remove a student using .remove()
// fb_ref.ref("students/-KUPCDXmVZdxGHfObaJ9").remove();
// fb_ref.ref("/-KUPBxliW7gvIe-LDZ2W").remove();
// 8b. Remove a student using null
// fb_ref.ref("students/-KUPBxliW7gvIe-LDZ2W").set(null);
/*fb_ref.ref().update({"students/-KUPBLcSYvVhXWu_hzMh": null});*/
// 9 Create an event listener using .on() with the 'value' event listener to retrieve your data 
/*fb_ref.ref("students").on("value", function(fb_data){
	console.log("snapshot: ", fb_data.val());
	updateDom(fb_data.val());
});*/
// Adds an object of students to the DOM
// Each student must contain the correct keys as outlined in the first challenge
function updateDom(d){
	var table = $('.sgt tbody');
	table.html('');
	for(var key in d){
		if(d.hasOwnProperty(key)){
			var row = $('<tr id="' + key + '">');
			var id = $('<td>' + d[key].id + '</td>');
			var name = $('<td>' + d[key].name + '</td>');
			var course = $('<td>' + d[key].course + '</td>');
			var grade = $('<td>' + d[key].grade + '</td>');

			table.append(row.append(id, name, course, grade));
		}
	}
}