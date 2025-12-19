<script lang="ts">
    // Define props for the component using Svelte Runes ($props)
    let {
        title,
        subtitle,
        blurb,
        link,
        videoId, // New prop: The 11-character YouTube ID (e.g., "dQw4w9WgXcQ")
        isWIP = false,
        techStack = []
    } = $props();

    // Map technology names to colors
    function getTechColor(tech: string) {
        const hash = Array.from(tech).reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const colors = [
            'bg-green-100 text-green-800 ring-green-200',
            'bg-blue-100 text-blue-800 ring-blue-200',
            'bg-pink-100 text-pink-800 ring-pink-200',
            'bg-indigo-100 text-indigo-800 ring-indigo-200',
            'bg-gray-200 text-gray-700 ring-gray-300'
        ];
        return colors[hash % colors.length];
    }
</script>

<!-- Project Card (Video Version) -->
<div class="bg-white p-6 md:pt-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border-2 border-gray-300 flex flex-col gap-6">
    
    <!-- Top: Project Details -->
    <div class="w-full">
        <a href={link} target="_blank" rel="noreferrer" class="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-3 mb-2">
            <h3 class="text-xl md:text-2xl font-bold text-gray-800">
                {title}
            </h3>
            
            <!-- Work in Progress Badge -->
            {#if isWIP}
                <span class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full text-orange-700 bg-orange-100 ring-1 ring-inset ring-orange-200">
                    WIP
                </span>
            {/if}
        </a>

        <p class="text-sm uppercase font-semibold text-cyan-600 mb-4">
            {subtitle}
        </p>

        <!-- Tech Stack Tags -->
        <div class="flex flex-wrap gap-2 mb-4">
            {#each techStack as tech}
                <span class="inline-flex items-center px-3 py-0.5 text-xs font-medium rounded-full ring-1 ring-inset {getTechColor(tech)}">
                    {tech}
                </span>
            {/each}
        </div>

        <p class="text-gray-600 leading-relaxed">
            {@html blurb}
        </p>
    </div>

    <!-- Bottom: YouTube Embed -->
    <div class="w-full flex justify-center items-center">
        <!-- 
            Added 'w-full' to inner container to maximize width if needed, 
            but kept max-w-md to prevent it from becoming too large on wide screens.
        -->
        <div class="w-full max-w-md p-3 bg-gray-50 rounded-lg border-2 border-cyan-300 shadow-inner">
            <!-- Aspect Ratio Container (requires Tailwind aspect-ratio plugin or standard aspect-video class) -->
            <div class="relative w-full aspect-video rounded overflow-hidden bg-black">
                <iframe 
                    src="https://www.youtube.com/embed/{videoId}" 
                    title={title}
                    class="absolute top-0 left-0 w-full h-full"
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen
                ></iframe>
            </div>
            <p class="text-xs text-center text-gray-500 mt-2 italic">
                Video demonstration
            </p>
        </div>
    </div>

</div>
