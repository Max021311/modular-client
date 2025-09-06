<template>
  <div class="max-h-screen">
    <ChatDialogflow />
    <NavBar class="sticky top-0 z-50" />
    <div class="mt-0">
      <slot />
    </div>
    <Footer />
  </div>
</template>
