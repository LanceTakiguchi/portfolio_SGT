/*
Plunker: https://plnkr.co/edit/XYyzXiNbcxOR3JRQBwYL?p=preview
*/
// There is no need to create any extra functions or add anything to the DOM
// Just directly call each method with hard coded data

// 3. Add your config data here

// Adds an object of students to the DOM
// Each student must contain the correct keys as outlined in the first challenge
// function updateDom(d){
// 	var table = $('.sgt tbody');
// 	table.html('');
// 	for(var key in d){
// 		if(d.hasOwnProperty(key)){
// 			var row = $('<tr id="' + key + '">');
// 			var id = $('<td>' + d[key].id + '</td>');
// 			var name = $('<td>' + d[key].name + '</td>');
// 			var course = $('<td>' + d[key].course + '</td>');
// 			var grade = $('<td>' + d[key].grade + '</td>');

// 			table.append(row.append(id, name, course, grade));
// 		}
// 	}
// }

// app.controller("fb_controller", function($log, shared_data) {

// });
// 4. Initialize firebase

// 5. Create a reference to your firebase database

// var fb_ref = firebase.database().ref("students");
// 6. Push a new student to your database, just use a hardcoded object
// fb_ref.ref("students").push(send_fb_student); //TODO
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