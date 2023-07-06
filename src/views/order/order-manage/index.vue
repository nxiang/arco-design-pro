<template>
  <div class="page-wrap">
    <a-table :columns="columns" :data="state.data"></a-table>
  </div>
</template>

<script lang="ts" setup>
  import { ListData, Pagination } from '@/types/global';
  import { reactive } from 'vue';

  const state = reactive<Pagination & ListData<string>>({
    loading: false,
    data: [],
    total: 0,
    current: 1,
    pageSize: 10,
  });

  const columns = [
    {
      title: '商品ID',
      dataIndex: 'itemId',
      width: 150,
    },
  ];
</script>

<style lang="less" scoped></style>
