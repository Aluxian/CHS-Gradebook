# Gradebook

Gradebook is a super simple website, for students and parents to view marks, and for teachers to manage entire classrooms!

## Features

- 3 account types: teacher, user, parent
- Teacher can: register, creates classrooms, add students, add marks
- Students can: register, view classrooms teachers have addem them to, view marks
- Parents can: register, view classrooms students have addem them to, view marks
- Clean, minimalist, responsive design

## Tip

The linking between the 3 account types is done by email. For instance: 3 teachers create one classroom each, and they all add student john@edu.com. When john@edu.com logs in he will be shown the 3 classrooms he has been added to. Then he can add 3 parents by their emails, and when they will log in they'll be able to see their student's marks.

## Deployment

    npm install  // install deps
    grunt serve  // start server

## Info

- For detailed guide visit [https://github.com/yeoman/generator-angular](https://github.com/yeoman/generator-angular)
- Project created for the [CreateHS February challenge](http://createhs.com/).
- To view the backend go to [http://alux-gradebook.herokuapp.com/dashboard](http://alux-gradebook.herokuapp.com/dashboard)
