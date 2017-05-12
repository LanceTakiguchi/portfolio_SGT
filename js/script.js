/**
 * AngularJS main app holding all controllers
 */
 var app = angular.module("sgt_app", ["firebase"]);
 var fb = firebase.database().ref('students');
 var fb_perm = firebase.database().ref('Permanent');
 var test;
// loading for each http request
app.config(function ($httpProvider) {
})
/**
  * Service that holds all shared data between Angular controllers
  */
  app.service("shared_data", ["$firebaseObject",
   function($firebaseObject){
    var shared = this;
    this.all_students = [];
    this.id_count = -1;
    this.id_counter = function() {
      this.id_count++;
      return this.id_count;
    };
    this.grade_average = 0;
    this.last_time = 0;
    /**
     * [get_time gets the timestamp on FB & runs time_to_reset]
     */
     this.get_time = function(){
      fb_perm.on('value', function(snapshot) {
        var timestamp;
        timestamp = snapshot.val().Timestamp;
        shared.last_time = timestamp
        shared.time_to_reset(timestamp);
      });
    }
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
   * [time_to_reset Checks to see if the student list is older than 20 mins]
   * @return {[bool]} [is it time to reset the student list & timestamp, if so run reset, else false]
   */
   this.time_to_reset = function(last_time){
    var elasped = Date.now() - last_time;
    // If it is more than 20 mins, return false
    if(elasped/60000 > 20){
      this.reset_time();
      this.reset_fb_students();
    }
    return false;
  }
  /**
   * [reset_time Resets the FB timestamp to this moment]
   */
   this.reset_time = function(){
    fb_perm.update({
      Timestamp: Date.now()
    });
  }
  /**
   * [reset_fb_students Resets the FB students]
   */
   this.reset_fb_students = function(){
    var fb_perm_students = fb_perm.child('students');
    fb_perm_students.on('value', function(snapshot) {
      var students = snapshot.val();
      firebase.database().ref().update({
        students
      });
    });
  }
    /**
     * Adds student into the all_student's array
     * @param Object student An Object with the student's name, course, grade, and id
     */
     this.add_student = function(student){
      fb.push().set({
        name: student.name,
        course: student.course,
        grade: student.grade
      });
      this.reset_time();
    };
    /**
     * [return_student Tells if it was able to find a student based on ID]
     * @param  {[int]} id [a potential student's id]
     * @return {[String or bool]}    [name of student or false]
     */
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
      this.all_students = this.fb_ref();
      return this.all_students;
    };
    /**
     * [fb_ref Grabs the list of students from FB]
     * @return {[Array]} [list of student objects]
     */
     this.fb_ref = function() {
      // Check if it is time to reset FB student list
      var obj = new $firebaseObject(fb); 
      var all = [];
      fb.on('value', function(snapshot) {
        var length = all.length;
        snapshot.forEach(function(student){
          var kid = student.val();
          kid.id = student.key; 
          all.push(kid); // Add new updated elements
        });
        all.splice(0, length); // Remove old elements from array
      });
      this.students = all;
      return this.students;
    }
  }]);
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
 app.controller("form_controller", ["$scope", "shared_data",
  function($scope, shared_data){
    $scope.check = function() {
      var x = $scope.fc.input_grade;
      if(typeof x === "undefined"){
        $scope.addStudentForm.grade.$setPristine();
      }
      else if(x < 0 || x > 100){
        $scope.addStudentForm.grade.$setValidity("inRange", false);
      }
      else {
        $scope.addStudentForm.grade.$setValidity("inRange", true);
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
}
]);
 /**
 * Controller for the displaying students on DOM
 */
 app.controller("table_controller", ["$scope", "shared_data", 
  function($scope, shared_data){
    this.students = shared_data.return_students();
    shared_data.get_time();
  /**
   * Deletes student from shared_data
   * @param  Object student The student that is trying to be deleted
   */
   this.invoke_delete = function(student) {
    fb.child(student.id).remove();
    shared_data.reset_time();
  };
  this.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };
}
]);