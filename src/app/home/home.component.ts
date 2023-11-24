import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { CoursesService } from '../Services/courses.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { error } from 'console';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(
    private _coursesService: CoursesService,
    private _loadingService: LoadingService,
    private _messageService: MessagesService,
  ) {

  }

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    const courses$ = this._coursesService.loadAllCourses()
      .pipe(
        map(c => c.sort(sortCoursesBySeqNo)),
        catchError(err => {
          const message = "Could not loade courses";
          this._messageService.showErrors(message);
          console.error(message, err);
          return throwError(err); // nouvel observable envoyé
        }));

    const loadCourses$ = this._loadingService.showLoaderUntilCompleted(courses$);

    this.beginnerCourses$ = loadCourses$
      .pipe(
        map(courses => courses.filter(c => c.category === "BEGINNER"))
      );

    this.advancedCourses$ = loadCourses$
      .pipe(
        map(courses => courses.filter(c => c.category === "ADVANCED"))
      );
  }
}




