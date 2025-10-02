import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Heading1, Heading2, Heading3, Heading4, Highlighter, Italic, List, ListOrdered, Strikethrough, Underline,  } from "lucide-react";
import { Toggle } from "../ui/toggle";
import type { Editor } from '@tiptap/core';
import { useEditorState } from "@tiptap/react";


export default function MenuBar({ editor }: { editor: Editor | null }) {
    const editorState = useEditorState({
        editor,
        selector: ctx => {
            return {
                isBold: ctx.editor?.isActive('bold') ?? false,
                canBold: ctx.editor?.can().chain().toggleBold().run() ?? false,
                isItalic: ctx.editor?.isActive('italic') ?? false,
                canItalic: ctx.editor?.can().chain().toggleItalic().run() ?? false,
                isUnderline: ctx.editor?.isActive('underline') ?? false,
                canUnderline: ctx.editor?.can().chain().toggleUnderline().run() ?? false,
                isStrike: ctx.editor?.isActive('strike') ?? false,
                canStrike: ctx.editor?.can().chain().toggleStrike().run() ?? false,
                isCode: ctx.editor?.isActive('code') ?? false,
                canCode: ctx.editor?.can().chain().toggleCode().run() ?? false,
                canClearMarks: ctx.editor?.can().chain().unsetAllMarks().run() ?? false,
                isParagraph: ctx.editor?.isActive('paragraph') ?? false,
                isHeading1: ctx.editor?.isActive('heading', { level: 1 }) ?? false,
                isHeading2: ctx.editor?.isActive('heading', { level: 2 }) ?? false,
                isHeading3: ctx.editor?.isActive('heading', { level: 3 }) ?? false,
                isHeading4: ctx.editor?.isActive('heading', { level: 4 }) ?? false,
                isHeading5: ctx.editor?.isActive('heading', { level: 5 }) ?? false,
                isHeading6: ctx.editor?.isActive('heading', { level: 6 }) ?? false,
                isBulletList: ctx.editor?.isActive('bulletList') ?? false,
                isOrderedList: ctx.editor?.isActive('orderedList') ?? false,
                isCodeBlock: ctx.editor?.isActive('codeBlock') ?? false,
                isBlockquote: ctx.editor?.isActive('blockquote') ?? false,
                canUndo: ctx.editor?.can().chain().undo().run() ?? false,
                canRedo: ctx.editor?.can().chain().redo().run() ?? false,
                isLeftAligned: ctx.editor?.isActive({ textAlign: 'left' }) ?? false,
                isCenterAligned: ctx.editor?.isActive({ textAlign: 'center' }) ?? false,
                isRightAligned: ctx.editor?.isActive({ textAlign: 'right' }) ?? false,
                isJustifyAligned: ctx.editor?.isActive({ textAlign: 'justify' }) ?? false,
                isHighlight: ctx.editor?.isActive('highlight') ?? false
            }
        },
    });

    if (!editor) {
        return null;
    }




    const buttons = [
        //Group 1
        [
            {
                icon: <Heading1 />,
                label: 'Heading 1',
                action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
                disabled: false,
                isActive: editorState?.isHeading1,
            },
            {
                icon: <Heading2 />,
                label: 'Heading 2',
                action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
                disabled: false,
                isActive: editorState?.isHeading2,
            },
            {
                icon: <Heading3 />,
                label: 'Heading 3',
                action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
                disabled: false,
                isActive: editorState?.isHeading3,
            },
            {
                icon: <Heading4 />,
                label: 'Heading 4',
                action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
                disabled: false,
                isActive: editorState?.isHeading4,
            }
        ],


        //Group 2
        [
            {
                icon: <Bold />,
                label: 'Bold',
                action: () => editor.chain().focus().toggleBold().run(),
                disabled: editorState?.canBold,
                isActive: editorState?.isBold,
            },
            {
                icon: <Italic />,
                label: 'Italic',
                action: () => editor.chain().focus().toggleItalic().run(),
                disabled: editorState?.canItalic,
                isActive: editorState?.isItalic,
            },
            {
                icon: <Underline />,
                label: 'Underline',
                action: () => editor.chain().focus().toggleUnderline().run(),
                disabled: editorState?.canUnderline,
                isActive: editorState?.isUnderline,
            },
            {
                icon: <Strikethrough />,
                label: 'Strikethrough',
                action: () => editor.chain().focus().toggleStrike().run(),
                disabled: editorState?.canStrike,
                isActive: editorState?.isStrike,
            }
        ],
        //Group 3
        [
            {
                icon: <AlignLeft />,
                label: 'Align Left',
                action: () => editor.chain().focus().setTextAlign('left').run(),
                disabled: false,
                isActive: editorState?.isLeftAligned,
            },
            {
                icon: <AlignCenter />,
                label: 'Align Center',
                action: () => editor.chain().focus().setTextAlign('center').run(),
                disabled: false,
                isActive: editorState?.isCenterAligned,
            },
            {
                icon: <AlignRight />,
                label: 'Align Right',
                action: () => editor.chain().focus().setTextAlign('right').run(),
                disabled: false,
                isActive: editorState?.isRightAligned,
            },
            {
                icon: <AlignJustify />,
                label: 'Align Justify',
                action: () => editor.chain().focus().setTextAlign('justify').run(),
                disabled: false,
                isActive: editorState?.isJustifyAligned,
            },
        ],
        //Group 4
        [
            {
                icon: <List />,
                label: 'Bullet List',
                action: () => editor.chain().focus().toggleBulletList().run(),
                disabled: false,
                isActive: editorState?.isBulletList,
            },
            {
                icon: <ListOrdered />,
                label: 'Ordered List',
                action: () => editor.chain().focus().toggleOrderedList().run(),
                disabled: false,
                isActive: editorState?.isOrderedList,
            },
        ],
        //Group 5
         [
            {
                icon: <Highlighter />,
                label: 'Highlight',
                action: () => editor.chain().focus().toggleHighlight().run(),
                disabled: false,
                isActive: editorState?.isHighlight,
            },
        ]

    ]


    return (
        <div className="control-group">
            <div className=" flex mx-5 mt-1 focus:outline-none border  border-2 border-gray-300 px-4 py-1 bg-slate-200">
                
                {buttons.map((group, index) => (
                    <div key={index} className="flex border-r last:border-r-0 border-slate-400 px-1 space-x-1 z-50">
                        {group.map((button, btnIndex) => (
                            <>
                            <Toggle
                                size='lg'
                                title={button.label}
                                aria-label={button.label}
                                key={btnIndex}
                                pressed={button.isActive}
                                onPressedChange={button.action}
                                className="data-[state=on]:bg-slate-300 data-[state=on]:text-slate-900"
                            >
                                {button.icon}
                            </Toggle>
                            {/* <ListOrdered size={32}/> */}
                            </>

                        ))}
                    </div>
                ))}

            </div>
        </div>
    )
}