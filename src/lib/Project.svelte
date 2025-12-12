<script lang="ts">
    // Define props for the component using Svelte Runes ($props)
    let {
        title,
        subtitle, // Using 'subtitle' instead of 'conference' for reusability
        blurb,
        link,
        isWIP = false, // New prop for Work in Progress status
        imageUrl = "https://placehold.co/400x200/50b5e2/ffffff?text=Project+Visual",
        imageAlt = "Project screenshot or diagram",
        techStack = [] // New prop: an array of strings for technology names/icon classes
    } = $props();

    // Map technology names to colors (placeholder logic)
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

<!-- Project Card (Highly Reusable) -->
<div class="bg-white p-6 md:pt-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border-2 border-gray-300 flex flex-col gap-6">
    <!-- Left: Project Details -->
    <div class="w-full">
        <a href={link} class="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-3 mb-2">
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

    <!-- Right: Image Placeholder -->
    <div class="w-full flex justify-center items-center">
        <div class="w-full max-w-xs p-3 bg-gray-50 rounded-lg border-2 border-cyan-300 shadow-inner">
            <img 
                src={imageUrl} 
                alt={imageAlt} 
                class="rounded w-full h-auto object-cover"
            >
            <p class="text-xs text-center text-gray-500 mt-2 italic">
                {imageAlt}
            </p>
        </div>
    </div>

</div>