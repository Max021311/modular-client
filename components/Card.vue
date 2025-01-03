<template>
  <div class="card bg-base-300 h-fit shadow-xl">
    <div class="card-body">
      <h2 class="card-title">
        <slot name="title" />
      </h2>
      <div class="divider my-0" />
      <slot name="content" />
    </div>
  </div>
</template>
