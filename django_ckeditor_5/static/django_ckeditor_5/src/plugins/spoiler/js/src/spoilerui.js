import {Plugin} from 'ckeditor5/src/core';
import {ButtonView} from 'ckeditor5/src/ui';

import spoilerIcon from '../../icons/spoiler.svg';

export default class SpoilerUI extends Plugin {
  init() {
    const editor = this.editor;
    const t = editor.t;

    editor.ui.componentFactory.add('Spoiler', locale => {
      const button = new ButtonView(locale);

      button.set({
        label: t('Spoiler'),
        icon: spoilerIcon,
        tooltip: true
      });

      this.listenTo(button, 'execute', () => editor.execute('createSpoiler'));

      return button;
    });
  }
}

