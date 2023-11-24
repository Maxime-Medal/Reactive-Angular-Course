import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class CoursesStore {
    public courses$: Observable<Course[]>;

    filterByCategorie(category: string): Observable<Course[]> {
        return this.courses$
            .pipe(
                map(courses => courses.filter(c => c.category == category)
                    .sort(sortCoursesBySeqNo))
            );
    }
}