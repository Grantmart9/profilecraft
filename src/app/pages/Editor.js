"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

export default function EditorPage() {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && containerRef.current) {
      // Initialize GrapesJS editor
      const editor = grapesjs.init({
        container: containerRef.current,
        fromElement: true,
        height: "100%",
        width: "100%",
        storageManager: false,
        plugins: [],
        pluginsOpts: {},
        styleManager: {
          sectors: [{
            name: 'General',
            open: false,
            properties: [
              'background-color',
              'min-height',
              'padding',
              'margin',
              'font-family',
              'font-size',
              'color',
              'border',
              'border-radius',
            ]
          }]
        },
        blockManager: {
          appendTo: '#blocks',
          blocks: [
            {
              id: 'section',
              label: 'Section',
              attributes: { class: 'gjs-block-section' },
              content: `<section>
                <h1 class="text-2xl font-bold">Section Title</h1>
                <p class="text-gray-600">Section content...</p>
              </section>`,
            },
            {
              id: 'text',
              label: 'Text',
              attributes: { class: 'gjs-block-text' },
              content: '<div data-gjs-type="text" class="text-gray-800">Insert your text here...</div>',
            },
            {
              id: 'image',
              label: 'Image',
              attributes: { class: 'gjs-block-image' },
              content: '<img src="https://via.placeholder.com/350x250" alt="Image" />',
            },
            {
              id: 'button',
              label: 'Button',
              content: '<button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Button</button>',
            }
          ]
        }
      });

      editorRef.current = editor;

      // Add basic CSS for the editor
      const style = document.createElement('style');
      style.innerHTML = `
        .gjs-block-section {
          background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E");
          background-size: 24px 24px;
        }
        .gjs-block-text {
          background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21 6v2H3V6h18zM3 12h18v-2H3v2zm0 4h18v-2H3v2z'/%3E%3C/svg%3E");
          background-size: 24px 24px;
        }
        .gjs-block-image {
          background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z'/%3E%3Cpath d='M21 19H3V5h18v14zM21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z'/%3E%3C/svg%3E");
          background-size: 24px 24px;
        }
      `;
      document.head.appendChild(style);

      // Cleanup function
      return () => {
        editor.destroy();
        document.head.removeChild(style);
      };
    }
  }, []);

  const handleSave = () => {
    if (editorRef.current) {
      const html = editorRef.current.getHtml();
      const css = editorRef.current.getCss();
      
      // Save to database or localStorage
      console.log("Saving content:", { html, css });
      
      // For now, just show an alert
      alert("Content saved successfully!");
    }
  };

  const handlePreview = () => {
    if (editorRef.current) {
      const html = editorRef.current.getHtml();
      const css = editorRef.current.getCss();
      
      // Open preview in new window
      const previewWindow = window.open("", "_blank");
      if (previewWindow) {
        previewWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <style>${css}</style>
            </head>
            <body>${html}</body>
          </html>
        `);
        previewWindow.document.close();
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Profile Editor</h1>
        <div className="space-x-2">
          <button 
            onClick={handlePreview}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Preview
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <div id="blocks" className="w-64 bg-gray-100 p-4 overflow-y-auto border-r"></div>
        <div ref={containerRef} className="flex-1 overflow-hidden"></div>
        <div id="layers" className="w-64 bg-gray-100 p-4 overflow-y-auto border-l"></div>
      </div>
    </div>
  );
}