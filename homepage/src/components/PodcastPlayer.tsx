import { useRef, useState, useEffect } from "react";
import { SketchBox } from "./ui/SketchBox";
import { motion } from "framer-motion";

interface TranscriptSegment {
    start: number;
    duration: number;
    text: string;
}

interface PodcastPlayerProps {
    audioSrc: string;
    transcriptSrc: string;
    title: string;
    episodeNumber: number;
}

export function PodcastPlayer({ audioSrc, transcriptSrc, title, episodeNumber }: PodcastPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(transcriptSrc)
            .then(res => res.json())
            .then(data => {
                setTranscript(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to load transcript", err);
                setIsLoading(false);
            });
    }, [transcriptSrc]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("play", () => setIsPlaying(true));
        audio.addEventListener("pause", () => setIsPlaying(false));

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("play", () => setIsPlaying(true));
            audio.removeEventListener("pause", () => setIsPlaying(false));
        };
    }, []);

    // Auto-scroll to active segment
    useEffect(() => {
        if (!scrollRef.current) return;

        const activeSegment = transcript.findIndex(
            seg => currentTime >= seg.start && currentTime < seg.start + seg.duration
        );

        if (activeSegment !== -1) {
            const element = scrollRef.current.children[activeSegment] as HTMLElement;
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    }, [currentTime, transcript]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
        }
    };

    const seekTo = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            if (!isPlaying) audioRef.current.play();
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <SketchBox className="bg-white p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-[30px] p-2 opacity-80">
                    <img
                        src="/podcasts/microphone_v3.png"
                        alt="Microphone sketch"
                        className="w-32 h-auto object-contain opacity-90"
                    />
                </div>

                <div className="relative z-10 mb-12">
                    <span className="text-[#E76F51] font-bold tracking-widest uppercase text-xs mb-2 block">
                        Episode {episodeNumber}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif italic text-[#1B3022] mb-8">
                        {title}
                    </h1>

                    <audio ref={audioRef} src={audioSrc} className="w-full mb-8" controls />
                </div>

                <div className="border-t border-[#1B3022]/10 pt-8">
                    <h3 className="text-[#1B3022]/40 font-bold uppercase tracking-widest text-xs mb-6">
                        Transcript
                    </h3>

                    <div
                        ref={scrollRef}
                        className="h-[400px] overflow-y-auto space-y-4 pr-4 scrollbar-thin scrollbar-thumb-[#1B3022]/10 scrollbar-track-transparent"
                    >
                        {isLoading ? (
                            <div className="text-center py-12 text-[#1B3022]/40 italic">Loading transcript...</div>
                        ) : transcript.length > 0 ? (
                            transcript.map((seg, idx) => {
                                const isActive = currentTime >= seg.start && currentTime < seg.start + seg.duration;
                                return (
                                    <motion.button
                                        key={idx}
                                        onClick={() => seekTo(seg.start)}
                                        className={`w-full text-left p-4 rounded-lg transition-all ${isActive
                                            ? "bg-[#1B3022]/5 border-l-4 border-[#D4A373] shadow-sm"
                                            : "hover:bg-[#FAF9F6] border-l-4 border-transparent"
                                            }`}
                                        animate={{ opacity: isActive ? 1 : 0.6 }}
                                    >
                                        <div className="flex gap-4">
                                            <span className="text-xs font-mono text-[#1B3022]/30 pt-1 min-w-[3rem]">
                                                {new Date(seg.start * 1000).toISOString().substr(14, 5)}
                                            </span>
                                            <p className={`text-lg font-serif leading-relaxed ${isActive ? "text-[#1B3022]" : "text-[#1B3022]/60"}`}>
                                                {seg.text}
                                            </p>
                                        </div>
                                    </motion.button>
                                );
                            })
                        ) : (
                            <div className="text-center py-12 text-[#1B3022]/40 italic">No transcript available.</div>
                        )}
                    </div>
                </div>
            </SketchBox>
        </div>
    );
}
