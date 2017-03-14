# SGT
* Date: 2017/01/28
* Author: Lance Takiguchi
* Description: Student Grade Table: An application for teachers to view student grade records. They can add, edit, or delete students and their records. Ultalizes Bootstrap and Angular.JS. Plans to three way bind with Firebase.

## Live Link
* http://lancetakiguchi.com/apps/sgt_app/

## Portfolio
* http://lancetakiguchi.com/

![alt tag](http://lancetakiguchi.com/assets/images/apps/sgt_app.png?raw=true "SGT pv1.0 | Lance Takiguchi App")

## Version pv1.1
* Date: 2017/03/13

#### Description: First feedback round from LFZ. Minor UX & UI Changes. 

#### HTML & CSS
* Contact: links [D: 1 Im: 1] - Redirect project resumes to main website's resume

#### JS
* JS: Add [D: 1 Im: 1] - Initializing student data (fake, local, not from server)

#### AngularFire
* Firebase/Angular [D: 5 Im: 2] - Connect with server (Note: Probably for a future version)

#### AngularJS
* AngularJS: Inputs [D: 2 Im: 1] - When empty, do nothing
* AngularJS: Inputs [D: 2 Im: 1] - Throw in spacing with SGT inputs
* AngularJS: Table (Optional) - [D: 4 Im: 3] - Edit students
* AngularJS: Table (Optional) - [D: 4 Im: 3] - Sort students


#### Github
* README: Spelling & Grammar [D: 1 Im: 1] - Check
* README: Syntax [D: 1 Im: 1] - Portfolio header did not work
* Files: Delete [D: 1 Im: 1] - .idea (SGT)
* README: Future Features [D: 1 Im: 1] - Edit students, Sort


## The Learning Experince
I have remade this app a couple of times. The first time I coded
this I did it in plain jQuery. Then a third side was added with a 
server hosted by LearningFuze accessed with a regular AJAX call.
Then I used AngularJS to bind the javascript and the DOM. Finally,
and the part that I have yet to work properly, I am to use Firebase
as the backend. With Firebase and AngularJS, I can do a three way
binding, which means any changes on the server immediately get
updated on the browers, and vice versa. This was an entertaining
diffcult project that tested combining multiple frameworks together.
I plan to fix the three way binding in the near future, but for now,
it is a great display of AngularJS.

## Web Development Utilized 
* AngularJS 
* Firebase
* HTML
* CSS
* JavaScript
* jQuery
* git

## Future Features
* Three way binding with Firebase using AngularFire.
* Application descriptions.
* Displaying a loading icon for UX.
* Fix the inputs section as sticky on the screen, just for smaller resolutions.
* Edit existing student entries data
* Sort the students by name, course, or grade.
