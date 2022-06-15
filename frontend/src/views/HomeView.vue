<template>
  <main>
    <!-- <RouterLink to="/get">GET {{ data }}</RouterLink> -->

    <table class="table table-striped table-sm table-bordered">
      <thead>
        <tr>
          <th scope="col" v-for="(key, idx) in colNames" :key="idx">
            {{ key }}
          </th>
          <th scope="col">option</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, tr_idx) in data" :key="tr_idx">
          <td v-for="(key, td_idx) in colNames" :key="td_idx">
            {{
              key === "type"
                ? type[row[key]]
                : key === "trade"
                ? trade[row[key]]
                : row[key]
            }}
          </td>
          <td>
            <button class="btn">
              <router-link :to="{ path: `/put/${row.id}` }"> 📋 </router-link>
            </button>
            <button v-on:click="remove(row.id)" class="btn">❌</button>
          </td>
        </tr>
        <tr>
          <td></td>
          <td v-for="(key, td_idx) in colNames.slice(1)" :key="td_idx">
            <select v-if="key === 'type'" v-model="newRow[key]">
              <option value="0">No</option>
              <option value="1">Close Only</option>
              <option value="2">Full</option>
            </select>
            <select v-if="key === 'trade'" v-model="newRow[key]">
              <option value="1">Forex</option>
              <option value="2">Commodity</option>
              <option value="3">Index</option>
              <option value="4">Test</option>
              <option value="5">Stocks</option>
            </select>
            <input
              v-if="key !== 'type' && key !== 'trade'"
              type="text"
              v-model="newRow[key]"
            />
          </td>
          <td>
            <button class="btn" v-on:click="insert()">✅</button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
export default {
  data() {
    return {
      data: [],
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
      newRow: {
        server_id: 3,
        name: "XAUUSD-H",
        description: "Gold vs USD",
        currency: "USD",
        type: 0,
        digits: 2,
        trade: 1,
        swap_long: -1.83625,
        swap_short: 1.82325,
        contract_size: 100.0,
      },
      type: ["No", "Close Only", "Full"],
      trade: ["", "Forex", "Commodity", "Index", "Test", "Stocks"],
    };
  },
  mounted: function () {
    this.updateData();
  },
  methods: {
    async updateData() {
      const res = await fetch("http://127.0.0.1:5000/api/");
      const result = await res.json();
      this.data = result;
    },
    insert() {
      fetch("http://127.0.0.1:5000/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.newRow),
      }).then(() => this.updateData());
    },
    remove(id) {
      fetch(`http://127.0.0.1:5000/api/${id}`, {
        method: "DELETE",
      }).then(() => this.updateData());
    },
  },
};
</script>
