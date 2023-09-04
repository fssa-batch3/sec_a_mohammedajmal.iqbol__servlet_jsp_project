/**
 * 
 */

//enter button js
//comment will go when user press enter key
let input = document.getElementById("comment-input");
input.addEventListener("keypress", (event) => {
  try {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("submit-comment").click();
    }

    //catch statement
  } catch (error) {
    console.error("Error" + error);
  }
});

// video or image file reader code end

//heropage start

let heropage2;

heropage2 = document.createElement("div");
heropage2.setAttribute("class", "heropage2");
heropage2.innerHTML = `
   <img src=${get_obj["img"]} alt="" id="course-image">
  `;

document.querySelector(".heropage").append(heropage2);

//check ID is already exist

// share and gift div display none
document.getElementById("share-div").style.display = "none";
document.getElementById("gift-div").style.display = "none";
document.getElementById("edit-comment").style.display = "none";

// share div display block
function share() {
  document.querySelector(".course-container").style.opacity = "0.7";
  document.querySelector("body").style.backgroundColor = "black";
  document.getElementById("share-div").style.display = "block";
  document.getElementById("share-div").style.opacity = "1";
}

// share and gift div link window location show
document.getElementById("link-input").value = window.location;
document.getElementById("link-input1").value = window.location;

// share div back
function back() {
  document.getElementById("share-div").style.display = "none";
  document.querySelector(".course-container").style.opacity = "1";
  document.querySelector("body").style.backgroundColor = "#F6F8FC";
}

// gift div display block
function gift() {
  document.querySelector(".course-container").style.opacity = "0.7";
  document.querySelector("body").style.backgroundColor = "black";
  document.getElementById("gift-div").style.display = "block";
  document.getElementById("gift-div").style.opacity = "1";
}

// gift div back
function giftback() {
  document.getElementById("gift-div").style.display = "none";
  document.querySelector(".course-container").style.opacity = "1";
  document.querySelector("body").style.backgroundColor = "#F6F8FC";
}

//delete course from my courses when clicking a button

// URL Params
const urls = window.location.search;
const urlparams = new URLSearchParams(urls);
const usernames = urlParams.get("name");

// delete course eventlistener when click
let delete_mycourses = document.getElementById("deletecourse");
delete_mycourses.addEventListener("click", (deletecourse) => {
  deletecourse.preventDefault();

  try {
    //JSON parse mycourses
    let register = JSON.parse(localStorage.getItem("register_arr"));

    let loggin = JSON.parse(localStorage.getItem("login_arr"));

    const get_user_obj = register.find((event) => event.email === loggin);

    let indexx = register.indexOf(get_user_obj);

    //find clicked course by find method
    const get_mycourses = register[indexx].courses.find(
      (course) => course.obj.title === usernames
    );

    // find clicked index from mycourses array
    let index = register[indexx].courses.indexOf(get_mycourses);

    //find index
    let index1 = register.indexOf(get_user_obj);

    //courses id splice find object

    // confirm message when click delete button
    let msg = confirm(
      "Are you sure You want to delete this course from My Courses"
    );

    const msgConfirmed = msg !== true;

    if (msgConfirmed) {
      return false;
    } else {
  
      let getObjs = register[index1].courses.find(
        (event) => event.obj.id === get_mycourses.obj.id
      );

      let findValIndex = register[index1].courses.indexOf(getObjs);

      register[index1].courses.splice(findValIndex, 1);
      localStorage.setItem("register_arr", JSON.stringify(register));

      alert("Course Removed to My Courses");
    }

    window.location.href = "learn.html";

    //catch statement
  } catch (error) {
    console.error("Error" + error);
  }
});

//delete course from bookmarks

// delete bookmark from bookmark tab
let delete_bookmark = document.getElementById("deletebookmark");

//delete bookmark when click button
delete_bookmark.addEventListener("click", (deletecourse) => {
  deletecourse.preventDefault();

  try {
    //bookmark JSON parse from localstorage
    let register = JSON.parse(localStorage.getItem("register_arr"));

    let loggin = JSON.parse(localStorage.getItem("login_arr"));

    const get_user_obj = register.find((event) => event.email === loggin);

    let index1 = register.indexOf(get_user_obj);

    //find bookmarrk object by title
    const get_bookmark = register[index1].bookmarks.find(
      (course) => course.obj.title === usernames
    );

    //find bookmark obj with course_data
    const get_course = course_data.find((course) => course.title === usernames);

    // find index by match object from course_data
    const course_index = course_data.indexOf(get_course);

    // find index by match object from bookmark
    const index = register[index1].bookmarks.indexOf(get_bookmark);

    //confirm message to remove bookmark
    let msg = confirm(
      "Are you sure You want to Remove this course from Your Bookmarks"
    );

    const msgConfirmed = msg !== true;
    if (msgConfirmed) {
      return false;
    } else {
      //find index
      let index1 = register.indexOf(get_user_obj);

      //remove bookmark id from bookmark key in user object

      let getObjs = register[index1].bookmarks.find(
        (event) => event.obj.id === get_bookmark.obj.id
      );

      let findValIndex = register[index1].bookmarks.indexOf(getObjs);

      register[index1].bookmarks.splice(index, 1);
      localStorage.setItem("register_arr", JSON.stringify(register));

      //if message true then do this
      // bookmark.splice(index,1);
      // localStorage.setItem("bookmarks",JSON.stringify(bookmark));

      let bookmark_obj = {
        bookmark_img: "../assets/images/icons8-add-bookmark-50.png",
      };

      //assign this source with previous source
      let assignObj = Object.assign(get_course, bookmark_obj);

      //assign new value to old one
      course_data[course_index] = assignObj;

      //set new value to localstorage
      localStorage.setItem("course_data", JSON.stringify(course_data));

      window.location.href = "learn.html";
    }

    //catch statement
  } catch (error) {
    console.error("Error" + error);
  }
});

