/**
 * AngularJS main app holding all controllers
 */
var app = angular.module("sgt_app", []);
// loading for each http request
app.config(function ($httpProvider) {
})
/**
  * Service that holds all shared data between Angular controllers
  */
  app.service("shared_data", function(){
    var shared = this;
    // TODO: Change this.all_students into an empty array
    this.all_students = [{course: "Math", grade: 84, id: 101, name: "Lance Takiguchi"}, {course: "Woodcutting", grade: 52, id: 2, name: "Mark Johnson"}, {course: "Painting 101", grade: 73, id: 3, name: "Sally Cane"}, {course: "Using the Force", grade: 89, id: 4, name: "Luke Skywalker"}, {course: "Web Development", grade: 96, id: 5, name: "Lance T"}, {course: "Writing 39B", grade: 78, id: 6, name: "Nick Dean"}, {course: "SSBM", grade: 98, id: 7, name: "Armada"}, {course: "Math 2B", grade: 91, id: 8, name: "Kate Wilson"}];
    this.id_count = -1;
    this.id_counter = function() {
      this.id_count++;
      return this.id_count;
    };
    this.grade_average = 0;
  /**
   * Takes the grades from all the students and returns the average
   * @return String || Number Returns an empty string if there is no array to average, else it returns a Number average
   */
   this.calculate_grade_average = function(){
    if(this.all_students.length === 0){
      this.grade_average = "N/A";
      return this.grade_average; //** Display nothing, as there is no average
    }
    var sum = 0; // ** Holds the total of all the grades added together
    //** Get the sum of all the grades
    for(var index in this.all_students){
      sum += Number(this.all_students[index].grade);
    }
    //** Divide the sum by the number of students
    this.grade_average = Math.round(sum / this.all_students.length);
    return this.grade_average;
  };
    /**
     * Adds student into the all_student's array
     * @param Object student An Object with the student's name, course, grade, and id
     */
     this.add_student = function(student){
      this.all_students.push(student);
    };
    this.return_student = function(id){
      for(student_index in this.all_students){
        if(this.all_students[student_index].id === id){
          return this.all_students[student_index].name;
        }
      }
      return false; //Student at id was not found
    }
    /**
     * Takes an array to save as the array holding all the students
     * @param  Array roster An array holding all the students
     */
     this.update_students = function(roster){
      this.all_students = roster;
    };
    /**
     * Returns the whole array of students
     * @return Array An array containing all the students
     */
     this.return_students = function(){
      return this.all_students;
    };
    /**
     * Delete's student from array based on a param id
     * @param  Number id The id of the student to be deleted from this.all_students
     * @return bool    Bool to tell if the operation successfully deleted the student or not
     */
     this.delete_student = function(id){
      for(student_index in this.all_students){
        if(this.all_students[student_index].id === id){
          this.all_students.splice(student_index, 1);
          return true;
        }
      }
      return false; //Student at id was not found
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
    };
})
/** controller that just calculates grade average */
app.controller("app_controller", function(shared_data) {
  this.grade_average = shared_data.calculate_grade_average();
  /** Grabs the service's calculated grade avereage */
  this.get_grade_average = function(){
    return shared_data.calculate_grade_average();
  }
});
/**
 * Controller for the UX inputs, clear functionality, asking server to add student, and form input validation
 */
 app.controller("form_controller", function(shared_data, $scope) {
  $scope.check = function() {
    var x = $scope.fc.input_grade;
    if(typeof x === "undefined"){
      $scope.addStudentForm.grade.$setPristine();
    }
    else if(x < 0 || x > 100){
      $scope.addStudentForm.grade.$setValidity("inRange", false);
    }
    else {
      $scope.addStudentForm.grade.$setValidity("inRange", true); //TODO
    }
  }
  this.input_name = "";
  this.input_course = "";
  this.input_grade = "";
  this.all_students = [];
  /**
   * Clear DOM inputs
   */
   this.clear_inputs = function(){
    this.input_name = "";
    this.input_course = "";
    this.input_grade = "";
  }
  /**
   * Take inputed student and add it into the shared_data
   */
   this.new_student = function() {
    var new_student = {};
    new_student.name = this.input_name;
    new_student.course = this.input_course;
    new_student.grade = this.input_grade;
    new_student.id = shared_data.id_counter();
    shared_data.add_student(new_student);
    this.clear_inputs();
  }
});
 /**
 * Controller for the displaying students on DOM
 */
 app.controller("table_controller", function($http, shared_data){
  this.students = shared_data.return_students();
  /**
   * Deletes student from shared_data
   * @param  Object student The student that is trying to be deleted
   */
   this.invoke_delete = function(student) {
    shared_data.delete_student(student.id);
  };
});