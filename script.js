/**
 * [app description - AngularJS main app holding all controllers]
 */
 var app = angular.module("sgt_app", []);
 app.service("shared_data", function(){
    this.all_students = [];
    this.grade_average = 0;
    this.calculate_grade_average = function(){
            var sum = 0; // ** Holds the total of all the grades added together
            for(var index in this.all_students){
                sum += Number(this.all_students[index].grade);
            }
            this.grade_average = Math.round(sum / this.all_students.length);
        };
    /**
     * Adds student into the all_student's arry
     * @param Object student An Object with the student's name, course, grade, and id
     */
    this.add_student = function(student){
        this.all_students.push(student);
    };
    this.update_students = function(roster){
        this.all_students = roster;
    };
    this.return_students = function(){
        return this.all_students;
    }
    /**
     * Given an id, removes the student from the array
     * @param  Number student_id A id of who to remove
     * @return bool            returns if the student was removed or not
     */
    this.remove_student = function(student_id){
        for(student_index in this.all_students){
            if(this.all_students[student_index].id == student_id){
                this.all_students.splice(student_index, 1);
                return true;
            }
        }
        return false;
    }
 })
 app.controller("app_controller", function($log, $http, shared_data) {
   
    });
 app.controller("table_controller", function($http, $log, shared_data){
    this.get_server_data = function(){
        $log.log("Running get_server_data")
        var self_server_data = this;
        $http({
          url: "http://s-apis.learningfuze.com/sgt/get",
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          dataType: 'json',
          method: 'post',
          cache: false,
          data: $.param({api_key: "Yd2V1lB6e5"})
      })
        .then(
          function(success_response){
            shared_data.update_students(success_response.data.data); //** This is just the student array
            $log.info("Server data retrieved: ", shared_data.return_students());
        }, 
        function(fail_response){
            self_server_data.data = fail_response;
            $log.warn("table_controller this.get_server_data fail_reponse: ", fail_response);
        });
    };
    this.get_students = function(){
        this.students =  shared_data.get_students();
    }
});
 app.controller("form_controller", function($http, $log, shared_data) {
    //form_controller
    this.input_name = "";
    this.input_course = "";
    this.input_grade = "";
    this.all_students = [];
    this.send_server = function(){
        $log.log("Running send_server")
        var self_send_server = this;
        $http({
          url: "http://s-apis.learningfuze.com/sgt/create",
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          dataType: 'json',
          method: 'post',
          cache: false,
          data: $.param({api_key: "Yd2V1lB6e5",
              name: self_send_server.input_name,
              course: self_send_server.input_course,
              grade: self_send_server.input_grade})
      })
        .then(
          function(success_response){
            self_send_server.data = success_response; //** This is just the student array
            $log.info("Server data sent: ", self_send_server.data);
        }, 
        function(fail_response){
            self_send_server.data = fail_response;
            $log.warn("table_controller this.send_server fail_reponse: ", fail_response);
        });
    };
});

/****************** Non-Angular Below **********************/

/**
 * Define all global variables here
 */
/**
 * current_student_index - a global index number that tells what the index of the last student was
 * Starts at negative 1 as when a student is added, it will always increment, putting the first student as index 0
 * @type {number}
 */
