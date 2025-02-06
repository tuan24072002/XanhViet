import { Bold, Code, Image, Italic, Link, List, ListOrdered, Quote, WrapText } from 'lucide-react';
import React, { useEffect } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '../ui/button';
const TextEditor = ({ markdown, setMarkdown, handleInitial, handleApply, setIsApply, handleSave, isApply }: { markdown: string, setMarkdown: (e: string) => void, handleInitial: VoidFunction, handleApply: VoidFunction, handleSave: VoidFunction, setIsApply: (e: boolean) => void, isApply: boolean }) => {
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
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey) {
                if (event.key === 'b') {
                    event.preventDefault();
                    insertMarkdownSyntax('bold');
                } else if (event.key === 'i') {
                    event.preventDefault();
                    insertMarkdownSyntax('italic');
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    return (
        <>
            <div className="mb-4 flex items-center space-x-2 p-2 rounded-lg w-fit absolute right-10 top-4">
                <button
                    onClick={() => insertMarkdownSyntax('header1')}
                    className="px-4 py-2 bg-white text-text rounded border border-transparent hover:bg-highlight hover:border-white hover:text-white transition-all duration-300 cursor-pointer"
                >
                    H1
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('header2')}
                    className="px-4 py-2 bg-white text-text rounded border border-transparent hover:bg-highlight hover:border-white hover:text-white transition-all duration-300 cursor-pointer"
                >
                    H2
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('header3')}
                    className="px-4 py-2 bg-white text-text rounded border border-transparent hover:bg-highlight hover:border-white hover:text-white transition-all duration-300 cursor-pointer"
                >
                    H3
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('bold')}
                    className="px-4 py-2 bg-white text-text rounded border border-transparent hover:bg-highlight hover:border-white hover:text-white transition-all duration-300 cursor-pointer"
                >
                    <Bold size={20} />
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('italic')}
                    className="px-4 py-2 bg-white text-text rounded border border-transparent hover:bg-highlight hover:border-white hover:text-white transition-all duration-300 cursor-pointer"
                >
                    <Italic size={20} />
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('code')}
                    className="px-4 py-2 bg-white text-text rounded border border-transparent hover:bg-highlight hover:border-white hover:text-white transition-all duration-300 cursor-pointer"
                >
                    <Code size={20} />
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('link')}
                    className="px-4 py-2 bg-white text-text rounded border border-transparent hover:bg-highlight hover:border-white hover:text-white transition-all duration-300 cursor-pointer"
                >
                    <Link size={20} />
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('image')}
                    className="px-4 py-2 bg-white text-text rounded border border-transparent hover:bg-highlight hover:border-white hover:text-white transition-all duration-300 cursor-pointer"
                >
                    <Image size={20} />
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('list')}
                    className="px-4 py-2 bg-white text-text rounded border border-transparent hover:bg-highlight hover:border-white hover:text-white transition-all duration-300 cursor-pointer"
                >
                    <List size={20} />
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('numberedList')}
                    className="px-4 py-2 bg-white text-text rounded border border-transparent hover:bg-highlight hover:border-white hover:text-white transition-all duration-300 cursor-pointer"
                >
                    <ListOrdered size={20} />
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('blockquote')}
                    className="px-4 py-2 bg-white text-text rounded border border-transparent hover:bg-highlight hover:border-white hover:text-white transition-all duration-300 cursor-pointer"
                >
                    <Quote size={20} />
                </button>
                <button
                    onClick={() => insertMarkdownSyntax('lineBreak')}
                    className="px-4 py-2 bg-white text-text rounded border border-transparent hover:bg-highlight hover:border-white hover:text-white transition-all duration-300 cursor-pointer"
                >
                    <WrapText size={20} />
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4 border border-highlight rounded-lg relative mt-2">
                <div>
                    <textarea
                        value={markdown}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setMarkdown(e.target.value)
                        }
                        className="w-full h-[calc(100vh-520px)] outline-none p-4 resize-none  scroll-hidden"
                        placeholder="Viết câu chuyện khởi nghiệp ở đây..."
                    />
                </div>
                <hr className='absolute right-1/2 -translate-x-1/2 w-[1px] h-full bg-highlight' />
                <div className="h-[calc(100vh-520px)] p-4 overflow-y-auto scroll-hidden">
                    <Markdown remarkPlugins={[remarkGfm]} className="leading-8">
                        {markdown}
                    </Markdown>
                </div>
            </div>
            <div className="h-20 px-10 flex items-center justify-end gap-4 border-t-2 absolute w-full bottom-0">
                <Button onClick={handleInitial} className="border-highlight border cursor-pointer bg-white text-text hover:bg-highlight hover:text-white">Thiết lập lại</Button>
                <Button onClick={() => {
                    handleApply();
                    setIsApply(false);
                }} disabled={!isApply} className="border-highlight border cursor-pointer bg-white text-text hover:bg-highlight hover:text-white">Áp dụng</Button>
                <Button onClick={() => {
                    handleSave();
                    setIsApply(true);
                }} disabled={isApply} className="border-highlight border cursor-pointer bg-white text-text hover:bg-highlight hover:text-white">Lưu</Button>
            </div>
        </>
    );
};

export default TextEditor;