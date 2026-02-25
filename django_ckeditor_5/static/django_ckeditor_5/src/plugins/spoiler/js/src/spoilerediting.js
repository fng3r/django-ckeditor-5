import {Plugin} from 'ckeditor5/src/core';
import {toWidget, toWidgetEditable} from 'ckeditor5/src/widget';
import {Widget} from 'ckeditor5/src/widget';
import CreateSpoilerCommand from './createspoilercommand';

export default class SpoilerEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    const editor = this.editor;

    editor.commands.add('createSpoiler', new CreateSpoilerCommand(editor));

    this._defineSchema();
    this._defineConverters();
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('spoiler', {
      isObject: true,
      allowWhere: '$block'
    });

    schema.register('spoilerTitle', {
      isLimit: true,
      allowIn: 'spoiler',
      allowContentOf: '$block'
    });

    schema.register('spoilerToggle', {
      isLimit: true,
      allowIn: 'spoilerTitle',
      allowContentOf: '$block'
    });

    schema.register('spoilerContent', {
      isLimit: true,
      allowIn: 'spoiler',
      allowContentOf: '$root'
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for('upcast').elementToElement({
      view: {
        name: 'div',
        classes: 'spoiler'
      },
      model: 'spoiler'
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'spoiler',
      view: (modelElement, {writer: viewWriter}) => {
        const widgetElement = viewWriter.createContainerElement('div', {class: 'spoiler'});

        return toWidget(widgetElement, viewWriter);
      }
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'spoiler',
      view: {
        name: 'div',
        classes: 'spoiler'
      }
    });

    conversion.for('upcast').elementToElement({
      model: 'spoilerTitle',
      view: {
        name: 'div',
        classes: ['spoiler-title']
      }
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'spoilerTitle',
      view: {
        name: 'div',
        classes: ['spoiler-title']
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'spoilerTitle',
      view: (modelElement, {writer: viewWriter}) => {
        const spoilerTitle = viewWriter.createEditableElement('div', {class: 'spoiler-title'});
        return toWidgetEditable(spoilerTitle, viewWriter);
      }
    });

    conversion.for('upcast').elementToElement({
      model: 'spoilerToggle',
      view: {
        name: 'div',
        classes: ['spoiler-toggle', 'hide-icon']
      }
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'spoilerToggle',
      view: {
        name: 'div',
        classes: ['spoiler-toggle', 'hide-icon']
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'spoilerToggle',
      view: (modelElement, {writer: viewWriter}) => {
        const spoilerToggle = viewWriter.createEditableElement('div', {class: 'spoiler-toggle hide-icon'});
        return toWidgetEditable(spoilerToggle, viewWriter);
      }
    });

    conversion.for('upcast').elementToElement({
      model: 'spoilerContent',
      view: {
        name: 'div',
        classes: 'spoiler-content'
      }
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'spoilerContent',
      view: {
        name: 'div',
        classes: 'spoiler-content'
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'spoilerContent',
      view: (modelElement, {writer: viewWriter}) => {
        const div = viewWriter.createEditableElement('div', {class: 'spoiler-content'});
        return toWidgetEditable(div, viewWriter);
      }
    });
  }
}
