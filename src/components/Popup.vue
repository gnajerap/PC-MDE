<template>
  <v-dialog max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn text class="success" v-on="{ on }"> Crear Nuevo </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <h2>Agrega nuevo</h2>
      </v-card-title>
    </v-card>
  </v-dialog>
</template>