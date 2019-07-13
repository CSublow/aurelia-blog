import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';

@inject(PostService)
export class View {
  constructor(PostService) {
    this.postService = PostService;
  }

  activate(params) {
    this.error = '';
    /* The find method here is provided by the post-service js
      It returns either the post or an error */
    this.postService.find(params.slug).then(data => {
      this.post = data.post;
    }).catch(error => {
      this.error = error.message;
    })
  }
}
