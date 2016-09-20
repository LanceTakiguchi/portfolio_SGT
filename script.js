/**
 * Define all global variables here
 */
/**
 * current_student_index - a global index number that tells what the index of the last student was
 * Starts at negative 1 as when a student is added, it will always increment, putting the first student as index 0
 * @type {number}
 */
var current_student_index = -1;
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var student_array = [];
/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */
var inputIds = [];
/**
 * addClicked - Event Handler when user clicks the add button
 */
function addClicked(){
    $("#addButton").click(function(){
        addStudent(); // ** Add student
        deleteClicked(); // ** Add delete functionality
    });
}
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancelClicked(){
    $("#cancelButton").click(function(){
        $("#studentName").val("");
        $("#course").val("");
        $("#studentGrade").val("");
    });
}
/**
 * deleteClicked - Event Handler when user clicks the cancel button, should remove from student array and delete the student's DOM row
 */
function deleteClicked(){
    $(".student-list .btn.btn-danger").click(function(){
        $(this).parent().parent().remove(); // ** Deletes the row it's in
        removeStudent();
    });
}
function removeStudent(){
    console.log("Remove the student!")
}
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent(){
    var name = $("#studentName").val();
    var course = $("#course").val();
    var grade = $("#studentGrade").val();
    var student = {student: name, course: course, grade: grade};
    student_array.push(student);
    current_student_index++;

    var average = calculateAverage(); // ** TODO: reallocate this action to another part of the code
    $("div div small span").html(average);
    addStudentToDom(student);
    return undefined; //** QUESTION: ??? Why?
}
/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage(){
    var sum = 0; // ** Holds the total of all the grades added together
    for(var index in student_array){
        sum += Number(student_array[index].grade);
    }
    return Math.round(sum / student_array.length);
}
/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData(){
    calculateAverage();
    updateStudentList();
}
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList(){
    //**TODO updateStudentList
}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom(studentObj){
    // var content = "<table>";
    // content += "<tr><td>" + studentObj.student + "</td></tr>";
    // // for(var i = 0; i < student_array.length; i++){
    // //     content += "<tr><td>" + student_array[i].student +  i + "</td></tr>";
    // // }
    // content += "</table>";
    //
    // $('.student_list tbody').append(content);

    //TODO: Make this display on the DOM
    var student_column = "<td>" + studentObj.student + "</td>";
    var course_column = "<td>" + studentObj.course + "</td>";
    var grade_column = "<td>" + studentObj.grade + "</td>";
    var delete_column = "<td><button type='button' class='btn btn-danger' onclick=''>Delete</button></td>";
    var row = "<tr>" + student_column + course_column + grade_column + delete_column + "</tr>";
    $(".student-list tbody").append(row);
}
/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset(){
    student_array = [];
    inputIds = [];
    //TODO: reset inputs
    //TODO: reset dom
}
/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(function () {
    addClicked();
    cancelClicked();
});