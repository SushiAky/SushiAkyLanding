<template>
    <Navbar />

    <div class="antialised overflow-x-hidden">
        <slot />
    </div>

    <footer class="bg-black text-white text-secondary">
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div class="lg:flex lg:justify-between">
                <div class="mb-6 lg:mb-0">
                    <a class="flex gap-2 items-center">
                        <img src="../assets/images/logo.jpeg" class="h-20 w-14 object-cover rounded-lg">
                        <span class="self-center text-2xl font-extralight whitespace-nowrap">SushiAky</span>
                    </a>
                </div>
            </div>
            <hr class="my-6 border-white sm:mx-auto lg:my-8" />
            <div class="sm:flex sm:items-center sm:justify-between">
                <span class="text-sm text-white sm:text-center">© 2024 <a class="hover:underline">SushiAky™</a>.
                    All
                    Rights Reserved.
                </span>
                <div class="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
                    <a href="https://instagram.com/sushiakyy/" target="_blank" class="text-white hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" fill="white" width="20" height="20"
                            viewBox="0 0 50 50">
                            <path
                                d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z">
                            </path>
                        </svg>
                        <span class="sr-only">Instagram page</span>
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>