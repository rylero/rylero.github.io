<script lang="ts">
    let { name, picture, message, socials } = $props();

    const socialIcons: Record<string, string> = {
        github: "fab fa-github",
        linkedin: "fab fa-linkedin-in",
        instagram: "fab fa-instagram",
        email: "fas fa-envelope",
    };
</script>

<header
    class="w-full py-10 px-4 flex flex-col items-center justify-center text-center bg-white dark:bg-gray-900 transition-colors duration-300"
>
    <h1
        class="text-4xl sm:text-5xl font-mono font-bold text-gray-900 dark:text-white mb-2 tracking-wider"
    >
        {name}
    </h1>
    <p
        class="text-lg sm:text-xl font-light text-gray-600 dark:text-gray-400 mb-10 font-sans"
    >
        {message}
    </p>
    <div class="mb-12">
        <img
            src={picture}
            alt={`${name}'s profile`}
            class="w-36 h-36 sm:w-48 sm:h-48 rounded-full object-cover shadow-xl border-4 border-gray-100 dark:border-gray-800 transition-all duration-300"
            style="border-color: rgba(255, 255, 255, 0.7);"
        />
    </div>
    <div class="flex space-x-6 sm:space-x-6">
        {#each socials as social}
            <a
                href={social.url}
                aria-label={`Link to ${social.name}`}
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 text-3xl sm:text-4xl"
            >
                <i
                    class="{social.icon ||
                        socialIcons[social.name.toLowerCase()] ||
                        'fas fa-link'} fa-sm {social.className}"
                ></i>
            </a>
        {/each}
    </div>
</header>
