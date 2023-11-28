import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  coursesUrl = `${environment.apiUrl}/courses`;
  constructor(
    private _http: HttpClient
  ) { }

  loadAllCourses(): Observable<Course[]> {
    return this._http.get<Course[]>(this.coursesUrl)
      .pipe(
        map(res => res["payload"]),
        shareReplay() // permet de faire qu'une requête HTTP lors de plusieurs subscriptions
      );
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return this._http.put(`${this.coursesUrl}/${courseId}`, changes)
      .pipe(
        shareReplay()
      );
  }

}