// parse register array JSON
const register_arr = JSON.parse(localStorage.getItem("register_arr"));

// parse login array JSON
const login = JSON.parse(localStorage.getItem("login_arr"));

// get user profile from user login
const get_objs = register_arr.find((Reg) => login == Reg["email"]);

document.getElementById("dropusers").src = get_objs.profile_pic;

// comment card create when clicks
let createcomment = document.getElementById("submit-comment");
createcomment.addEventListener("click", (event) => {
  event.preventDefault();

  try {
    const comment_input = document.getElementById("comment-input").value;

    // if array not null do this
    if (localStorage.getItem("comments") != null) {
      comment_arr = JSON.parse(localStorage.getItem("comments"));

      let comment_input = document.getElementById("comment-input").value;
      let comment_id = Date.now();
      let comment_pic = get_objs.profile_pic;
      let course_id = get_obj.id;
      let comment_time = moment().calendar();
      let course_title = get_obj.title;
      let user_id = get_objs.user_id;

      let comment_obj = {
        comment_input,
        comment_id,
        user_id,
        comment_pic,
        course_id,
        course_title,
        comment_time,
      };

      //push obj into arr
      comment_arr.push(comment_obj);

      //local set comments
      localStorage.setItem("comments", JSON.stringify(comment_arr));
      location.reload();
    } else {
      //else create an array
      let comment_arr = [];

      let comment_input = document.getElementById("comment-input").value;
      let comment_id = Date.now();
      let comment_pic = get_objs.profile_pic;
      let course_id = get_obj.id;
      let comment_time = moment().calendar();
      let course_title = get_obj.title;
      let user_id = get_objs.user_id;

      let comment_obj = {
        comment_input,
        comment_id,
        user_id,
        comment_pic,
        course_id,
        course_title,
        comment_time,
      };

      //comment push
      comment_arr.push(comment_obj);

      //localstorage set comments
      localStorage.setItem("comments", JSON.stringify(comment_arr));
      location.reload();
    }

    //catch statement
  } catch (error) {
    console.error("Error" + error);
  }
});



//if else for show comments
//edit function new popup div
function edit() {
    document.querySelector(".course-container").style.opacity = "1";
    document.getElementById("edit-comment").style.display = "block";
    document.getElementById("edit-comment").style.marginTop = "1950px";
    document.getElementById("edit-comment").style.width = "60%";
    document.getElementById("edit-comment").style.marginLeft = "250px";
    document.getElementById("edit-comment").style.height = "200px";
    document.getElementById("edit-comment").style.opacity = "1";
}

function backedit() {
    document.getElementById("edit-comment").style.display = "none";
    document.querySelector(".course-container").style.opacity = "1";
}

// function after click submit button
function submitedit() {
  try {
    // editSubmit(editObj);
    let comment_input = document.getElementById("comment-edit").value;
    let comment_id = editObj["comment_id"];
    let user_id = editObj["user_id"];

    const obj = {
      comment_input,
      comment_id,
      user_id,
    };


    let edit_assign = Object.assign(editObj, obj);

    const index = comment.indexOf(editObj);

    comment[index] = edit_assign;

    localStorage.setItem("comments", JSON.stringify(comment));

    location.reload();

    //catch statement
  } catch (error) {
    console.error("Error" + error);
  }
}

// to get return vslue from edit function
function editSubmit(editObj) {
}

// delete comment function when click delete button
function deletecomment(a) {
  try {
    const get_editobj = comment.find((e) => e.comment_id === a);

    const index = comment.indexOf(get_editobj);

    comment.splice(index, 1);

    localStorage.setItem("comments", JSON.stringify(comment));

    location.reload();

    //catch statement
  } catch (error) {
    console.error("Error" + error);
  }
}

// accordian code function start
let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    try {
      this.classList.toggle("active");
      let panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }

      //catch statement
    } catch (error) {
      console.error("Error" + error);
    }
  });
}

// accordian code function end


function googleTranslateElementInit() {
  const translateElement = new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
  return translateElement;
}