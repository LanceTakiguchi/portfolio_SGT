var config = {
      apiKey: "AIzaSyAb-frJAyvwARPS4_zov4SiSglw9qG14dc",
      authDomain: "introtest-fef98.firebaseapp.com",
      databaseURL: "https://introtest-fef98.firebaseio.com",
      storageBucket: "introtest-fef98.appspot.com",
      messagingSenderId: "272459267595"
    };
    firebase.initializeApp(config);
/**
 * AngularJS main app holding all controllers
 */
 var app = angular.module("sgt_app", ["firebase"]);
// loading for each http request
app.config(function ($httpProvider) {
})
/**
  * Service that holds all shared data between Angular controllers
  */
  app.service("shared_data", function($scope, $firebaseObject){
    var ref = firebase.database().ref();
    // var ref = firebase.database().ref().child("students");
    $scope.data = $firebaseObject(ref);
    // var syncObject = $firebaseObject(ref);
    // syncObject.$bindTo($scope, "students")

    var shared = this;
    this.all_students = [];
    //TODO: Delete this temp id creator
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
    // this.config = {
    //   apiKey: "AIzaSyAb-frJAyvwARPS4_zov4SiSglw9qG14dc",
    //   authDomain: "introtest-fef98.firebaseapp.com",
    //   databaseURL: "https://introtest-fef98.firebaseio.com",
    //   storageBucket: "introtest-fef98.appspot.com",
    //   messagingSenderId: "272459267595"
    // };
    // firebase.initializeApp(this.config);
    // this.fb_ref = firebase.database();
    // this.ref = firebase.database().ref().child("students");
    // this.sync_fb = $firebaseObject(this.ref);
    // this.sync_fb.$bindTo($scope, "students");
    // var shar = this;
    // this.fb_ref.ref("students").on("value", function(fb_data){
    //   $.apply(
    //     function(){
    //       var fb_students = fb_data.val();
    //       for(keys in fb_students) {
    //         var stu = fb_students[keys];
    //         stu.id = keys;
    //         shar.add_student(stu);
    //       }
    //       console.log(stu);
    //     }
    //     );
    // });
  })
/** controller that just calculates grade average */
app.controller("app_controller", function($log, shared_data) {
  this.grade_average = shared_data.calculate_grade_average();
  /** Grabs the service's calculated grade avereage */
  this.get_grade_average = function(){
    return shared_data.calculate_grade_average();
  }
});
/**
 * Controller for the UX inputs, clear functionality, asking server to add student, and form input validation
 */
 app.controller("form_controller", function($log, shared_data) {
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
 app.controller("table_controller", function($http, $log, shared_data){
  this.students = shared_data.return_students();
  /**
   * Deletes student from shared_data
   * @param  Object student The student that is trying to be deleted
   */
   this.invoke_delete = function(student) {
    //TODO: Delete this log
    $log.info("Delete student", student.id);
    shared_data.delete_student(student.id);
  };
});