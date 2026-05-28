"use client";

import React, { useState } from "react";
import { PlayCircle, CheckCircle2, Circle, ChevronLeft, ChevronRight, Menu, Home, FileText, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

// Mock data for the curriculum
const CURRICULUM = [
  {
    id: "m1",
    title: "Module 1: Getting Started",
    lessons: [
      { id: "l1", title: "Welcome to the Course", duration: "5:00", type: "video", completed: true },
      { id: "l2", title: "Course Syllabus & Guidelines", duration: "4 pages", type: "pdf", completed: true },
      { id: "l3", title: "Setting up your Environment", duration: "12:30", type: "video", completed: true },
      { id: "l4", title: "Module 1 Knowledge Check", duration: "5 Qs", type: "quiz", completed: false },
    ]
  },
  {
    id: "m2",
    title: "Module 2: Advanced Techniques",
    lessons: [
      { id: "l5", title: "Deep Dive into Architecture", duration: "25:10", type: "video", completed: false },
      { id: "l6", title: "Architecture Diagrams", duration: "10 pages", type: "pdf", completed: false },
      { id: "l7", title: "State Management Patterns", duration: "20:00", type: "video", completed: false },
      { id: "l8", title: "Final Assessment", duration: "20 Qs", type: "quiz", completed: false },
    ]
  }
];

export default function CourseConsumptionPage() {
  const params = useParams();
  const router = useRouter();
  const [activeLesson, setActiveLesson] = useState(CURRICULUM[0].lessons[3].id); // default to quiz to show it off
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // find active lesson details
  let currentLessonDetails: any = null;
  for (const mod of CURRICULUM) {
    const found = mod.lessons.find(l => l.id === activeLesson);
    if (found) currentLessonDetails = found;
  }

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden">
      {/* Mini Header for consumption */}
      <header className="h-16 flex items-center justify-between px-4 border-b border-border/50 bg-background/95 backdrop-blur z-50 shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted-foreground hover:text-foreground">
            <Menu className="w-5 h-5" />
          </Button>
          <div className="h-6 w-px bg-foreground/10 hidden sm:block" />
          <Button variant="ghost" size="sm" onClick={() => router.push('/courses')} className="hidden sm:flex text-muted-foreground hover:text-foreground">
            <Home className="w-4 h-4 mr-2" />
            Back to Catalog
          </Button>
          <div className="h-6 w-px bg-foreground/10 hidden sm:block" />
          <h1 className="font-semibold text-foreground hidden md:block">Course: Fullstack Next.js & React 19</h1>
        </div>
        <div className="text-sm text-muted-foreground flex items-center gap-3">
          <div className="hidden sm:block">
            <span className="text-foreground font-medium">3</span> / 8 lessons completed
          </div>
          <div className="w-24 h-2 rounded-full bg-foreground/10 overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '37.5%' }}></div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Curriculum */}
        <aside
          className={`shrink-0 border-r border-border/50 bg-background/50 backdrop-blur transition-all duration-300 ease-in-out flex flex-col absolute sm:relative z-40 h-full ${
            sidebarOpen ? "w-80 translate-x-0" : "w-0 -translate-x-full border-r-0"
          }`}
        >
          <div className="p-4 border-b border-border/50 shrink-0 flex items-center justify-between">
            <h2 className="font-semibold text-lg text-foreground">Curriculum</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {CURRICULUM.map((module) => (
              <div key={module.id}>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">
                  {module.title}
                </h3>
                <div className="space-y-1">
                  {module.lessons.map((lesson) => {
                    const isActive = lesson.id === activeLesson;
                    let Icon = Circle;
                    if (lesson.type === 'video') Icon = PlayCircle;
                    else if (lesson.type === 'pdf') Icon = FileText;
                    else if (lesson.type === 'quiz') Icon = BrainCircuit;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson.id)}
                        className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-200 ${
                          isActive
                            ? "bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(139,92,246,0.05)]"
                            : "hover:bg-foreground/5 border border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {lesson.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <Icon className={`w-5 h-5 ${isActive ? 'text-primary drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : 'opacity-70'}`} />
                          )}
                        </div>
                        <div>
                          <div className={`font-medium text-sm ${isActive ? 'text-foreground' : ''}`}>
                            {lesson.title}
                          </div>
                          <div className="text-xs mt-1 opacity-70">
                            {lesson.duration}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-y-auto relative scroll-smooth">
          <div className="max-w-5xl w-full mx-auto p-4 sm:p-8 flex-1">

            {/* Conditional Content Rendering */}
            {currentLessonDetails?.type === "video" && (
              <div 
                id="video-container"
                className="w-full aspect-video bg-black rounded-2xl border border-border/10 shadow-2xl relative overflow-hidden flex items-center justify-center ring-1 ring-border/5 group"
              >
                <style>{`
                  video::-webkit-media-controls-fullscreen-button {
                    display: none !important;
                  }
                `}</style>
                
                {/* Dummy Video */}
                <video
                  className="w-full h-full object-cover"
                  controls
                  controlsList="nodownload"
                  disablePictureInPicture
                  poster="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1920&auto=format&fit=crop"
                >
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                  Your browser does not support HTML video.
                </video>

                {/* Anti-Recording Overlay */}
                <div className="absolute inset-0 pointer-events-none z-40 flex flex-col items-center justify-center overflow-hidden opacity-30 mix-blend-difference">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="text-foreground text-xl sm:text-2xl font-bold whitespace-nowrap -rotate-24 select-none opacity-30 my-10"
                      style={{ animation: `pulse 5s infinite ${i * 1}s` }}
                    >
                      DO NOT RECORD : user@gmail.com 87XXXX12XX
                    </div>
                  ))}
                </div>

                {/* Custom Fullscreen Button */}
                <button 
                  onClick={() => {
                    const container = document.getElementById('video-container');
                    if (!document.fullscreenElement) {
                      container?.requestFullscreen().catch(err => console.error(err));
                    } else {
                      document.exitFullscreen();
                    }
                  }}
                  className="absolute bottom-4 right-4 z-50 p-2 rounded bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                  title="Toggle Fullscreen"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
                </button>
              </div>
            )}

            {currentLessonDetails?.type === "pdf" && (
              <div id="pdf-container" className="w-full h-[75vh] min-h-[600px] bg-card rounded-2xl border border-border/10 shadow-2xl relative overflow-hidden flex flex-col ring-1 ring-border/5">
                <div className="bg-muted px-4 py-3 border-b border-border/10 flex justify-between items-center z-50 relative">
                   <div className="flex items-center gap-2 text-foreground font-medium">
                     <FileText className="w-5 h-5 text-primary" />
                     {currentLessonDetails.title}.pdf
                   </div>
                   <div className="flex items-center gap-2">
                     <Button 
                       variant="outline" 
                       size="sm" 
                       className="h-8"
                       onClick={() => {
                         const container = document.getElementById('pdf-container');
                         if (!document.fullscreenElement) {
                           container?.requestFullscreen().catch(err => console.error(err));
                         } else {
                           document.exitFullscreen();
                         }
                       }}
                     >
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
                       Fullscreen
                     </Button>
                     <Button variant="outline" size="sm" className="h-8">Download</Button>
                   </div>
                </div>

                <div className="flex-1 relative h-full w-full">
                  {/* Dummy PDF using iframe */}
                  <iframe
                    src="https://pdfobject.com/pdf/sample-3pp.pdf#toolbar=0"
                    className="absolute inset-0 w-full h-full border-0 bg-white"
                    title="PDF Viewer"
                  />

                  {/* Anti-Recording Overlay for PDF */}
                  <div className="absolute inset-0 pointer-events-none z-40 flex flex-col items-center justify-center overflow-hidden opacity-20 mix-blend-difference">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="text-black text-xl sm:text-2xl font-bold whitespace-nowrap rotate-45 select-none opacity-40 my-8"
                      >
                        CONFIDENTIAL - DO NOT SHARE
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentLessonDetails?.type === "quiz" && (
              <div className="w-full bg-foreground/5 rounded-2xl border border-border/50 shadow-2xl relative overflow-hidden p-6 sm:p-12 ring-1 ring-border/50">
                 <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10 border-b border-border/50 pb-8">
                   <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-purple-500/10 flex items-center justify-center shrink-0 border border-primary/20">
                     <BrainCircuit className="w-8 h-8 text-primary drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                   </div>
                   <div>
                     <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{currentLessonDetails.title}</h3>
                     <p className="text-muted-foreground font-medium flex items-center gap-2">
                       <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded">Required</span>
                       {currentLessonDetails.duration} • 80% passing grade
                     </p>
                   </div>
                 </div>

                 <div className="space-y-4 mb-10">
                   <h4 className="text-xl font-medium text-foreground mb-6">1. Which of the following statements is true regarding React Server Components?</h4>
                   <div className="space-y-3">
                     {[
                       'They can use React hooks like useState and useEffect.',
                       'They execute entirely on the server and send HTML to the client.',
                       'They are identical to Client Components but run faster.',
                       'They require a third-party state management library.'
                     ].map((opt, i) => (
                       <label key={i} className="flex items-start gap-4 p-5 rounded-xl border border-border/50 bg-muted/50 hover:bg-foreground/5 cursor-pointer transition-all hover:border-primary/50 group">
                         <input type="radio" name="q1" className="mt-1 w-4 h-4 text-primary focus:ring-primary focus:ring-offset-background bg-transparent border-border" />
                         <span className="text-foreground/90 group-hover:text-foreground leading-relaxed">{opt}</span>
                       </label>
                     ))}
                   </div>
                 </div>
                 <div className="flex items-center justify-between pt-6 border-t border-border/50">
                    <span className="text-sm text-muted-foreground font-medium">Question 1 of 5</span>
                    <Button className="bg-primary hover:bg-primary/90 text-foreground shadow-lg shadow-primary/25 px-8">
                      Next Question
                    </Button>
                 </div>
              </div>
            )}

            {/* Lesson Info */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-3 tracking-tight">{currentLessonDetails?.title}</h2>
                <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                  In this module, we will cover the foundational concepts and explore practical examples to help you master this topic. Make sure to follow along with the source code provided in the resources section below.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Button variant="outline" className="border-border/50 hover:bg-foreground/10 hover:text-foreground transition-colors">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40">
                  Next Lesson
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">R</span>
                Resources
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border border-border/50 bg-foreground/5 hover:bg-foreground/10 transition-all cursor-pointer group">
                  <div className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">Source Code.zip</div>
                  <div className="text-sm text-muted-foreground">Download the starter files for this lesson</div>
                </div>
                <div className="p-5 rounded-xl border border-border/50 bg-foreground/5 hover:bg-foreground/10 transition-all cursor-pointer group">
                  <div className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">Lesson Slides.pdf</div>
                  <div className="text-sm text-muted-foreground">Download the presentation slides</div>
                </div>
              </div>
            </div>

            {/* Q&A Section Stub */}
            <div className="mt-12 pt-8 border-t border-border/50 mb-20">
               <h3 className="text-xl font-semibold text-foreground mb-6">Discussion</h3>
               <div className="p-6 rounded-xl border border-border/50 bg-background/50 flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h4 className="text-lg font-medium text-foreground mb-2">Have a question?</h4>
                  <p className="text-muted-foreground mb-6 max-w-md">Join the discussion with other students and instructors. Ask questions and share your progress.</p>
                  <Button variant="outline" className="border-border hover:bg-foreground/10">Start a Discussion</Button>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
