<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation"  >
      <div class="navbar-brand">
        <a class="navbar-item">
          <RouterLink to="/dashboard">
            <img src="@/assets/images.png">
          </RouterLink>
        </a>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item"> Home </a>

          <a class="navbar-item"> Documentation </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> More </a>

            <div class="navbar-dropdown">
              <a class="navbar-item"> About </a>
              <a class="navbar-item is-selected"> Jobs </a>
              <a class="navbar-item"> Contact </a>
              <hr class="navbar-divider" />
              <a class="navbar-item"> Report an issue </a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <button class="button is-info">
              <RouterLink to="/login">Login</RouterLink>
            </button>
            <button class="button">
              <RouterLink to="/register">Register</RouterLink>
            </button>
            <LogOut />
          <ThemeSwitcher/>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script setup>
import { RouterLink } from "vue-router";
import ThemeSwitcher from "@/views/ThemeSwitcher.vue";
import LogOut from "@/components/LogOut.vue";
</script>
