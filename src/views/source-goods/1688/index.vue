<template>
  <div class="page-wrap">
    <a-form ref="formRef" :model="form" layout="inline" @submit="handleSubmit">
      <a-form-item field="keywords" label="商品关键字">
        <a-input v-model="form.keywords" placeholder="请输入..." />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" html-type="submit">提交</a-button>
          <a-button @click="handleReset">重置</a-button>
        </a-space>
      </a-form-item>
    </a-form>
    <a-table
      :loading="listState.loading"
      :columns="columns"
      :data="listState.data"
      :pagination="{
        current: listState.current,
        total: listState.total,
        pageSize: listState.pageSize,
        showPageSize: true,
      }"
      @page-change="(current) => getProductList(current)"
      @page-size-change="
        (pageSize) => {
          listState.pageSize = pageSize;
          getProductList(1);
        }
      "
    >
      <template #imgUrlSlot="{ record }">
        <a-image :width="80" :height="80" fit="cover" :src="record.imgUrl" />
      </template>
      <template #maxPriceSlot="{ record }">
        {{ record?.maxPrice && record.maxPrice / 100 }}
      </template>
      <template #minPriceSlot="{ record }">
        {{ record?.minPrice && record.minPrice / 100 }}
      </template>
      <template #operation="{ record }">
        <a-space>
          <a-link
            :href="`https://detail.1688.com/offer/${record.itemId}.html`"
            target="_blank"
          >
            访问商品
          </a-link>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import { productList } from '@/api/1688/fenxiao';
  import { ResultListItem } from '@/types/api/1688/fenxiao';
  import { Message } from '@arco-design/web-vue';
  import { ListData, Pagination } from '@/types/global';

  interface Form {
    /** 商品关键字 */
    keywords?: string;
  }

  const form = reactive<Form>({
    keywords: '',
  });

  const searchData = reactive<Form>({
    keywords: '',
  });

  const listState = reactive<Pagination & ListData<ResultListItem>>({
    loading: false,
    data: [],
    total: 0,
    current: 1,
    pageSize: 10,
  });

  const formRef = ref();

  const columns = [
    {
      title: '商品ID',
      dataIndex: 'itemId',
      width: 150,
    },
    {
      title: '商品名称',
      dataIndex: 'title',
      width: 250,
    },
    {
      title: '图片地址',
      slotName: 'imgUrlSlot',
    },
    {
      title: '最高价格',
      dataIndex: 'maxPrice',
      slotName: 'maxPriceSlot',
    },
    {
      title: '最低价格',
      dataIndex: 'minPrice',
      slotName: 'minPriceSlot',
    },
    {
      title: '商品90天销量',
      dataIndex: 'salesCnt90d',
    },
    {
      title: '操作',
      slotName: 'operation',
    },
  ];

  const getProductList = async (page: number) => {
    listState.loading = true;
    try {
      console.log({ ...searchData });
      const res = await productList({
        ...searchData,
        pageNo: page,
        pageSize: listState.pageSize,
      });
      const result = res?.result;
      const resResult = res.result.result;
      if (result?.success) {
        listState.data = resResult.resultList;
        listState.current = resResult.pageIndex;
        listState.pageSize = resResult.sizePerPage;
        listState.total = resResult.totalRecords;
      } else {
        const message = result.message;
        message && Message.error(message);
      }
      console.log('res', res);
    } catch (error) {
      console.error('error', error);
    } finally {
      listState.loading = false;
    }
  };

  // 查询提交
  const handleSubmit = ({ values }: { values: Form }) => {
    searchData.keywords = values.keywords || '';
    getProductList(1);
  };

  // 查询重置
  const handleReset = () => {
    formRef.value.resetFields();
    formRef.value.handleSubmit();
  };

  onMounted(async () => {
    getProductList(1);
  });
</script>

<style lang="less" scoped></style>
