import { transform, Transformer, whitelist, Options } from 'jsonapi-fractal';
import { Note } from '../../types/services/Note';

class ContextTransformer extends Transformer<
  { id: string },
  Options<{ id: string }>
> {
  constructor() {
    super();
    this.type = 'customer';
  }

  transform(context: { id: string }) {
    return context;
  }
}

export class NoteTransformer extends Transformer<Note, Options<Note>> {
  constructor() {
    super();
    this.type = 'note';
    this.relationships = {
      context_id: this.contextId,
    };
  }

  transform(note: Note, options: Options<Options<Note>>) {
    return whitelist(
      note,
      options.fields && options.fields.note ? options.fields.note : []
    );
  }

  contextId(note: Note) {
    return transform()
      .withInput(note.context_id)
      .withTransformer(
        new ContextTransformer() as Transformer<unknown, unknown>
      )
      .toContext();
  }
}
