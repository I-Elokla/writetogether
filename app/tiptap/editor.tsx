"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BlockQuoteIcon from "./icons/blockquote-icon";
import BoldIcon from "./icons/bold-icon";
import HeadingOneIcon from "./icons/heading-one-icon";
import HeadingThreeIcon from "./icons/heading-three-icon";
import HeadingTwoIcon from "./icons/heading-two-icon";
import {
useLiveblocksExtension,
  FloatingToolbar,
} from "@liveblocks/react-tiptap";

export default function TiptapEditor() {
  const liveblocks = useLiveblocksExtension();

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "outline-none flex-1 px-4 py-3 transition-all prose prose-invert prose-slate max-w-none",
      },
    },
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      liveblocks,
    ],
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* <div className="h-[60px] flex items-center justify-end px-4 border-b border-border/80 bg-background">
        <VersionsDialog editor={editor} />
        <NotificationsPopover />
      </div> */}

      <div className="border-b border-border/80 bg-background flex items-center gap-1 p-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <HeadingOneIcon className="h-4 w-4" />
              Heading
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              <HeadingOneIcon className="mr-2 h-4 w-4" />
              Heading 1
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              <HeadingTwoIcon className="mr-2 h-4 w-4" />
              Heading 2
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              <HeadingThreeIcon className="mr-2 h-4 w-4" />
              Heading 3
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Toggle
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          size="sm"
          className="gap-2"
        >
          <BoldIcon className="h-4 w-4" />
          Bold
        </Toggle>

        <Toggle
          pressed={editor.isActive("blockquote")}
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          size="sm"
          className="gap-2"
        >
          <BlockQuoteIcon className="h-4 w-4" />
          Quote
        </Toggle>
      </div>

      <div className="relative flex flex-col items-center w-full p-4 flex-1">
        <Card className="flex-1 max-w-[1000px] w-full">
          <CardContent className="p-0 h-full">
            <div className="relative flex flex-1 flex-col gap-2 h-full">
              <EditorContent editor={editor} className="h-full" />
              <FloatingToolbar editor={editor} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
