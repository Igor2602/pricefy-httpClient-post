import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url = 'http://localhost:3000/posts'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os posts
  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.url)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  // Obtem um post pelo id
  getPostById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(this.url + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  // salva um post
  savePost(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(this.url, JSON.stringify(post), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  // atualiza um post
  updatePost(post: Post): Observable<Post> {
    return this.httpClient.put<Post>(this.url + '/' + post.id, JSON.stringify(post), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // deleta um post
  deletePost(post: Post) {
    return this.httpClient.delete<Post>(this.url + '/' + post.id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
