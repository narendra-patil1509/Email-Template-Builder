import React, { useRef } from 'react';
import EmailEditor from 'react-email-editor';

function App() {
    const emailEditorRef = useRef(null);

    // 🔹 Save current design as JSON
    const saveTemplate = () => {
        emailEditorRef.current.editor.saveDesign((design) => {
            const json = JSON.stringify(design);
            console.log(design);
            
            localStorage.setItem("savedDesign", json);
            alert("Template saved to localStorage!");
        });
    };

    // 🔹 Load saved design from localStorage
    const loadTemplate = () => {
        const json = localStorage.getItem("savedDesign");
        if (json) {
            const design = JSON.parse(json);
            emailEditorRef.current.editor.loadDesign(design);
        } else {
            alert("No template found in localStorage.");
        }
    };

    const exportHTML = () => {
        if (emailEditorRef.current) {
            emailEditorRef.current.editor.exportHtml((data) => {
                const { html } = data;
                console.log('Exported HTML:', html);

                // Optional: Download the HTML as a .html file
                const blob = new Blob([html], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'email-template.html';
                a.click();
                URL.revokeObjectURL(url);
            });
        }
    };

    return (
        <div>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className="text-xl font-bold mb-4 text-slate-100">Email Template Builder</h1>
                </div>
                <div className='flex gap-[10px] p-[10px] min-h-full'>
                    <button className='text-white font-bold py-1 px-4 rounded bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90' onClick={saveTemplate}>💾 Save Template</button>
                    <button className='text-white font-bold py-2 px-4 rounded bg-gradient-to-r from-green-400 to-teal-500 hover:opacity-90' onClick={loadTemplate}>📂 Load Template</button>
                    <button className='text-white font-bold py-2 px-4 rounded bg-gradient-to-r from-slate-700 to-gray-900 hover:opacity-90' onClick={exportHTML} >
                        🌐 Export HTML
                    </button>
                </div>
            </div>

            <EmailEditor
                ref={emailEditorRef}
                className='h-screen'
                options={{
                    features: {
                        image: true,
                        text: true,
                        undoRedo: true,     // ✅ Show Undo/Redo
                        preview: true,      // Show desktop/mobile preview
                        save: true,         // Save button
                    },
                }}
                style={{ height: '600px' }}
                />
        </div>
    );
}

export default App;
