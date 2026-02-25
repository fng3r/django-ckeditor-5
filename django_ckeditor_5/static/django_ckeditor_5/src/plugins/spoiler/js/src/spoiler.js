import {Plugin} from 'ckeditor5/src/core.js';

import SpoilerEditing from './spoilerediting';
import SpoilerUI from './spoilerui';

import '../../css/spoiler.css'

export default class Spoiler extends Plugin {
  static get requires() {
    return [SpoilerEditing, SpoilerUI];
  }

  afterInit() {
    this.editor.editing.view.document.on('click', (evt, data) => {
      const element = data.domTarget;
      const isSpoilerToggle = element.classList.contains('spoiler-toggle');
      if (data.target.name === 'div' && isSpoilerToggle) {
        const spoilerContent = element.parentElement.parentElement.querySelector('.spoiler-content');
        if (spoilerContent.classList.contains('show')) {
          element.classList.toggle('show-icon', true);
          element.classList.toggle('hide-icon', false);
          spoilerContent.classList.toggle('hidden', true);
          spoilerContent.classList.toggle('show', false);
        }
        else {
          element.classList.toggle('show-icon', false);
          element.classList.toggle('hide-icon', true);
          spoilerContent.classList.toggle('hidden', false);
          spoilerContent.classList.toggle('show', true);
        }
      }
    });
  }
}