//  var current_student_index = -1;
// /**
//  * student_array - global array to hold student objects
//  * @type {Array}
//  */
//  var student_array = [];
// /**
//  * inputIds - id's of the elements that are used to add students
//  * @type {string[]}
//  */
//  var inputIds = [];
// /**
//  * ajax_data - Used to hold the results from the server call
//  * @type {null} - Will be an object with and array with an object
//  */
//  var ajax_data = null;
// /**
//  * ajax_sent - Used to hold the id returned from beaming up a student
//  * @type {null}
//  */
//  var ajax_sent = null;
//  var ajax_delete = null;
// //  function sendStudentData(student){
// //     console.log("Sending student data!");
// //     $("#student_loading").addClass("loader");
// //     var ajax_return = null; // Will hold the AJAX return
// //     $.ajax({
// //         url: 'http://s-apis.learningfuze.com/sgt/create',
// //         dataType: 'json',
// //         method: 'POST',
// //         data: {
// //             api_key: "Yd2V1lB6e5",
// //             name: student.name,
// //             course: student.course,
// //             grade: student.grade
// //         },
// //         success: function(return_id){
// //             // console.log('sendStudentData Sucessful!');
// //             // console.log("Student's new ID: ", returnId);
// //             ajax_sent = return_id;
// //         },
// //         error: function(fail_report){
// //             console.log("sendStudentData AJAX error!");
// //             console.log(fail_report);
// //         }
// //     });  //end of the ajax call
// //     $("#student_loading").removeClass("loader");
// // }
// /**
//  * addClicked - Event Handler when user clicks the add button
//  */
//  function addClicked(){
//     $("#addButton").click(function(){
//         if ( parseInt( $("#studentGrade").val() ) < 0 ) {
//             alert( 'Number too low.' );
//             $("#studentGrade").val("");
//         }else if ( parseInt( $("#studentGrade").val() ) > 100 ) {
//             alert( 'Number too high.' );
//             $("#studentGrade").val("");
//         }else{
//             ajax_data == null;
//             addStudent(); // ** Add student
//             deleteClicked(); // ** Add delete functionality
//         }
//     });
// }
// /**
//  * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
//  */
//  function cancelClicked(){
//     $("#cancelButton").click(function(){
//         $("#studentName").val("");
//         $("#course").val("");
//         $("#studentGrade").val("");
//     });
// }
// /**
//  * The functionality of the "Get Server Data" button. Waits for results from the AJAX call and then adds the students to the array and table
//  */
//  function obtainServerData(){
//     Call_LearningFuze();
//     /**
//      * Used to wait for the ajax data to be saved in the global ajax_data
//      */
//      function wait(){
//         if (ajax_data == null){
//             setTimeout(wait, 10); // ** Note: I feel like a recursion genius XD
//         }else {
//             // ** The data was saved. Now use the data.
//             for (var student_index in ajax_data.data) {
//                 var name = ajax_data.data[student_index].name;
//                 var course = ajax_data.data[student_index].course;
//                 var grade = ajax_data.data[student_index].grade;
//                 var id = ajax_data.data[student_index].id;
//                 var student = {name: name, course: course, grade: grade, id:id};
//                 student_array.push(student);
//                 inputIds.push(id);
//                 current_student_index++;
//                 addStudentToDom(student);
//                 // displayAverage(); //TODO: Delete
//                 deleteClicked();
//             }
//         }
//     }
//     wait(); // ** Recursive call to check again for the ajax data.
// }
// /**
//  * deleteClicked - Event Handler when user clicks the cancel button, should remove from student array and delete the student's DOM row
//  */
//  function deleteClicked(){
//     $(".student-list .btn.btn-danger:last").click(function(){ // ** If not last, it will give every existing delete button a new click handler.
//         var delete_id = $(this).parent().parent()[0].id;
//         requestStudentDelete(delete_id);

//         function wait(){
//             if (ajax_delete == null){
//                 setTimeout(wait, 10); // ** Note: I feel like a recursion genius XD
//             }else if(ajax_delete.success === true){
//                 // ** The data was saved. Now use the data.
//                 for (var student_index in student_array){
//                     if (student_array[student_index].id == delete_id){
//                         removeStudent(student_index);
//                         break;
//                     }
//                 }
//                 for (var id_index in inputIds){
//                     if (inputIds[id_index] == delete_id){
//                         inputIds.splice(id_index, 1);
//                         break;
//                     }
//                 }
//                 $("#" + delete_id).remove(); // ** Deletes the row it's in
//             }else{
//                 console.log("We can't delete them!")
//             }
//         }
//         wait(); // ** Recursive call to check again for the ajax data.
//         ajax_delete = null;

//     });
// }
// /**
//  * Removes the student object from student_array
//  * @param {number} index The index which holds the student whose existence is no longer tolerable.
//  */
//  function removeStudent(index){
//     student_array.slice(index, 1);
// }
// /**
//  * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
//  *
//  * @return undefined
//  */
//  function addStudent(){
//     var name = $("#studentName").val();
//     var course = $("#course").val();
//     var grade = $("#studentGrade").val();
//     var student = {name: name, course: course, grade: Number(grade)};
//     sendStudentData(student); // ** Send to LearningFuze server

//     function wait(){
//         if (ajax_sent == null){
//             setTimeout(wait, 10); // ** Note: I feel like a recursion genius XD
//         }else {
//             // ** The data was saved. Now use the data.
//             student.id = ajax_sent.new_id;
//             student_array.push(student);
//             current_student_index++;
//             addStudentToDom(student);
//             //displayAverage();
//         }
//     }
//     wait(); // ** Recursive call to check again for the ajax data.
//     return undefined; // ** Why?
// }
// /**
//  * Function to display the calculated average onto the DOM
//  */
// // function displayAverage(){
// //     var average = calculateAverage(); // ** TODO: reallocate this action to another part of the code
// //     $("div div small span").html(average);
// // }
// /**
//  * clearAddStudentForm - clears out the form values based on inputIds variable
//  */

