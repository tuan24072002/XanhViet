import { Bold, Code, Image, Italic, Link, List, ListOrdered, Quote, WrapText } from 'lucide-react';
import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const TextEditor = ({ markdown, setMarkdown }: { markdown: string, setMarkdown: (e: string) => void }) => {
    const insertMarkdownSyntax = (type: string): void => {
        const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selectedText = text.substring(start, end);

        let newText: string;
        let newCursorStart: number;
        let newCursorEnd: number;

        switch (type) {
            case 'header1':
                newText = text.substring(0, start) + `# ${selectedText}` + text.substring(end);
                newCursorStart = start + 2;
                newCursorEnd = end + 2;
                break;
            case 'header2':
                newText = text.substring(0, start) + `## ${selectedText}` + text.substring(end);
                newCursorStart = start + 3;
                newCursorEnd = end + 3;
                break;
            case 'header3':
                newText = text.substring(0, start) + `### ${selectedText}` + text.substring(end);
                newCursorStart = start + 4;
                newCursorEnd = end + 4;
                break;
            case 'bold':
                if (selectedText.startsWith('**') && selectedText.endsWith('**')) {
                    newText = text.substring(0, start) + selectedText.slice(2, -2) + text.substring(end);
                    newCursorStart = start;
                    newCursorEnd = end - 4;
                } else {
                    newText = text.substring(0, start) + `**${selectedText}**` + text.substring(end);
                    newCursorStart = start + 2;
                    newCursorEnd = end + 2;
                }
                break;
            case 'italic':
                if (selectedText.startsWith('*') && selectedText.endsWith('*')) {
                    newText = text.substring(0, start) + selectedText.slice(1, -1) + text.substring(end);
                    newCursorStart = start;
                    newCursorEnd = end - 2;
                } else {
                    newText = text.substring(0, start) + `*${selectedText}*` + text.substring(end);
                    newCursorStart = start + 1;
                    newCursorEnd = end + 1;
                }
                break;
            case 'code':
                if (selectedText.startsWith('`') && selectedText.endsWith('`')) {
                    newText = text.substring(0, start) + selectedText.slice(1, -1) + text.substring(end);
                    newCursorStart = start;
                    newCursorEnd = end - 2;
                } else {
                    newText = text.substring(0, start) + `\`${selectedText}\`` + text.substring(end);
                    newCursorStart = start + 1;
                    newCursorEnd = end + 1;
                }
                break;
            case 'link':
                newText = text.substring(0, start) + `[${selectedText}](https://)` + text.substring(end);
                newCursorStart = start + 1;
                newCursorEnd = end + 1;
                break;
            case 'image':
                newText = text.substring(0, start) + `![${selectedText}](https://)` + text.substring(end);
                newCursorStart = start + 2;
                newCursorEnd = end + 2;
                break;
            case 'list':
                newText = text.substring(0, start) + `\n- ${selectedText}` + text.substring(end);
                newCursorStart = start + 3;
                newCursorEnd = end + 3;
                break;
            case 'numberedList':
                newText = text.substring(0, start) + `\n1. ${selectedText}` + text.substring(end);
                newCursorStart = start + 4;
                newCursorEnd = end + 4;
                break;
            case 'codeBlock':
                newText = text.substring(0, start) + `\n\`\`\`\n${selectedText}\n\`\`\`\n` + text.substring(end);
                newCursorStart = start + 5;
                newCursorEnd = end + 5;
                break;
            case 'blockquote':
                newText = text.substring(0, start) + `\n> ${selectedText}` + text.substring(end);
                newCursorStart = start + 3;
                newCursorEnd = end + 3;
                break;
            case 'lineBreak':
                newText = text.substring(0, start) + `\n\n${selectedText}` + text.substring(end);
                newCursorStart = start + 2;
                newCursorEnd = end + 2;
                break;
            default:
                return;
        }

        setMarkdown(newText);
        textarea.focus();
        textarea.setSelectionRange(newCursorStart, newCursorEnd);
    };

    return (
        <div className="px-2 py-4 flex-1">
            <div className="mb-4 flex items-center space-x-2 p-2 border border-highlight rounded-lg w-fit absolute right-4 top-4">
                <button
                    onClick={() => insertMarkdownSyntax('header1')}
                    className="px-4 py-2 bg-highlight text-white rounded hover:bg-highlight/80"
                >
                    H1
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('header2')}
                    className="px-4 py-2 bg-highlight text-white rounded hover:bg-highlight/80"
                >
                    H2
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('header3')}
                    className="px-4 py-2 bg-highlight text-white rounded hover:bg-highlight/80"
                >
                    H3
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('bold')}
                    className="px-4 py-2 bg-highlight text-white rounded hover:bg-highlight/80"
                >
                    <Bold size={20} />
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('italic')}
                    className="px-4 py-2 bg-highlight text-white rounded hover:bg-highlight/80"
                >
                    <Italic size={20} />
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('code')}
                    className="px-4 py-2 bg-highlight text-white rounded hover:bg-highlight/80"
                >
                    <Code size={20} />
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('link')}
                    className="px-4 py-2 bg-highlight text-white rounded hover:bg-highlight/80"
                >
                    <Link size={20} />
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('image')}
                    className="px-4 py-2 bg-highlight text-white rounded hover:bg-highlight/80"
                >
                    <Image size={20} />
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('list')}
                    className="px-4 py-2 bg-highlight text-white rounded hover:bg-highlight/80"
                >
                    <List size={20} />
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('numberedList')}
                    className="px-4 py-2 bg-highlight text-white rounded hover:bg-highlight/80"
                >
                    <ListOrdered size={20} />
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('blockquote')}
                    className="px-4 py-2 bg-highlight text-white rounded hover:bg-highlight/80"
                >
                    <Quote size={20} />
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('lineBreak')}
                    className="px-4 py-2 bg-highlight text-white rounded hover:bg-highlight/80"
                >
                    <WrapText size={20} />
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <textarea
                        value={markdown}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setMarkdown(e.target.value)
                        }
                        className="w-full h-[calc(100vh-368px)] border-2 border-highlight outline-none p-4 rounded-lg resize-none"
                        placeholder="Viết câu chuyện khởi nghiệp ở đây..."
                    />
                </div>
                <div className="border border-highlight rounded-lg h-[calc(100vh-368px)] p-4 overflow-y-auto">
                    <Markdown remarkPlugins={[remarkGfm]} className="leading-8">
                        {markdown}
                    </Markdown>
                </div>
            </div>
        </div>
    );
};

export default TextEditor;