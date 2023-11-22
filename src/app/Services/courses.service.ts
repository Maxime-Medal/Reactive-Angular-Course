import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private _http: HttpClient
  ) { }

  loadAllCourses(): Observable<Course[]> {
    return this._http.get<Course[]>('/api/courses')
      .pipe(
        map(res => res["payload"]),
        shareReplay() // permet de faire qu'une requête HTTP lors de plusieurs subscriptions
      );
  }

}
