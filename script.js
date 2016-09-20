/**
 * Define all global variables here
 */
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
        addStudent();
    });
}
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancelClicked(){
    $("#cancelButton").click(function(){
        $("#studentName").val("");
        $("#course").val("");
        $("studentGrade").val("");
    });
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
    student_array.push({student: name, course: course, grade: grade});
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
        sum += student_array[index].grade;
    }
    return sum / student_array.length;
}
/**
 * updateData - centralized function to update the average and call student list update
 */

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */

/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */


/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(function () {
    addClicked();
    cancelClicked();
});