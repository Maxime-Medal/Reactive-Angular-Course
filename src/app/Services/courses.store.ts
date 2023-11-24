import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";

@Injectable({
    providedIn: 'root'
})
export class CoursesStore {
    private apiUrl = "/api/course";
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
                    console.error(message, err)
                    this.messageService.showErrors(message);
                    return throwError(err);
                })
            )

        this.loadingService.showLoaderUntilCompleted(loadCourses$).subscribe();
    }

    filterByCategorie(category: string): Observable<Course[]> {
        return this.courses$
            .pipe(
                map(courses => courses.filter(c => c.category == category)
                    .sort(sortCoursesBySeqNo))
            );
    }
}