/*
Project Name: SGT v3.1
File Name: script.js
Author: Lance Takiguchi
Date: 10/10/16 Time:  15:53
Objective: Handle server errors
Prompt: 
*/
/**
 * AngularJS main app holding all controllers
 */
 var app = angular.module("sgt_app", []);
 // loading for each http request
 app.config(function ($httpProvider) {
  $httpProvider.interceptors.push(function ($rootScope, $q) {
    return {
      request: function (config) {
        config.timeout = 3000;
        return config;
      },
      responseError: function (rejection) {
        switch (rejection.status){
          case 408 :
          console.log('connection timed out');
          break;
        }
        return $q.reject(rejection);
      }
    }
  })
})
 /**
  * Service that holds all shared data between Angular controllers
  */
  app.service("shared_data", function(){
    this.message = function(message, id){
      switch(message){
        case "server data retrieved":
        this.display = "Welcome";
        this.display_details = "Student Grade Table";
        this.blue();
        break;
        case "server data retrieve fail":
        this.display = "Table Load Error";
        this.display_details = "Could not retrieve server student data. Sorry for the inconvience.";
        this.red();
        break;
        case "delete sucessful":
        this.display = "Student " + this.return_student(id) + " deleted.";
        this.display_details = "";
        this.green();
        break;
        case "delete failed":
        this.display = "Error: Student " + this.return_student(id) + " could not be deleted."
        this.display_details = "Cannot delete a student inputted by another account."
        this.red();
        break;
        case "delete server fail":
        this.display = "Error: Student " + this.return_student(id) + " could not be deleted."
        this.display_details = "Server error."
        this.red();
        break;
        case "add sucessful":
        this.display = "Student " + this.return_student(id) + " added";
        this.display_details = "";
        this.green();
        break;
        case "add failed":
        this.display = "Error: Student " + this.return_student(id) + " could not be added.";
        this.display_details = "Server error.";
        this.red();
        breal;
      }
    }
    this.display = "Welcome";
    this.display_details = "";
    this.current_display = function(){
      var display = this.display;
      var display_details = this.display_details;
      return {display, display_details};
    }
    this.green = function(){
      $("#ux_display").removeClass();
      $("#ux_display").addClass("alert alert-success");
    }
    this.blue = function(){
      $("#ux_display").removeClass();
      $("#ux_display").addClass("alert alert-info");
    }
    this.red = function(){
      $("#ux_display").removeClass();
      $("#ux_display").addClass("alert alert-danger");
    }
  /**
   * Holds the local array of all students
   * @type Array An array holding student objects that hold student's info
   */
   this.all_students = [];
  /**
   * Variable holding the grade average
   * @type Number Represents the grade average
   */
   this.grade_average = 0;
  /**
   * Takes the grades from all the students and returns the average
   * @return String || Number Returns an empty string if there is no array to average, else it returns a Number average
   */
   this.calculate_grade_average = function(){
    if(this.all_students.length === 0){
      return ""; //** Display nothing, as there is no average
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
          this.all_students.splice(student_index, 0);
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
    this.delete_result = null;
    this.check_delete_result = function(){
      return this.delete_result;
    }
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
 * Controller for the intial student data grab from the server and deleting students
 */
 app.controller("table_controller", function($http, $log, shared_data){
  var self_table_controller = this;
  /**
   * Main invoke_delete that asks the server to delete a student as well as the local array of students
   * @param  Object student Object that holds a student's info. student.id is of particular interest
   */
   this.invoke_delete = function(student){
    //$log.log("table_controller invoke_delete init");
    //$log.log(this.request_server_delete(student.id));
    this.request_server_delete(student.id);
  };
  this.handle_server_delete_response = function(status, response, delete_id){
    //$log.log(response.data.success);
    if(status){
      if(response.data.success){
        shared_data.message("delete sucessful", delete_id);
        shared_data.remove_student(delete_id);
      }else{
        shared_data.message("delete failed", delete_id);
      }  
    }else{
      shared_data.message("delete server fail", delete_id);
    }
    
  };
  /**
   * Grabs all the students on the server for inital page load
   */
   this.get_server_data = function(){
   // $log.log("Running get_server_data")
   var self_server_data = this;
   $http({
    url: "http://s-apis.learningfuze.com/sgt/get",
      headers: {"Content-Type": "application/x-www-form-urlencoded"}, //** Needs to be urlencoded
      dataType: 'JSON',
      method: 'post',
      cache: false,
      data: $.param({api_key: "Yd2V1lB6e5"}) //** Creates the string of the key and attr
    })
   .then(
    function(success_response){
            shared_data.update_students(success_response.data.data); //** This is just the student array
            //$log.info("Server data retrieved: ", shared_data.return_students());
            self_table_controller.students =  shared_data.return_students();
            shared_data.calculate_grade_average(); //** Start calculating grade average
            shared_data.message("server data retrieved", 1);
          }, 
          function(fail_response){
            self_server_data.data = fail_response;
            shared_data.message("server data retrieve fail", 0);
            //$log.warn("table_controller this.get_server_data fail_reponse: ", fail_response);
          });
 };
  /**
   * Ask the server to delete a student with a particular ID
   * @param  Number delete_id An id number that indicates which student to remove
   */
   this.request_server_delete = function(delete_id){
    //$log.log("Running request_server_delete");
    $http({
      url: 'http://s-apis.learningfuze.com/sgt/delete',
      headers: {"Content-Type": "application/x-www-form-urlencoded"}, //** Needs to be urlencoded
      dataType: 'json',
      method: 'POST',
      data: $.param({
        api_key: "Yd2V1lB6e5", //** Creates the string of the key and attr
        student_id: delete_id
      }),
    })
    .then(
      function(success_delete){
        self_table_controller.handle_server_delete_response(true, success_delete, delete_id);
        //$log.info("request_server_delete sucessful!", success_delete);
      },
      function(fail_delete){
        self_table_controller.handle_server_delete_response(false, fail_delete, delete_id);
        //$log.warn("request_server_delete failed! ", fail_delete);
      })
  }
});
/**
 * Controller for the UX inputs, clear functionality, and asking server to add student
 */
 app.controller("form_controller", function($http, $log, shared_data) {
    //form_controller
    this.display = function(type){
      if(type === "title"){
        return shared_data.current_display().display;  
      }
      return shared_data.current_display().display_details
    }
    this.input_name = "";
    this.input_course = "";
    this.input_grade = "";
    this.all_students = [];
    this.clear_inputs = function(){
      this.input_name = "";
      this.input_course = "";
      this.input_grade = "";
    }
    this.send_server = function(){
      //$log.log("Running send_server")
      var self_send_server = this;
      $http({
        url: "http://s-apis.learningfuze.com/sgt/create",
        headers: {"Content-Type": "application/x-www-form-urlencoded"}, //** Needs to be urlencoded
        dataType: 'JSON',
        method: 'post',
        cache: false,
        data: $.param({api_key: "Yd2V1lB6e5", //** Creates the string of the key and attr
          name: self_send_server.input_name,
          course: self_send_server.input_course,
          grade: self_send_server.input_grade})
      })
      .then(
        function(success_response){
            self_send_server.id = success_response.data.new_id; //** This is just the student array
            //$log.info("Server data sent: ", self_send_server.id);
            /**
             * Add the new student the the service's student array
             */
             shared_data.add_student({
              name: self_send_server.input_name,
              course: self_send_server.input_course,
              grade: self_send_server.input_grade,
              id: self_send_server.id
            })
            self_send_server.clear_inputs(); //** UX Choice: Clear the inputs if student is added
            shared_data.message("add sucessful", self_send_server.id);
          }, 
          function(fail_response){
            self_send_server.data = fail_response;
            shared_data.message("add failed", self_send_server.id);
            //$log.warn("table_controller this.send_server fail_reponse: ", fail_response);
          });
    };
  });