// /**
//  * calculateAverage - loop through the global student array and calculate average grade and return that value
//  * @returns {number}
//  */
// // function calculateAverage(){
// //     var sum = 0; // ** Holds the total of all the grades added together
// //     for(var index in student_array){
// //         sum += Number(student_array[index].grade);
// //     }
// //     return Math.round(sum / student_array.length);
// // }
// /**
//  * updateData - centralized function to update the average and call student list update
//  */
//  function updateData(){
//     calculateAverage();
//     updateStudentList();
// }
// /**
//  * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
//  */
//  function updateStudentList(){
//     //**TODO updateStudentList
// }
// /**
//  * addStudentToDom - take in a student object, create html elements from the values and then append the elements
//  * into the .student_list tbody
//  * @param studentObj
//  */
//  function addStudentToDom(studentObj){
//     var student_column = "<td>" + studentObj.name + "</td>";
//     var course_column = "<td>" + studentObj.course + "</td>";
//     var grade_column = "<td>" + studentObj.grade + "</td>";
//     var delete_column = "<td><button type='button' class='btn btn-danger' onclick=''>Delete</button></td>";
//     var row = $("<tr>").attr("id", studentObj.id);
//     row.append(student_column + course_column + grade_column + delete_column);
//     $(".student-list tbody").append(row);
// }
// /**
//  * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
//  */
//  function reset(){
//     student_array = [];
//     inputIds = [];
//     //TODO: reset inputs
//     //TODO: reset dom
// }
// /**
//  * Call_LearningFuze - Calls the LearningFuze server to get online table
//  * @constructor
//  */
//  function Call_LearningFuze(){ 
//     //console.log('Calling LearningFuze');
//     $("#student_loading").addClass("loader");
//     var ajax_return = null; // Will hold the AJAX return
//     $.ajax({
//         url: 'http://s-apis.learningfuze.com/sgt/get',
//         dataType: 'json',
//         method: 'post',
//         cache: false,
//         data: {api_key: "Yd2V1lB6e5"},
//         success: function(response){
//             // console.log('Data retrieval successfully');
//             ajax_data = response;
//             $("#student_loading").removeClass("loader");
//         },
//         error: function(response){
//             console.log('ajax error!')
//             $("#student_loading").removeClass("loader");
//         }
//     });  //end of the ajax call
//     //$("#student_input").removeClass(".loader");
// }
// function sendStudentData(student){
//     console.log("Sending student data!");
//     $("#student_loading").addClass("loader");
//     var ajax_return = null; // Will hold the AJAX return
//     $.ajax({
//         url: 'http://s-apis.learningfuze.com/sgt/create',
//         dataType: 'json',
//         method: 'POST',
//         data: {
//             api_key: "Yd2V1lB6e5",
//             name: student.name,
//             course: student.course,
//             grade: student.grade
//         },
//         success: function(return_id){
//             // console.log('sendStudentData Sucessful!');
//             // console.log("Student's new ID: ", returnId);
//             ajax_sent = return_id;
//         },
//         error: function(fail_report){
//             console.log("sendStudentData AJAX error!");
//             console.log(fail_report);
//         }
//     });  //end of the ajax call
//     $("#student_loading").removeClass("loader");
// }
// function requestStudentDelete(student_id){
//     console.log("Sending student data!");
//     $("#student_loading").addClass("loader");
//     var ajax_return = null; // Will hold the AJAX return
//     $.ajax({
//         url: 'http://s-apis.learningfuze.com/sgt/delete',
//         dataType: 'json',
//         method: 'POST',
//         data: {
//             api_key: "Yd2V1lB6e5",
//             student_id: student_id
//         },
//         success: function(result){
//             // console.log('requestionStudentData Sucessful!');
//             ajax_delete = result;
//         },
//         error: function(result){
//             console.log("requestStudentData AJAX error!");
//             console.log(result);
//         }
//     });  //end of the ajax call
//     $("#student_loading").removeClass("loader");
// }
// /**
//  * OnlyNumberGrades - Limits the grade input to just numbers and action keys
//  * @constructor
//  */
//  function OnlyNumberGrades(){
//     $("#studentGrade").keydown(function (e) {
//         // Allow: backspace, delete, tab, escape, and enter
//         if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
//             // Allow: Ctrl+A
//             (e.keyCode == 65 && e.ctrlKey === true) ||
//             // Allow: Ctrl+C
//             (e.keyCode == 67 && e.ctrlKey === true) ||
//             // Allow: Ctrl+X
//             (e.keyCode == 88 && e.ctrlKey === true) ||
//             // Allow: home, end, left, right
//             (e.keyCode >= 35 && e.keyCode <= 39)) {
//             // let it happen, don't do anything
//         return;
//     }
//         // Ensure that it is a number and stop the keypress
//         if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
//             e.preventDefault();
//         }
//     });
// }
// /**
//  * Listen for the document to load and reset the data to the initial state
//  */
//  $(document).ready(function () {
//     //addClicked();
//     //cancelClicked();
//     ////obtainServerData();
//     //OnlyNumberGrades();
// });