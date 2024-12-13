'use client';

import React from 'react';
import { Plate } from '@udecode/plate';


export default function StoryEditor() {
  const editor = useCreateEditor({
    plugins: [
      ...editorPlugins,
      CommentsPlugin({
        options: {
          myUser: { id: '1', name: 'User' }, // Single user setup
          userById: (id) => ({ id, name: 'User' }), // Simplified user lookup
        },
      }),
    ],
    value: [], // Start with an empty value
  });

  return (
    <Plate editor={editor}>
      <EditorContainer variant="demo">
        <Editor />
      </EditorContainer>
    </Plate>
  );
}
