import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import Layout from '@theme/Layout';
import styles from './playground.module.css';

export default function Playground(): JSX.Element {
  const [code, setCode] = useState(`// Welcome to the Helpers4 Playground!
// Try out any helper function here

import { arrayEquals, chunk } from '@helpers4/array';
import { debounce, throttle } from '@helpers4/function';

// Example 1: Array helpers
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
console.log('Arrays equal:', arrayEquals(arr1, arr2));

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log('Chunked array:', chunk(numbers, 3));

// Example 2: Function helpers
const debouncedLog = debounce((message: string) => {
  console.log('Debounced:', message);
}, 1000);

debouncedLog('Hello World!');
`);

  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  // Mock console.log to capture output
  const mockConsole = {
    log: (...args: any[]) => {
      const message = args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      setOutput(prev => [...prev, `> ${message}`]);
    },
    error: (...args: any[]) => {
      const message = args.map(arg => String(arg)).join(' ');
      setOutput(prev => [...prev, `❌ ${message}`]);
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput(['🚀 Running code...']);

    try {
      // In a real implementation, you would send this to a backend service
      // or use a web worker with TypeScript compilation
      // For now, we'll simulate the execution

      setTimeout(() => {
        mockConsole.log('Code execution completed!');
        mockConsole.log('Note: This is a demo. Real execution would require a backend service.');
        setIsRunning(false);
      }, 1000);

    } catch (error) {
      mockConsole.error('Error executing code:', error);
      setIsRunning(false);
    }
  };

  const clearOutput = () => {
    setOutput([]);
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <Layout
      title="Playground"
      description="Try out Helpers4 functions in this interactive playground">
      <div className={styles.playgroundContainer}>
        <div className={styles.header}>
          <h1>Helpers4 Playground</h1>
          <p>Write and test TypeScript code using Helpers4 functions</p>
        </div>

        <div className={styles.playgroundContent}>
          <div className={styles.editorSection}>
            <div className={styles.editorHeader}>
              <h3>Code Editor</h3>
              <div className={styles.editorActions}>
                <button
                  className={`${styles.runButton} ${isRunning ? styles.running : ''}`}
                  onClick={runCode}
                  disabled={isRunning}
                >
                  {isRunning ? '⏳ Running...' : '▶️ Run Code'}
                </button>
              </div>
            </div>
            <div className={styles.editorWrapper}>
              <Editor
                height="400px"
                defaultLanguage="typescript"
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  renderLineHighlight: 'line',
                }}
              />
            </div>
          </div>

          <div className={styles.outputSection}>
            <div className={styles.outputHeader}>
              <h3>Console Output</h3>
              <button
                className={styles.clearButton}
                onClick={clearOutput}
              >
                🗑️ Clear
              </button>
            </div>
            <div className={styles.outputWrapper} ref={outputRef}>
              {output.length === 0 ? (
                <div className={styles.emptyOutput}>
                  No output yet. Click "Run Code" to execute your script.
                </div>
              ) : (
                <pre className={styles.output}>
                  {output.map((line, index) => (
                    <div key={index} className={styles.outputLine}>
                      {line}
                    </div>
                  ))}
                </pre>
              )}
            </div>
          </div>
        </div>

        <div className={styles.tips}>
          <h3>💡 Tips</h3>
          <ul>
            <li>Import any helper from the @helpers4 packages</li>
            <li>Use console.log() to see the output in the console below</li>
            <li>The editor supports full TypeScript syntax and IntelliSense</li>
            <li>Try the examples or write your own code!</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
