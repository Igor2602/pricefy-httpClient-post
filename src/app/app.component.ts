import { Component, OnInit } from '@angular/core';
import { PostService } from './services/post.service';
import { Post } from './models/post';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  post = {} as Post;
  posts: Post[];

  constructor(private postService: PostService) {
    this.posts = [];
  }

  ngOnInit() {
    this.getPosts();
  }

  // Chama o serviço para obter todos os carros
  getPosts() {
    this.postService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  // define se um carro será criado ou atualizado
  savePost(form: NgForm) {
    if (this.post.id !== undefined) {
      this.postService.updatePost(this.post).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.postService.savePost(this.post).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // deleta um carro
  deletePost(car: Post) {
    this.postService.deletePost(car).subscribe(() => {
      this.getPosts();
    });
  }

  // copia o post para ser editado.
  editPost(post: Post) {
    this.post = { ...post };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getPosts();
    form.resetForm();
    this.post = {} as Post;
  }

}
