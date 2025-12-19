<script>
    import Project from "./Project.svelte";
    import VideoProject from "./VideoProject.svelte";

    // Define props for the component using Svelte Runes ($props)
    let { events } = $props();
</script>

<!-- Timeline Container -->
<!-- 'max-w-5xl mx-auto' centers the whole component and limits width -->
<div class="max-w-5xl mx-auto px-4 relative py-8">
    
    <!-- Vertical Line (Timeline Spine) -->
    <!-- Positioned absolutely on the left (left-8) -->
    <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

    {#each events as event}
        <!-- Timeline Item Wrapper -->
        <!-- 'pl-20' creates space on the left for the line and dot, pushing content right -->
        <div class="relative pl-20 mb-12 last:mb-0">
            
            <!-- Timeline Dot -->
            <!-- 'left-8' aligns it with the line. '-translate-x-1/2' centers it perfectly on the line. -->
            <div class="absolute left-8 -translate-x-1/2 top-5 w-4 h-4 bg-cyan-600 rounded-full ring-4 ring-white z-10 shadow-sm"></div>
            
            <!-- Date Label -->
            <div class="mb-3">
                <span class="inline-block px-2 py-1 text-xs font-bold tracking-wider text-cyan-700 uppercase bg-cyan-50 rounded border border-cyan-100">
                    {event.date}
                </span>
            </div>

            <!-- Project Component -->
            <!-- Wraps the project card. The card will naturally fill the remaining width. -->
            <div class="transition-transform duration-300 hover:translate-x-1">
                {#if event.videoUrl}
                    <!-- RENDER VIDEO COMPONENT if videoUrl exists -->
                    <!-- Note: We map event.videoUrl to the 'videoId' prop expected by the video component -->
                    <VideoProject 
                        title={event.title}
                        subtitle={event.subtitle}
                        blurb={event.blurb}
                        link={event.link}
                        isWIP={event.isWIP}
                        videoId={event.videoUrl} 
                        techStack={event.techStack}
                    />
                {:else}
                    <!-- RENDER IMAGE COMPONENT (Fallback/Default) -->
                    <Project 
                        title={event.title}
                        subtitle={event.subtitle}
                        blurb={event.blurb}
                        link={event.link}
                        isWIP={event.isWIP}
                        imageUrl={event.imageUrl}
                        imageAlt={event.imageAlt}
                        techStack={event.techStack}
                    />
                {/if}
            </div>
        </div>
    {/each}
</div>
