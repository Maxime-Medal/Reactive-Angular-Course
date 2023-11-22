import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { CoursesService } from '../Services/courses.service';
import { LoadingService } from '../loading/loading.service';


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
    private loadingService: LoadingService
  ) {

  }

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    const courses$ = this._coursesService.loadAllCourses()
      .pipe(
        map(c => c.sort(sortCoursesBySeqNo))
      );

    this.beginnerCourses$ = courses$
      .pipe(
        map(courses => courses.filter(c => c.category === "BEGINNER"))
      );

    this.advancedCourses$ = courses$
      .pipe(
        map(courses => courses.filter(c => c.category === "ADVANCED"))
      );
  }
}




