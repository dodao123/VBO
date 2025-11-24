"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@5.4.296/build/pdf.worker.min.mjs`;

const ReaderDocx = () => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [loading, setLoading] = useState(true);
    const [pageHeight, setPageHeight] = useState(600);
    const containerRef = useRef<HTMLDivElement>(null);

    // Swipe handling state
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const minSwipeDistance = 50;

    const pdfUrl = "/docs/Sách trái tim biết ơn - song ngữ 2025.pdf";

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setLoading(false);
    }

    function onDocumentLoadError(error: Error) {
        console.error('Error loading PDF:', error);
        setLoading(false);
    }

    const changePage = (offset: number) => {
        setPageNumber(prevPageNumber => {
            const newPage = prevPageNumber + offset;
            return Math.max(1, Math.min(newPage, numPages || 1));
        });
    };

    // Touch Event Handlers
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            changePage(1); // Next page
        }
        if (isRightSwipe) {
            changePage(-1); // Prev page
        }
    };

    // Calculate available height to fit screen without scrolling
    useEffect(() => {
        const updateDimensions = () => {
            // Calculate height: Window height - Navbar height (approx 112px/7rem) - padding
            // We aim for the book to fit exactly in the remaining space
            const h = window.innerHeight - 120;
            setPageHeight(h);
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return (
        <div
            className="w-full h-[calc(100vh-7rem)] flex flex-col items-center justify-center relative overflow-hidden touch-pan-y"
            ref={containerRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >

            {/* Loading State */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                </div>
            )}

            {/* PDF Viewer */}
            <div className="relative flex items-center justify-center w-full h-full">
                <Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    className="flex justify-center items-center"
                >
                    <Page
                        pageNumber={pageNumber}
                        height={pageHeight}
                        scale={scale}
                        className="shadow-2xl rounded-sm overflow-hidden"
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                    />
                </Document>

                {/* Navigation Buttons (Floating on edges) */}
                {/* Previous Button */}
                <button
                    onClick={() => changePage(-1)}
                    disabled={pageNumber <= 1}
                    className="hidden md:block absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-2 md:p-4 bg-black/20 hover:bg-black/40 text-white/80 hover:text-white rounded-full backdrop-blur-sm transition-all disabled:opacity-0 disabled:pointer-events-none z-10 group"
                >
                    <ChevronLeft size={32} className="group-hover:scale-110 transition-transform" />
                </button>

                {/* Next Button */}
                <button
                    onClick={() => changePage(1)}
                    disabled={pageNumber >= (numPages || 1)}
                    className="hidden md:block absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-2 md:p-4 bg-black/20 hover:bg-black/40 text-white/80 hover:text-white rounded-full backdrop-blur-sm transition-all disabled:opacity-0 disabled:pointer-events-none z-10 group"
                >
                    <ChevronRight size={32} className="group-hover:scale-110 transition-transform" />
                </button>
            </div>

            {/* Bottom Controls (Floating) */}
            <div className="absolute md:top-4 top-2 left-1/2 -translate-x-1/2 bg-black/20 md:px-6 md:py-2 px-6 py-[-10px] rounded-full flex items-center space-x-6 text-white/90 text-sm z-10 shadow-lg border border-white/10">
                <span className="font-mono font-medium">{pageNumber} / {numPages || '--'}</span>

                <div className="w-px h-4 bg-white/20"></div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
                        className="hover:text-amber-400 transition-colors p-1"
                        title="Thu nhỏ"
                    >
                        <ZoomOut size={18} />
                    </button>
                    <button
                        onClick={() => setScale(1.0)}
                        className="hover:text-amber-400 transition-colors p-1"
                        title="Mặc định"
                    >
                        <RotateCcw size={16} />
                    </button>
                    <button
                        onClick={() => setScale(s => Math.min(2.0, s + 0.1))}
                        className="hover:text-amber-400 transition-colors p-1"
                        title="Phóng to"
                    >
                        <ZoomIn size={18} />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ReaderDocx;
