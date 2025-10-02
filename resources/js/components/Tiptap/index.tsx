// src/Tiptap.tsx
import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
// import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
// import BulletList from '@tiptap/extension-bullet-list'
import { useMemo } from 'react'
import MenuBar from './MenuBar'

const Tiptap = () => {
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
                }
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                defaultAlignment: 'left',
            }),
            Highlight,
        ], // define your extension array
        content: '<p>Hello World!</p>', // initial content
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-5 mb-5 mt-1 focus:outline-none min-h-[156px] border  border-2 border-gray-300 rounded-lg p-4 bg-slate-50',
            },
        }
    })

    // Memoize the provider value to avoid unnecessary re-renders
    const providerValue = useMemo(() => ({ editor }), [editor])

    return (
        <EditorContext.Provider value={providerValue}>

            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </EditorContext.Provider>
    )
}

export default Tiptap