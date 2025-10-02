import katex from 'katex';
import 'katex/dist/katex.min.css';
import { useEffect, useRef } from 'react';

interface MathRendererProps {
    html: string;
    className?: string;
}

export default function MathRenderer({
    html,
    className = '',
}: MathRendererProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Set the HTML content
        containerRef.current.innerHTML = html;

        // Find all math elements and render them
        const mathElements =
            containerRef.current.querySelectorAll('[data-latex]');

        mathElements.forEach((element) => {
            const latex = element.getAttribute('data-latex');
            const type = element.getAttribute('data-type');

            if (latex) {
                try {
                    const isBlock = type === 'block-math';

                    // Render the LaTeX using KaTeX
                    katex.render(latex, element as HTMLElement, {
                        displayMode: isBlock,
                        throwOnError: false,
                        strict: false,
                    });
                } catch (error) {
                    console.error('Error rendering LaTeX:', error);
                    // Fallback: show the raw LaTeX
                    element.textContent = `$${latex}$`;
                }
            }
        });
    }, [html]);

    return <div ref={containerRef} className={className} />;
}
