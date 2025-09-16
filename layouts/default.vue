<template>
  <div class="min-h-screen flex flex-col">
    <OrganismsGlobalNotication />
    <ChatDialogflow />
    <NavBar class="sticky top-0 z-50" />
    <main class="flex-grow mt-0">
      <slot />
    </main>
    <Footer />
  </div>
</template>
