export const FORM_THEMES = {

    "sacred-tech": {

        page:
            "bg-[#050505] text-[#F3EBDD]",

        backgroundGlow:
            "from-[#C9732B]/20 via-transparent to-[#1F4A3B]/20",

        card:
            "bg-white/[0.03] border border-white/10",

        title:
            "text-[#F3EBDD]",

        description:
            "text-[#D8D4CC]/60",

        label:
            "text-[#F3EBDD]",

        helperText:
            "text-[#D8D4CC]/50",

        input:
            "border-white/10 bg-black/30 text-white placeholder:text-white/40",

        focusRing:
            "focus:border-[#C9732B]/50 focus:ring-4 focus:ring-[#C9732B]/20",

        button:
            "bg-[#C9732B] hover:bg-[#B56A3C] text-white",

        badge:
            "bg-[#C9732B]/10 border border-[#C9732B]/20 text-[#F3EBDD]",
    },

    cyberpunk: {

        page:
            "bg-black text-cyan-300",

        backgroundGlow:
            "from-cyan-500/20 via-transparent to-fuchsia-500/20",

        card:
            "bg-cyan-950/20 border border-cyan-500/20",

        title:
            "text-cyan-300",

        description:
            "text-cyan-200/60",

        label:
            "text-cyan-200",

        helperText:
            "text-cyan-400/60",

        input:
            "border-cyan-500/20 bg-black text-cyan-200 placeholder:text-cyan-500/50",

        focusRing:
            "focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20",

        button:
            "bg-cyan-500 hover:bg-cyan-400 text-black",

        badge:
            "bg-cyan-500/10 border border-cyan-500/20 text-cyan-300",
    },

    anime: {

        page:
            "bg-pink-950 text-pink-100",

        backgroundGlow:
            "from-pink-500/20 via-purple-500/10 to-cyan-500/20",

        card:
            "bg-pink-900/20 border border-pink-400/20",

        title:
            "text-pink-100",

        description:
            "text-pink-200/70",

        label:
            "text-pink-100",

        helperText:
            "text-pink-300/60",

        input:
            "border-pink-400/20 bg-pink-950/40 text-pink-100 placeholder:text-pink-200/50",

        focusRing:
            "focus:border-pink-400 focus:ring-4 focus:ring-pink-500/20",

        button:
            "bg-pink-500 hover:bg-pink-400 text-white",

        badge:
            "bg-pink-500/10 border border-pink-400/20 text-pink-100",
    },

    "startup-os": {

        page:
            "bg-zinc-950 text-zinc-100",

        backgroundGlow:
            "from-zinc-500/10 via-transparent to-white/5",

        card:
            "bg-zinc-900/40 border border-zinc-800",

        title:
            "text-zinc-100",

        description:
            "text-zinc-400",

        label:
            "text-zinc-200",

        helperText:
            "text-zinc-500",

        input:
            "border-zinc-700 bg-black text-zinc-100 placeholder:text-zinc-500",

        focusRing:
            "focus:border-zinc-400 focus:ring-4 focus:ring-zinc-500/10",

        button:
            "bg-white hover:bg-zinc-200 text-black",

        badge:
            "bg-zinc-800 border border-zinc-700 text-zinc-200",
    },

} as const;

export type FormTheme =
    keyof typeof FORM_THEMES;