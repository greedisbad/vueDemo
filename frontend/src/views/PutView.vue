<template>
  <div>
    <div v-for="(key, idx) in colNames" :key="idx" class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">{{ key }}</span>
      </div>

      <select v-if="key === 'type'" class="form-select" v-model="data[key]">
        <option value="0">No</option>
        <option value="1">Close Only</option>
        <option value="2">Full</option>
      </select>
      <select v-if="key === 'trade'" class="form-select" v-model="data[key]">
        <option value="1">Forex</option>
        <option value="2">Commodity</option>
        <option value="3">Index</option>
        <option value="4">Test</option>
        <option value="5">Stocks</option>
      </select>

      <input
        v-if="key !== 'type' && key !== 'trade'"
        type="text"
        v-model="data[key]"
        class="form-control"
        :readonly="key === 'id'"
      />
    </div>
    <router-link to="/">
      <button class="btn btn-primary">HOME</button>
    </router-link>
    &nbsp;&nbsp;
    <button class="btn btn-primary" v-on:click="save()">SAVE</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      colNames: [
        "id",
        "server_id",
        "name",
        "description",
        "currency",
        "type",
        "digits",
        "trade",
        "swap_long",
        "swap_short",
        "contract_size",
      ],
    };
  },
  mounted: function () {
    this.updateData();
  },
  methods: {
    async updateData() {
      const res = await fetch(
        `http://127.0.0.1:5000/api/${this.$route.params.id}`
      );
      const result = await res.json();
      this.data = result;
    },

    save() {
      fetch(`http://127.0.0.1:5000/api/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.data),
      }).then(() => this.updateData());
    },
  },
};
</script>
