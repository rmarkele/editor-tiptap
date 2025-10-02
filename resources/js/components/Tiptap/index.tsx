// src/Tiptap.tsx
import type { Node } from '@tiptap/pm/model';
import { EditorContent, EditorContext, useEditor } from '@tiptap/react';
// import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import Highlight from '@tiptap/extension-highlight';
import Mathematics, { migrateMathStrings } from '@tiptap/extension-mathematics';
import TextAlign from '@tiptap/extension-text-align';
import { Placeholder } from '@tiptap/extensions';
import StarterKit from '@tiptap/starter-kit';
// import BulletList from '@tiptap/extension-bullet-list'
import { useMemo, useState } from 'react';
import MathDialog from './MathDialog';
import MathRenderer from './MathRenderer';
import MenuBar from './MenuBar';

const Tiptap = () => {
    const [mathDialog, setMathDialog] = useState({
        open: false,
        type: null as 'block' | 'inline' | null,
        value: '',
        position: 0,
    });
    const [post, setPost] = useState('');

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc ml-3',
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'list-decimal ml-3',
                    },
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                defaultAlignment: 'left',
            }),
            Highlight,
            Mathematics.configure({
                blockOptions: {
                    onClick: (node: Node, pos: number) => {
                        setMathDialog({
                            open: true,
                            type: 'block',
                            value: node.attrs.latex || '',
                            position: pos,
                        });
                    },
                },
                inlineOptions: {
                    onClick: (node: Node, pos: number) => {
                        setMathDialog({
                            open: true,
                            type: 'inline',
                            value: node.attrs.latex || '',
                            position: pos,
                        });
                    },
                },
            }),
            Placeholder.configure({
                placeholder: 'Escreva algo …',
            }),
        ],
        onCreate: ({ editor: currentEditor }) => {
            migrateMathStrings(currentEditor);
        },
        content: '', // initial content
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-5 mb-5 mt-1 focus:outline-none min-h-[156px] border  border-2 border-gray-300 rounded-lg p-4 bg-slate-50 max-h-[300px] overflow-y-auto',
            },
        },

        onUpdate: ({ editor: currentEditor }) => {
            // You can handle content updates here if needed
            const html = currentEditor.getHTML();
            setPost(html);
            console.log('Editor content updated:', html);
        },
    });

    // Memoize the provider value to avoid unnecessary re-renders
    const providerValue = useMemo(() => ({ editor }), [editor]);

    const handleMathDialogClose = () => {
        setMathDialog((prev) => ({ ...prev, open: false }));
    };

    const handleMathDialogSave = () => {
        if (editor && mathDialog.value.trim()) {
            editor.chain().setNodeSelection(mathDialog.position);

            if (mathDialog.type === 'block') {
                editor
                    .chain()
                    .updateBlockMath({ latex: mathDialog.value })
                    .focus()
                    .run();
            } else if (mathDialog.type === 'inline') {
                editor
                    .chain()
                    .updateInlineMath({ latex: mathDialog.value })
                    .focus()
                    .run();
            }
        }
        handleMathDialogClose();
    };

    const setMathDialogValue = (value: string) => {
        setMathDialog((prev) => ({ ...prev, value }));
    };

    return (
        <div>
            <EditorContext.Provider value={providerValue}>
                <MenuBar editor={editor} />
                <EditorContent editor={editor} />
                <MathDialog
                    open={mathDialog.open}
                    type={mathDialog.type}
                    value={mathDialog.value}
                    onClose={handleMathDialogClose}
                    onSave={handleMathDialogSave}
                    setDialogValue={setMathDialogValue}
                />
            </EditorContext.Provider>

            <div>
                <h2 className="mt-6 mb-2 text-lg font-medium">
                    Editor HTML Output:
                </h2>
                <MathRenderer
                    html={post}
                    className="max-h-60 overflow-y-auto rounded border bg-gray-100 p-4 text-sm"
                />
            </div>
        </div>
    );
};

export default Tiptap;
