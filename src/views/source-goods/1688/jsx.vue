<script lang="tsx">
  import { defineComponent, onMounted, reactive } from 'vue';
  import { productList } from '@/api/1688/fenxiao';

  export default defineComponent({
    setup() {
      const tableData = reactive({
        data: [],
      });

      const columns = [
        {
          title: '商品ID',
          dataIndex: 'itemId',
        },
        {
          title: '图片地址',
          render: ({ record }) => {
            return (
              <a-image width="80" height="80" fit="cover" src={record.imgUrl} />
            );
          },
        },
        {
          title: '最高价格',
          dataIndex: 'maxPrice',
          render: ({ record }) => record.maxPrice / 100,
        },
        {
          title: '最低价格',
          dataIndex: 'minPrice',
          render: ({ record }) => record.minPrice / 100,
        },
      ];

      onMounted(async () => {
        const res = await productList({
          pageNo: 1,
          pageSize: 20,
        });
        if (res?.success) {
          console.log(res.result.resultList);
          tableData.data = res.result.resultList;
        }
        console.log('res', res);
      });

      return () => (
        <div class="content-box">
          <a-table columns={columns} data={tableData.data}></a-table>
        </div>
      );
    },
  });
</script>

<style lang="less" scoped>
  .content-box {
    padding: 16px 20px;
    background: #fff;
  }
</style>
