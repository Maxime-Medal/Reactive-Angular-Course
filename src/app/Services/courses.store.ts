import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CoursesStore {
    // private apiUrl = `${environment.apiUrl}/courses`;
    private apiUrl = `api/courses`;
    private subject = new BehaviorSubject<Course[]>([]);

    public courses$: Observable<Course[]> = this.subject.asObservable();


    constructor(
        private http: HttpClient,
        private loadingService: LoadingService,
        private messageService: MessagesService
    ) {
        this.loadAllCourses();
    }

    private loadAllCourses() {
        const loadCourses$ = this.http.get<Course[]>(this.apiUrl)
            .pipe(
                map(res => res["payload"]),
                catchError(err => {
                    const message = "Could not load courses";
                    this.messageService.showErrors(message);
                    console.error(message, err)
                    return throwError(err);
                }),
                tap(courses => this.subject.next(courses))
            )

        this.loadingService.showLoaderUntilCompleted(loadCourses$).subscribe();
    }

    saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
        const courses = this.subject.getValue();
        const courseIndex = courses.findIndex(c => c.id == courseId);
        const newCourse: Course = {
            ...courses[courseIndex],
            ...changes
        };

        const newCourses: Course[] = courses.slice(0);
        newCourses[courseIndex] = newCourse;

        this.subject.next(newCourses);

        return this.http
            .put(`${this.apiUrl}/${courseId}`, changes)
            .pipe(
                catchError(err => {
                    const message = "Could not save course";
                    this.messageService.showErrors(message);
                    console.error(message, err)
                    return throwError(err);
                }),
                shareReplay()
            );
    }

    filterByCategorie(category: string): Observable<Course[]> {
        return this.courses$
            .pipe(
                map(courses => courses.filter(c => c.category == category)
                    .sort(sortCoursesBySeqNo))
            );
    }
}