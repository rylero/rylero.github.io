<script>
    import Project from "./Project.svelte";
    import { Circle } from '@lucide/svelte';
    
    // Define props for the component using Svelte Runes ($props)
    let { events } = $props();

    /**
     * @typedef {object} ProjectEvent
     * @property {string} date
     * @property {string} title
     * @property {string} subtitle
     * @property {string} blurb
     * @property {string} link
     * @property {boolean} isWIP
     * @property {string} imageUrl
     * @property {string} imageAlt
     * @property {string[]} techStack
     */

    /** @type {ProjectEvent[]} */
    const timelineEvents = events;
</script>

<!-- Timeline Container -->
<div class="relative">
    <!-- Vertical Line (Timeline Spine) -->
    <!-- Left-aligned on small/medium (left-2), centered on large (lg:left-1/2) -->
    <div class="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-300 lg:left-1/2 lg:-translate-x-1/2"></div>

    {#each timelineEvents as event, i}
        
        <!-- Timeline Item Wrapper (Gap increased to mb-16) -->
        <!-- The structure is always left-aligned by default. lg: classes center the layout. -->
        <div class="mb-16 flex w-full justify-start items-start relative lg:block">

            <!-- Marker Column (Always fixed left on small/medium) -->
            <div class="relative shrink-0 w-8 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-2">
                <!-- Timeline Dot (Visible only on large screens, fixed to the left spine) -->
                <div class="hidden lg:block absolute bg-cyan-600 rounded-full w-4 h-4 ring-8 ring-white dark:ring-gray-50 z-10 -ml-2"></div>
                <!-- Simple Circle icon for marker on small/medium screens -->
                <Circle size={16} class="text-cyan-600 absolute left-0 top-0 lg:hidden" />
            </div>

            <!-- Content (Project) -->
            <!-- Content starts 2rem (8px) after the spine on small/medium. Half width on large (lg:) and is offset for alternating alignment. -->
            <div 
                class="w-full pl-4 lg:w-[calc(50%-2rem)] lg:pl-0"
                class:lg:order-3={i % 2 !== 0}
                class:lg:ml-auto={i % 2 !== 0}
            >
                
                <!-- Date Label (Always above, simple text, no box) -->
                <div 
                    class="w-full mb-2"
                    class:lg:text-right={i % 2 !== 0}
                >
                    <span class="text-base font-semibold text-gray-500">
                        {event.date}
                    </span>
                </div>

                <!-- Project Component -->
                <div class:lg:text-right={i % 2 !== 0}>
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
                </div>
            </div>

            <!-- Date Label for Large Screens (alternating sides, simple text, hidden here since it's above the project) -->
            <!-- Note: The date is now shown above the project on all screen sizes, simplifying this side element. -->
            <div 
                class="hidden lg:flex w-[calc(50%-2rem)] items-center"
                class:lg:justify-start={i % 2 !== 0}
                class:lg:justify-end={i % 2 === 0}
            >
                <!-- This element is now intentionally empty to maintain the responsive structure but keep the date above the project on the other side. -->
            </div>
        </div>
    {/each}
</div>