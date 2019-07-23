import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {ValidationRules, ValidationControllerFactory, validationMessages} from 'aurelia-validation';
import {PostService} from '../../common/services/post-service';

@inject(PostService, ValidationControllerFactory)
export class PostForm {
  @bindable post;
  @bindable title;

  constructor(PostService, ValidationControllerFactory) {
    this.postService = PostService;
    this.controller = ValidationControllerFactory.createForCurrentScope();
  }

  attached() {
    /* Grab all the tags from the backend so that you can populate the input for tags on the form on new-post.html */
    this.postService.allTags().then(data => {
      this.allTags = data.tags;
    }).catch(error => {
      console.log(error);
    })
  }

  addTag() {
    /* Add the tag to the allTags array */
    this.allTags.push(this.newTag);
    /* Ensure the newly added tag is checked */;
    this.post.tags.push(this.newTag);
    /* Clear the text box */
    this.newTag = '';
  }

  submit() {

  }

  postChanged(newValue, oldValue) {
    /* If a post exists */
    if (this.post) {
      /* Escaping is used on the variable because its value does not exist at the time it is set */
      validationMessages['required'] = `You must enter a \${$displayName}.`
      /* Set the validation rules */
      ValidationRules
        .ensure('title').displayName("Post Title").required()
        .ensure('body').displayName("Post Body").required()
        .on(this.post);

      this.controller.validate();
    }
  }
}
